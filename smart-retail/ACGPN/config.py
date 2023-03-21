#bucket name
def get_bucket_name():
    bucket_name= "cp6-digitailinstore-bucket"
    return bucket_name

#person_metadata path in bucket
def get_metadata_path():
    person_metadata_path = "person_metadata/"
    return person_metadata_path

#cloths path in bucket
def get_cloth_path_bucket():
    bucket_cloth_path = "products/"
    return bucket_cloth_path

#root path
def get_root_path():
    root_path= "/.sagemaker/mms/models/model/code/"
    return root_path

#sagemaker input images path
def get_inputs_path():
    input_path = "inputs"
    return input_path

#sagemaker folder to store person image 
def get_person_img_path():
    img_path = "inputs/img"
    return img_path

#sagemaker folder to store cloth image
def get_cloth_img_path():
    cloth_path = "inputs/cloth"
    return cloth_path

#cloth name
def get_cloth_name():
    cloth_name= '000001_1.png'
    return cloth_name

#person image name
def get_image_name(person_img_name):
    image_name= person_img_name+'.png'
    return image_name

#resized cloth image path
def get_test_color():
    test_color = "Data_preprocessing/test_color"
    return test_color

#colormask
def get_colormask():
    colormask = "Data_preprocessing/test_colormask"
    return colormask

#cloth mask
def get_test_edge():
    test_edge = "Data_preprocessing/test_edge"
    return test_edge

#resized person image
def get_test_img():
    test_img = "Data_preprocessing/test_img"
    return test_img

#person parse image
def get_test_label():
    test_label = "Data_preprocessing/test_label"
    return test_label

#test mask
def get_test_mask():
    test_mask = "Data_preprocessing/test_mask"
    return test_mask

#pose keypoints for person image
def get_test_pose():
    test_pose = "Data_preprocessing/test_pose"
    return test_pose

#test pairs file
def get_test_pairs():
    test_pairs = 'Data_preprocessing/test_pairs.txt'
    return test_pairs

#result directory path
def get_result_path():
    result_path= "results/"
    return result_path