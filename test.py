from pathlib import Path
from fastapi import FastAPI, Request, Header, Response
from fastapi.responses import HTMLResponse, PlainTextResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import datetime
import redis_usr
import redis_gen

app = FastAPI()
redis_gen.redisGenerator()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/index", response_class=HTMLResponse)
async def read_item(request: Request):
    return templates.TemplateResponse("rtcds.html", {"request": request})


@app.get("/index/time1", response_class=PlainTextResponse)
async def get_time1():
    return datetime.datetime.now().strftime("%H:%M:%S")


@app.get("/index/time2", response_class=PlainTextResponse)
async def get_time2():
    return datetime.datetime.now().strftime("%H.%M.%S")


@app.get("/index/table", response_class=JSONResponse)
async def get_data():
    return redis_usr.redisUsr()

@app.post("/index/video_feed", response_class=JSONResponse)
async def get_video():
    # return redis_usr.get_video()
    return redis_usr.get_buf_video()
