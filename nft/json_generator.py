import json
from PIL import Image
import os, os.path
import glob
path = 'C:/Users/yoeri/PycharmProjects/nft/images/C/'

path = "C:/Users/yoeri/PycharmProjects/nft/images/C"
def generatejson():
    metadata_xx = {
        "name": "John",
        "description": 30,
        "image": "New York",
        "properties": "null"
    }

    y = json.dumps(metadata_xx)
    print(y)




def readfilename():
    path = 'C:/Users/yoeri/PycharmProjects/nft/images/C/'

    for root, dirs, files in os.walk(path):
        for file in files:

            file_name = str(os.path.basename(file))



