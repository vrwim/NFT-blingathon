import json
from PIL import Image
import os, os.path
import glob
path = 'C:/Users/yoeri/PycharmProjects/nft/images/C/'
ipfs_image_path = 'https://gateway.pinata.cloud/ipfs/QmZPc4Jrgq14u4RNzE8BgJg16xGnVYZkZazCx4wL8kCMSs'
ipfs_metadata_path = 'https://ipfs.io/ipfs/QmWimcL9J1cyJ1nVn5Kb8rfGexT5NNVL2K5ZpfgH74aprG'
path = "C:/Users/yoeri/PycharmProjects/nft/images/C"


def generatejson(url,rarity):
    metadata_xx = {
        "name": "BLINGathon" + " " + rarity,
        "description": "NFT minted for participants of the Hackathon at the venue in Brugge - Belgium",
        "image": ipfs_image_path + "/" + url,
        "properties": "null"
    }

    y = json.dumps(metadata_xx)
    print(y)




def readfilename():
    path = 'C:/Users/yoeri/PycharmProjects/nft/images/C/'

    for root, dirs, files in os.walk(path):
        for file in files:

            file_name = str(os.path.basename(file))






