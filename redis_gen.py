import redis
import datetime
import time
import json
import cv2 #파일로 비디오 읽기
import numpy as np
import base64
global rd

def lpush_frame(img):
    img = json.dumps(img).encode('utf-8')  #Object of type 'bytes' is not JSON serializable
    rd.lpush("vid", img)

def redisGenerator():
    global rd
    rd = redis.StrictRedis(host='localhost', port=6379, db=0)
    rd.flushdb() #db 초기화
    #dummy data1
    dataDict ={ 
        "data1" : {"Name": "AAA", "ID": "123", "DateTime": "234", "Location": "345", "Age": "24", "Duration": "54", "Confidence": "70"},
        "data2" : {"Name": "BBB", "ID": "674", "DateTime": "564", "Location": "786", "Age": "48", "Duration": "11", "Confidence": "50"}
    }
    #video sample (임의의 샘플 video)  -- cap = cv2.VideoCapture(videofilename)
    # cap = cv2.VideoCapture('1person_Choi.mp4')
    vid_dict = {} #redis에 저장할 딕셔너리 구조 예) vid1 : [frames..], vid2 : [frames...]
    frames = [] #프레임 저장 리스트 
    while(cap.isOpened()):
        ret, frame = cap.read()  

        if frame is not None:    
            # gray = frame.tobytes()
            # gray = frame
            retval, buffer = cv2.imencode('.jpg', frame)
            fr = base64.b64encode(buffer) #Json dump를 위한 encoding #base64 encode read data, result = bytes
            fr = fr.decode('utf-8')
            frames.append([fr])
            #Lpush
            lpush_frame(fr)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break   
        if  frame is None:
            break

    cap.release()
    

    # store table data as dictionary 
    jsonDataDict = json.dumps(dataDict, ensure_ascii=False).encode('utf-8')
    rd.set("dict", jsonDataDict)