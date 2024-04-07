#bin/sh

cp ./sql_app/requirements.txt ./
apt-get install --no-cache python3 py3-pip
apt-get install python3-venv
python3 -m venv colt-venv

pip install -r requirements.txt --break-system-packages
pip install uvicorn --break-system-packages

source colt-venv/bin/activate

uvicorn sql_app.main:app --reload

