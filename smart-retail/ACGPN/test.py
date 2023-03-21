import os
import cv2
import time
import glob
import json
import torch
import boto3
import base64
import numpy as np
from boto3 import client
from torch.autograd import Variable
from collections import OrderedDict

import data
import util
import config
import models
import options
import preprocessing
from preprocessing import inference
from models.models import create_model
from options.test_options import TestOptions
from data.data_loader import CreateDataLoader
from util.util import save_tensor_as_image, tensor2label
from config import get_bucket_name, get_root_path, get_result_path, get_image_name, get_test_img, get_test_label, get_test_pose, get_test_pairs, get_person_img_path,get_cloth_img_path

NC = 14
SIZE = 320

user_id= ""
result_img = ""
TEST_IMG = get_test_img()
TEST_POSE = get_test_pose()
ROOT_PATH = get_root_path()
TEST_PAIRS = get_test_pairs()
TEST_LABEL = get_test_label()
BUCKET_NAME= get_bucket_name()
RESULT_PATH= get_result_path()
CLOTH_IMG = get_cloth_img_path()
PERSON_IMG = get_person_img_path()



def generate_label_plain(inputs):
    size = inputs.size()
    pred_batch = []
    for input in inputs:
        input = input.view(1, NC, 256, 192)
        pred = np.squeeze(input.data.max(1)[1].cpu().numpy(), axis=0)
        pred_batch.append(pred)

    pred_batch = np.array(pred_batch)
    pred_batch = torch.from_numpy(pred_batch)
    label_batch = pred_batch.view(size[0], 1, 256, 192)

    return label_batch


def generate_label_color(inputs):
    label_batch = []
    for i in range(len(inputs)):
        label_batch.append(tensor2label(inputs[i], NC))
    label_batch = np.array(label_batch)
    label_batch = label_batch * 2 - 1
    input_label = torch.from_numpy(label_batch)

    return input_label


def complete_compose(img, mask, label):
    label = label.cpu().numpy()
    M_f = label > 0
    M_f = M_f.astype(np.int)
    M_f = torch.FloatTensor(M_f).cuda()
    masked_img = img*(1-mask)
    M_c = (1-mask.cuda())*M_f
    M_c = M_c+torch.zeros(img.shape).cuda()  # broadcasting
    return masked_img, M_c, M_f


def compose(label, mask, color_mask, edge, color, noise):
    masked_label = label*(1-mask)
    masked_edge = mask*edge
    masked_color_strokes = mask*(1-color_mask)*color
    masked_noise = mask*noise
    return masked_label, masked_edge, masked_color_strokes, masked_noise


def changearm(old_label):
    label = old_label
    arm1 = torch.FloatTensor((old_label.cpu().numpy() == 11).astype(np.int))
    arm2 = torch.FloatTensor((old_label.cpu().numpy() == 13).astype(np.int))
    noise = torch.FloatTensor((old_label.cpu().numpy() == 7).astype(np.int))
    label = label*(1-arm1)+arm1*4
    label = label*(1-arm2)+arm2*4
    label = label*(1-noise)+noise*4
    return label

"""model function"""
def model_fn(model_dir):  
    return "inside model fn"

"""input function"""
def input_fn(input_data, request_content_type):
    if request_content_type == 'application/json':
        request_body = json.loads(input_data)
        inpVar = request_body["Input"]
        
        return inpVar
    else:
        raise ValueError("This model only supports application/json input")

"""predict fuction"""
def predict_fn(input_data, model):
    inference(input_data)
    
    global user_id
    user_id = input_data[0]
    cloth_id = input_data[1].split(".")[0]
    result_img = user_id+"_"+cloth_id+".png"
   
    opt = TestOptions().parse()
    data_loader = CreateDataLoader(opt)
    dataset = data_loader.load_data()
    dataset_size = len(data_loader)
    print('# Inference images = %d' % dataset_size)

    model = create_model(opt)  
    
    for i, data in enumerate(dataset):

        # add gaussian noise channel, wash the label
        t_mask = torch.FloatTensor((data['label'].cpu().numpy() == 7).astype(np.float))
        mask_clothes = torch.FloatTensor((data['label'].cpu().numpy() == 4).astype(np.int))
        mask_fore = torch.FloatTensor((data['label'].cpu().numpy() > 0).astype(np.int))
        img_fore = data['image'] * mask_fore
        img_fore_wc = img_fore * mask_fore
        all_clothes_label = changearm(data['label'])

        ############## Forward Pass ######################
        fake_image, warped_cloth, refined_cloth = model(Variable(data['label'].cuda()), Variable(data['edge'].cuda()), Variable(img_fore.cuda()), Variable(
            mask_clothes.cuda()), Variable(data['color'].cuda()), Variable(all_clothes_label.cuda()), Variable(data['image'].cuda()), Variable(data['pose'].cuda()), Variable(data['image'].cuda()), Variable(mask_fore.cuda()))

        # make output folders
        output_dir = os.path.join(opt.results_dir, opt.phase)
        fake_image_dir = os.path.join(output_dir, 'try-on')
        os.makedirs(fake_image_dir, exist_ok=True)
        warped_cloth_dir = os.path.join(output_dir, 'warped_cloth')
        os.makedirs(warped_cloth_dir, exist_ok=True)
        refined_cloth_dir = os.path.join(output_dir, 'refined_cloth')
        os.makedirs(refined_cloth_dir, exist_ok=True)

        # save output
        for j in range(opt.batchSize):
            print("Saving", data['name'][j])
            save_tensor_as_image(fake_image[j],
                                      os.path.join(fake_image_dir, data['name'][j]))
            save_tensor_as_image(warped_cloth[j],
                                      os.path.join(warped_cloth_dir, data['name'][j]))
            save_tensor_as_image(refined_cloth[j],
                                      os.path.join(refined_cloth_dir, data['name'][j]))
                                      
    return result_img

"""Output function"""
def output_fn(prediction, content_type):
    global user_id
    respJSON = {'Output': prediction}
    s3 = boto3.resource('s3')
    s3.meta.client.upload_file(ROOT_PATH+"results/test/try-on/" + user_id + ".png" , BUCKET_NAME, RESULT_PATH + prediction)
    
    #Emptying contents of the person metadata
    dir= ROOT_PATH + TEST_IMG
    filelist = glob.glob(os.path.join(dir, "*"))
    for f in filelist:
        os.remove(f)
        
    dir= ROOT_PATH + TEST_LABEL
    filelist = glob.glob(os.path.join(dir, "*"))
    for f in filelist:
        os.remove(f)
        
    dir= ROOT_PATH + TEST_POSE
    filelist = glob.glob(os.path.join(dir, "*"))
    for f in filelist:
        os.remove(f)
        
    dir= ROOT_PATH + PERSON_IMG
    filelist = glob.glob(os.path.join(dir, "*"))
    for f in filelist:
        os.remove(f)
        
    f = open(ROOT_PATH + TEST_PAIRS, 'r+')
    f.truncate(0)
    
    print("Print current folder after save",os.listdir(ROOT_PATH + TEST_IMG))
    print("Print current folder after save",os.listdir(ROOT_PATH + TEST_LABEL))
    print("Print current folder after save",os.listdir(ROOT_PATH + TEST_POSE))
    print("Print current folder after save",os.listdir(ROOT_PATH + PERSON_IMG))
    print("Print current folder after save",os.listdir(ROOT_PATH + PERSON_IMG))
    with open(ROOT_PATH + TEST_PAIRS, 'r') as f:
        print("Content inside test-pairs.txt after removing " , f.read())
    
    return respJSON
