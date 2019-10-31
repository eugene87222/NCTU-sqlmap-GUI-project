import sys, argparse, threading, webbrowser
from flask import Flask, render_template
import connexion

app = connexion.App(__name__, specification_dir='./')
app.add_api('swagger.yml')

@app.route('/')
def home():
    return render_template('home.html')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('-b', action='store_false', default=True, help='set to open browser while API is running')
    args = parser.parse_args(sys.argv[1:])
    debug = vars(args)['b']
    if not debug:
        url = 'http://127.0.0.1:5000'
        threading.Timer(2, lambda: webbrowser.open(url)).start()
    app.run(host='0.0.0.0', port=5000, debug=debug)