# sqlmap GUI written in python with Flask

## Environment
- [Ubuntu 18.04 LTS](https://ubuntu.com/download/desktop)
- [Python 3.6.8](https://www.python.org/)
- Python packages
    - `pip3 install -r requirements.txt`
- [sqlmap](https://github.com/sqlmapproject)
    - We recommended that the users download sqlmap with `git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap`.

## Installation

```bash
mkdir sqlmap-gui
cd sqlmap-gui
git clone https://github.com/eugene87222/NCTU-sqlmap-GUI-project.git gui
git clone --depth 1 https://github.com/sqlmapproject/sqlmap.git sqlmap
cd gui
python3 server.py
```
Go to `localhost:5000` then enjoy the clean sqlmap GUI.

## Assignment of responsibility
- GUI (HTML, JS, CSS): [Andy Wu](https://www.facebook.com/andy.wu.391420), [Rita Wu](https://www.facebook.com/RitaWu1998)
- RESTful API (Python): [Eugene Yang](https://github.com/eugene87222)

## Log
- [2019.10.23](https://github.com/eugene87222/NCTU-sqlmap-GUI-project/blob/master/20191023.md)
- [2019.10.28](https://github.com/eugene87222/NCTU-sqlmap-GUI-project/blob/master/20191028.md)
- [2019.11.13](https://github.com/eugene87222/NCTU-sqlmap-GUI-project/blob/master/20191113.md)
- [2019.12.02](https://github.com/eugene87222/NCTU-sqlmap-GUI-project/blob/master/20191202.md)
- [2019.12.13]()
