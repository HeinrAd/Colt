#bin/sh

cp ./sql_app/requirements.txt ./
apk add --no-cache python3 py3-pip
python3 -m venv colt-venv
source colt-venv/bin/activate
pip install -r requirements.txt 
pip install uvicorn

uvicorn sql_app.main:app --host="0.0.0.0" --port=8000 --reload