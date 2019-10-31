from datetime import datetime
from flask import make_response, abort
import subprocess, re, time

COMMAND = {}

def get_timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def read():
    return [COMMAND]

def run(command):
    COMMAND['command'] = command['command']
    COMMAND['output'] = ''
    COMMAND['timestamp'] = get_timestamp()
    proc = subprocess.Popen(command['command'], 
                            stdin=subprocess.PIPE, 
                            stdout=subprocess.PIPE, 
                            shell=True, 
                            universal_newlines=True)
    while True:
        line = proc.stdout.readline()
        if line == '' and proc.poll() != None:
            break
        line = re.sub(r'\n', '<br/>', line)
        line = re.sub(r'\s', '&nbsp;', line)
        COMMAND['output'] += line