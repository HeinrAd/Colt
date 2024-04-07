#bin/sh

cp ./sql_app/requirements.txt ./
apk add --no-cache python3 py3-pip
apk add install python3-venv
python3 -m venv colt-venv

pip install -r requirements.txt --break-system-packages
pip install uvicorn --break-system-packages

source colt-venv/bin/activate

uvicorn sql_app.main:app --host="0.0.0.0" --port=8000 --reload

