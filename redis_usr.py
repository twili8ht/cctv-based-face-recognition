import redis
import time
import json


def redisUsr():
    rd = redis.StrictRedis(host='localhost', port=6379, db=0)

    # while True:
    #     print(rd.get('now').decode())
    #     time.sleep(0.1)
    rData = rd.get("dict")
    rData = rData.decode('utf-8')
    rData = json.loads(rData)
    return rData