# Colt
Schulprojekt


# Use the Backend

1. Install the requirements

```
pip install -r requirements.txt
```

2. Install uvicorn as webserver

```
sudo apt install uvicorn
```

3. run the server 
```
uvicorn sql_app.main:app --reload
```

4. Access Swagger through
```
http://127.0.0.1:8000/docs
```
