FROM python:latest

WORKDIR /server

ARG workers=2
ENV workers=$workers

COPY ./server/ .

RUN apt-get update
RUN apt-get -y install default-mysql-client python3-dev default-libmysqlclient-dev

RUN pip3 install --upgrade pip

RUN pip3 install gunicorn
RUN pip3 install -r requirements.txt
RUN pip3 install mysql-connector-python
RUN pip3 install mysqlclient

RUN sed -i '1s@^@import os\n@' server.py
RUN sed -ir 's@.*settings.*load(f)@@' server.py
RUN sed -ir 's@with.*@settings = dict(os.environ.items())@' server.py

EXPOSE 8000

CMD  gunicorn -b 0.0.0.0:8000 -w ${workers} --log-level info server:app
