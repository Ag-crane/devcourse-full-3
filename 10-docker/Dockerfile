FROM ubuntu:22.04

RUN apt-get update && apt-get install -y python3
COPY hello.py .

ENTRYPOINT [ "python3", "hello.py" ]