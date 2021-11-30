import redis
import time
import json
import numpy as np
import base64

rd = redis.StrictRedis(host='localhost', port=6379, db=0)
def redisUsr():
    global rd

    rData = rd.get("dict") #문자열 데이터 - Detected Criminals
    rData = rData.decode('utf-8')
    rData = json.loads(rData)

    #Stream data
    return rData

def get_video(): #full video
    global rd
    stream = rd.get("vid")
    stream = stream.decode('utf-8')
    stream = json.loads(stream)

    
    return stream

def get_buf_video(): 
    global rd
    stream = rd.rpop("vid") #1frame
    stream = json.loads(stream)
    return stream
