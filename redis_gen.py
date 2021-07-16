import redis
import datetime
import time
import json

def redisGenerator():
    rd = redis.StrictRedis(host='localhost', port=6379, db=0)

    #dummy data
    dataDict ={ 
        "data1" : {"Name": "AAA", "ID": "123", "DateTime": "234", "Location": "345", "Age": "24", "Duration": "54", "Confidence": "70"},
        "data2" : {"Name": "BBB", "ID": "674", "DateTime": "564", "Location": "786", "Age": "48", "Duration": "11", "Confidence": "50"}
    }
    # json dumps
    jsonDataDict = json.dumps(dataDict, ensure_ascii=False).encode('utf-8')

    # 데이터 set
    rd.set("dict", jsonDataDict)

    # while True:
    #     rd.set('now', datetime.datetime.now().strftime("%H:%M:%S"))
    #     time.sleep(0.1)
