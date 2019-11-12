from datetime import datetime
from flask import make_response, abort
import subprocess, re, time, json, platform, os

COMMAND_RESULT = {}
if 'Windows' in platform.platform():
    PYTHON = 'python'
else:
    PYTHON = 'python3'
SECTIONS = [
    'target', 'request', 'optimization', 'injection', 'detection', 'techniques', 
    'fingerprint', 'enumeration', 'brute-force', 'user-defined-function-injection', 
    'file-system-access', 'operating-system-access', 'windows-registry-access', 
    'general', 'miscellaneous'
]

def get_timestamp():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

def read():
    return [COMMAND_RESULT]

def save():
    filename = re.sub(r':', '', COMMAND_RESULT['timestamp'])
    with open(f'{filename}.log', 'w', encoding='utf-8') as file:
        file.write(f"Command: {COMMAND_RESULT['command']}\n\n")
        result = re.sub(r'<br/>', '\n', COMMAND_RESULT['output'])
        result = re.sub(r'&nbsp', ' ', result)
        file.write(result)
    return make_response('OK', 200)

def run(args):
    command = f'{PYTHON} ../sqlmap/sqlmap.py'
    command += f" -v {args['v']}"
    for section in SECTIONS:
        for option in args[section]:
            if args[section][option]['check']:
                # 如果有打勾但是沒有填值還是會被加到參數裡面
                if 'value' in args[section][option]:
                    if len(option) == 1:
                        command += f" -{option} \"{args[section][option]['value']}\""
                    else:
                        command += f" --{option}=\"{args[section][option]['value']}\""
                else:
                    if len(option) == 1:
                        command += f' -{option}'
                    else:
                        command += f' --{option}'                    
    print(command)
    return make_response('OK', 200)

def info(args):
    command = f"{PYTHON} ../sqlmap/sqlmap.py {args['type']}"
    proc = subprocess.run(command, 
                        shell=True, 
                        stdin=subprocess.PIPE, 
                        stdout=subprocess.PIPE)
    result = proc.stdout.decode('utf-8')
    try:
        result = re.findall(r'(.+)Press Enter to continue', result, re.S)[0].strip()
    except:
        pass
    result = re.sub(r'\n', '<br/>', result)
    result = re.sub(r'\s', '&nbsp;', result)
    COMMAND_RESULT['command'] = command
    COMMAND_RESULT['output'] = result
    COMMAND_RESULT['timestamp'] = get_timestamp()
    return make_response('OK', 200)

# COMMAND_RESULT['command'] = command
# COMMAND_RESULT['output'] = ''
# COMMAND_RESULT['timestamp'] = get_timestamp()
# proc = subprocess.Popen(command, 
#                         stdin=subprocess.PIPE, 
#                         stdout=subprocess.PIPE, 
#                         shell=True, 
#                         universal_newlines=True)
# while True:
#     line = proc.stdout.readline()
#     if line == '' and proc.poll() != None:
#         break
#     line = re.sub(r'\n', '<br/>', line)
#     line = re.sub(r'\s', '&nbsp;', line)
#     COMMAND_RESULT['output'] += line