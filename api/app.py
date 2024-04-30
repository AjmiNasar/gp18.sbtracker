from fastapi import FastAPI,WebSocket,Depends,HTTPException, status
from tortoise.contrib.fastapi import register_tortoise
from tortoise import Tortoise, fields, run_async
from models import Gpsdata,Gpsdata_pydantic,Gpsdata_pydanticIn,user_model,bus_model,User,BusDetailsEve,bus_modelIn,userIn_model,User
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Optional
from fastapi import Form
# from geopy.distance import distance

app=FastAPI()

origins=['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return {'Msg':"read from docs"}


@app.post('/gpsdata')
async def add_gpsdata(gpsinfo:Gpsdata_pydantic):
    gpdsdata_obj= await Gpsdata.create(**gpsinfo.dict(exclude_unset = True))
    response = await Gpsdata_pydantic.from_tortoise_orm(gpdsdata_obj)
    return {'status' :'ok', 'data': response}

@app.get('/gpsdata')
async def get_gpsdata():
    response=await Gpsdata_pydantic.from_queryset(Gpsdata.all())
    return {"status":"ok","data":response}

@app.get('/getbusdetailseve')
async def getbusdetall():
    response=await bus_model.from_queryset(BusDetailsEve.all())
    return {"status":"ok","data":response}

@app.get('/getbusdetailseve/{bus_id}')
async def getbusdet(bus_id:int):
    response=await bus_model.from_queryset_single(BusDetailsEve.get(bus =bus_id))
    distances=[]
    i=0
    for stop in response.stops:
        if i == 0:
            lat = response.school_pt['latitude']
            long = response.school_pt['longitude']
            stop=response.stops[0]
            lat2=stop['pt']['latitude']
            long2=stop['pt']['longitude']
            i+=1
        else:
            stop=response.stops[i-1]
            lat = stop['pt']['latitude']
            long=stop['pt']['longitude']
            stop2=response.stops[i]
            lat2 = stop2['pt']['latitude']
            long2=stop2['pt']['longitude']
            i+=1

        location=float(lat),float(long)
        location2=float(lat2),float(long2)
        dist=distance(location,location2).kilometers
        distances.append(dist)
    avg_speed=40
    time=[]
    for dist in distances:
        t=dist/avg_speed
        t_min=t*60
        time.append(round(t_min,2))
    initial_time = datetime.datetime.strptime("03:30", "%H:%M")
    arrival_times=[]
    for t in time:
        initial_time += datetime.timedelta(minutes=t)
        arrival_times.append(initial_time.strftime("%H:%M"))

    return {"status":"ok","data":response ,"distances":distances,"time":arrival_times}
    

@app.post('/busdet_eve')
async def busdetails(businfo:bus_model):
    bus_obj=await BusDetailsEve.create(**businfo.dict(exclude_unset=True))
    response=await bus_model.from_tortoise_orm(bus_obj)
    return {"status":"ok","data":response}

@app.put('/busdet_eve/{bus_id}')
async def update_busdata(bus_id : int, update_info: bus_modelIn):
    bus = await BusDetailsEve.get(bus= bus_id)
    update_info = update_info.dict(exclude_unset = True)
    bus.school_pt=update_info['school_pt']
    bus.end_pt=update_info['end_pt']
    bus.stops=update_info['stops']
    await bus.save()
    response= await bus_model.from_tortoise_orm(bus)
    return {'status':'ok','data':response}

@app.get('/userdata')
async def get_userdata():
    response=await user_model.from_queryset(User.all())
    return {"status":"ok","data":response}


@app.post('/userdata')
async def add_userdata(userinfo:user_model):
    user_obj=await User.create(**userinfo.dict(exclude_unset=True))
    response=await user_model.from_tortoise_orm(user_obj)
    return {"status":"ok","data":response}

@app.get('/busregdata/{bus_id}')
async def get_busregdata():
    response=await bus_model.from_queryset(BusDetails.all().values('bus', 'userid'))
    return {"status":"ok","data":response}


@app.post('/busregdata/{user_id}')
async def add_busregdata(user_id:int,busreginfo:bus_model):
    user_det=await User.get(userid=user_id)
    bus_obj=await Bus.create(**busreginfo.dict(),user=user_det)
    response=await bus_model.from_tortoise_orm(bus_obj)
    return {"status":"ok","data":response}


@app.get('/busdata')
async def get_busdata():
    response=await bus_model.from_queryset(BusDetails.all())
    return {"status":"ok","data":response}

@app.post('/busdata/{bus_id}')
async def add_busdata(bus_id:int,businfo:bus_model):
    bus_det=await Bus.get(bus_id=bus_id)
    bus_obj=await BusDetails.create(**businfo.dict(),bus=bus_det)
    response=await bus_model.from_tortoise_orm(bus_obj)
    return {"status":"ok","data":response}

@app.get('/mapdata/{user_id}')
async def mapdata(user_id:int):
    user_det=await User.get(userid=user_id)
    print(user_det)
    bus_det=await Bus.get(user=user_det)
    bus_details=await BusDetails.get(bus=bus_det)
    return {"data":bus_details}

@app.websocket('/ws')
async def testsocket(websocket:WebSocket):
    print("Accepting connection")
    await websocket.accept()
    print("Accepted")
    while True:
        try:
            data=await websocket.receive_text()
            print(data)
        except:
            pass 
            break
    
#AUTHENTICATION
SECRET_KEY = "83daa0256a2289b0fb23693bf1f6034d44396675749244721a2b20e896e11662"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 800

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def get_password_hash(password):
    return pwd_context.hash(password)

async def get_user(username: str) -> Optional[User]:
    user = await User.get_or_none(username=username)
    return user

async def authenticate_user(username: str, password: str, schoolid: str) -> Optional[User]:
    user = await User.get_or_none(username=username)
    if not user:
        return None
    if not await verify_password(password, user.hashed_password):
        return None
    if user.schoolid != schoolid:
        return None
    return user

async def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now() + expires_delta
    else:
        expire = datetime.now() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@app.post("/login")
async def login_for_access_token(
    username: str = Form(...), 
    password: str = Form(...), 
    schoolid: str = Form(...),
    disabled: bool = Form(False),  
    access_token: str = Form(None)  
):
    user = await authenticate_user(username, password, schoolid)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Incorrect details",
                            headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    
    user.access_token = access_token
    await user.save()
    
    return {"access_token":access_token,"token_type":"bearer"}

@app.get("/login_det")
async def validusers():
    valid_users = await User.filter(access_token__isnull=False)
    return valid_users


@app.post("/users/")
async def create_user(user: userIn_model):
    # Check if the username already exists
    existing_user = await User.filter(username=user.username).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already registered")
    
    # Hash the password
    hashed_pwd = await get_password_hash(user.hashed_password)
    
    # Create the user using Tortoise ORM
    created_user = await User.create(
        username=user.username,
        hashed_password=hashed_pwd,
        schoolid=user.schoolid,
        disabled=False
    )
    
    return {"username": created_user.username}

@app.get("/users/")
async def get_users():
    users = await User.all()
    return {"users": users}

register_tortoise(
    app,
    db_url="sqlite://database.sqlite3",
    modules={"models": ["models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)