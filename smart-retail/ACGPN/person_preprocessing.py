import os
import time
import glob
import json
import boto3
from PIL import Image
from boto3 import client
from predict_pose import generate_pose_keypoints
from config import get_bucket_name, get_root_path, get_inputs_path, get_image_name, get_person_img_path, get_test_img, get_test_label, get_test_mask, get_test_pose

user_id=""
IMG_NAME=""
directory_name = ""

TEST_IMG = get_test_img()
INPUT = get_inputs_path()
TEST_MASK = get_test_mask()
TEST_POSE = get_test_pose()
ROOT_PATH = get_root_path()
TEST_LABEL = get_test_label()
BUCKET_NAME = get_bucket_name()
PERSON_IMG = get_person_img_path()


"""model function"""
def model_fn(model_dir):  
    return "inside person preprocessing model fn"

"""input function"""
def input_fn(input_data, request_content_type):
    if request_content_type == 'application/json':
        request_body = json.loads(input_data)
        inpVar = request_body["Input"]
        print("INPUT VAR", inpVar)
        return inpVar
    else:
        raise ValueError("This model only supports application/json input")

"""predict fuction"""
def predict_fn(input_data, model):
    person_preprocess(input_data)
    user_id = input_data.split(".")[0]  
    return user_id
        
"""Output function"""
def output_fn(user_id, content_type):
    print("result user_id : ", user_id)
    respJSON = {'Output': user_id}
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
    
    print("Print current folder after save",os.listdir(ROOT_PATH + TEST_IMG))
    print("Print current folder after save",os.listdir(ROOT_PATH + TEST_LABEL))
    print("Print current folder after save",os.listdir(ROOT_PATH + TEST_POSE))
    print("Print current folder after save",os.listdir(ROOT_PATH + PERSON_IMG))
    
    return respJSON

"""Calling person preprocessing"""
def person_preprocess(input_data):
    make_dirs()
    input_save(input_data)
    resize_human_image()
    self_correction_human_parsing()
    generate_keypoints()
    
"""Making necessary directories"""
def make_dirs():
    os.makedirs(ROOT_PATH + TEST_IMG+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_LABEL+ "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_MASK + "/", exist_ok=True)    
    os.makedirs(ROOT_PATH + TEST_POSE+ "/", exist_ok=True)
    os.makedirs(ROOT_PATH + INPUT + "/", exist_ok=True)   
    os.makedirs(ROOT_PATH + PERSON_IMG + "/", exist_ok=True)
    
"""Saving person image from S3"""    
def input_save(input_data):
    global IMG_NAME
    IMG_NAME= get_image_name(input_data[:-4])
    person_image = "user_images/"+input_data
    person_image_name= "/" + input_data
    
    s3 = boto3.resource('s3')
    s3.meta.client.download_file(BUCKET_NAME ,person_image, ROOT_PATH + PERSON_IMG + person_image_name)

"""Resizing image"""
def resize_human_image():
    global IMG_NAME
    global user_id
    user_id = IMG_NAME[:-4]
    
    start_time = time.time()
    img_path = os.path.join(ROOT_PATH + PERSON_IMG, sorted(os.listdir(ROOT_PATH + PERSON_IMG))[0])
    img = Image.open(img_path)
    img = img.resize((192, 256), Image.BICUBIC)
    img_path = os.path.join(ROOT_PATH + TEST_IMG, IMG_NAME)
    img.save(img_path)
    
    global directory_name
    directory_name = "person_metadata/" 
    s3 = boto3.resource('s3')
    s3.meta.client.upload_file(ROOT_PATH + TEST_IMG + "/" + IMG_NAME , BUCKET_NAME , directory_name + user_id + "_test_img.png")

    resize_time = time.time()
    print('Resized image in {}s'.format(resize_time-start_time))
    
"""Creation of test label using Self correction Human parsing"""
def self_correction_human_parsing():
    global IMG_NAME
    start_time = time.time()
    schp_input_dir= ROOT_PATH + TEST_IMG
    schp_output_dir= ROOT_PATH + TEST_LABEL

    os.system("python3 code/Self-Correction-Human-Parsing-for-ACGPN/simple_extractor.py --dataset 'lip' --model-restore 'code/lip_final.pth' --input-dir '/.sagemaker/mms/models/model/code/Data_preprocessing/test_img' --output-dir '/.sagemaker/mms/models/model/code/Data_preprocessing/test_label'")
    
    s3 = boto3.resource('s3')
    s3.meta.client.upload_file(ROOT_PATH + TEST_LABEL+ "/" + IMG_NAME, BUCKET_NAME, directory_name + user_id + "_test_label.png")
       
    parse_time = time.time()
    print('Parsing generated in {}s'.format(parse_time-start_time))
    
"""Generation pose keypoints using caffe model"""
def generate_keypoints():
    global IMG_NAME
    start_time = time.time()
    img_path = os.path.join(ROOT_PATH + TEST_IMG, sorted(os.listdir(ROOT_PATH + TEST_IMG))[0])
    pose_path = os.path.join(ROOT_PATH + TEST_POSE, IMG_NAME.replace('.png', '_keypoints.json'))
    generate_pose_keypoints(img_path, pose_path)
    pose_time = time.time()
    print('Pose map generated in {}s'.format(pose_time-start_time))
    
    s3 = boto3.resource('s3')
    s3.meta.client.upload_file(ROOT_PATH + TEST_POSE+ "/" + IMG_NAME[:-4] + '_keypoints.json', BUCKET_NAME, directory_name + user_id + '_keypoints.json')
    