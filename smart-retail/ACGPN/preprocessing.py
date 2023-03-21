import os
import cv2
import sys
import glob
import time
import boto3
import U2Net
import config
import base64
import IPython
import requests
import numpy as np
from PIL import Image
import mediapipe as mp
from io import BytesIO
from boto3 import client
from U2Net import u2net_run
from U2Net import u2net_load
from skimage import io, transform
from platform import python_version
from predict_pose import generate_pose_keypoints
from config import get_bucket_name, get_root_path, get_cloth_name, get_image_name, get_test_color, get_colormask, get_test_edge, get_test_img, get_test_label, get_test_mask, get_test_pose, get_inputs_path, get_person_img_path, get_cloth_img_path, get_test_pairs, get_metadata_path, get_cloth_path_bucket


IMG_NAME=""
user_id= ""
INPUT = get_inputs_path()
ROOT_PATH = get_root_path()
CLOTH_NAME = get_cloth_name()
BUCKET_NAME = get_bucket_name()
CLOTH_IMG = get_cloth_img_path()
PERSON_IMG = get_person_img_path()
METADATA_PATH = get_metadata_path() 
BUCKET_CLOTH_PATH = get_cloth_path_bucket() 

TEST_COLOR = get_test_color()
COLORMASK = get_colormask()
TEST_EDGE = get_test_edge()
TEST_IMG = get_test_img()
TEST_LABEL = get_test_label()
TEST_MASK = get_test_mask()
TEST_POSE = get_test_pose()
TEST_PAIRS = get_test_pairs()


"""Making necessary directories"""
def make_directories():
    os.makedirs(ROOT_PATH + "results/", exist_ok=True)
    os.makedirs(ROOT_PATH + INPUT + "/", exist_ok=True)         
    os.makedirs(ROOT_PATH + CLOTH_IMG + "/", exist_ok=True)
    os.makedirs(ROOT_PATH + PERSON_IMG + "/", exist_ok=True)
    os.makedirs(ROOT_PATH + TEST_COLOR+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + COLORMASK+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_EDGE+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_IMG+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_LABEL+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_MASK + "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_POSE+ "/", exist_ok=True)


"""Getting input data from S3 into folders"""
def save_input_data(input_data):
    
    global IMG_NAME, user_id
    IMG_NAME = get_image_name(input_data[0])
    user_id= input_data[0]

    person_test_img= METADATA_PATH + user_id +"_test_img.png"
    person_test_label= METADATA_PATH + user_id +"_test_label.png"
    person_keypoints= METADATA_PATH + user_id +"_keypoints.json"
    
    cloth_image = BUCKET_CLOTH_PATH + input_data[1]     
    cloth_image_name= "/" + CLOTH_NAME #"/cloth_img.png"
    person_image_name = "/" + input_data[0] + ".png"
    
    s3 = boto3.resource('s3')
    s3.meta.client.download_file(BUCKET_NAME ,cloth_image , ROOT_PATH + CLOTH_IMG + cloth_image_name)
    s3.meta.client.download_file(BUCKET_NAME ,person_test_img, ROOT_PATH + PERSON_IMG + person_image_name)
    s3.meta.client.download_file(BUCKET_NAME ,person_test_img, ROOT_PATH + TEST_IMG + '/'+ user_id + '.png')
    s3.meta.client.download_file(BUCKET_NAME ,person_test_label, ROOT_PATH + TEST_LABEL + '/'+ user_id + '.png')
    s3.meta.client.download_file(BUCKET_NAME ,person_keypoints, ROOT_PATH + TEST_POSE + '/'+ user_id + '_keypoints.json')
    
    
"""Generating cloth mask"""    
def generate_cloth_mask():
    u2netload_start_time = time.time()
    u2net = u2net_load.model(model_name='u2netp')
    u2netload_end_time = time.time()
    print('U2NEt load in {}s'.format(u2netload_end_time-u2netload_start_time))
    
    cloth_start_time = time.time()
    cloth_path = os.path.join(ROOT_PATH + CLOTH_IMG, sorted(os.listdir(ROOT_PATH + CLOTH_IMG))[0])
    
    #Cloth resize and save
    cloth = Image.open(cloth_path)
    cloth = cloth.resize((192, 256), Image.BICUBIC).convert('RGB')
    cloth.save(os.path.join(ROOT_PATH + TEST_COLOR, CLOTH_NAME))
    
    # Cloth mask generation
    u2net_run.infer(u2net, 'code/' + TEST_COLOR ,'code/' + TEST_EDGE)
    clothmask_time = time.time()
    print('cloth mask image in {}s'.format(clothmask_time-cloth_start_time))
    
"""Adding test pairs"""
def generate_test_pairs():
    global IMG_NAME
    with open(ROOT_PATH + TEST_PAIRS, 'w') as f:
        f.write(IMG_NAME + ' ' + CLOTH_NAME)
        
    with open(ROOT_PATH + TEST_PAIRS, 'r') as f:
        print("Content inside test-pairs.txt " , f.read())
    

"""Calling preprocessing funcitons"""
def inference(input_data): 
    make_directories()
    save_input_data(input_data)  
    generate_cloth_mask()
    generate_test_pairs()