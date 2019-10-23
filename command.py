from datetime import datetime
from flask import make_response, abort
import subprocess, re

COMMAND = []

def get_timestamp():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def read():
    return COMMAND

def run(command):
    result = subprocess.run(command['command'], shell=True, stdout=subprocess.PIPE)
    result = result.stdout.decode('utf-8')
    result = re.sub(r'\n', '<br/>', result)
    COMMAND.append({
        'command': command['command'], 
        'output': result, 
        'timestamp': get_timestamp(),
    })
    return COMMAND
    # return make_response(f'\"{command}\" successfully ran', 201)