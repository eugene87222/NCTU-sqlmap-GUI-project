# Term project: sqlmap GUI written in python with Flask

## Develop environment

- [Ubuntu 18.04 LTS](https://ubuntu.com/download/desktop)
- [python 3.6.8](https://www.python.org/)
  - `pip3 install connexion[swagger-ui] swagger-ui-bundle Flask`

## Progress

### 2019.10.23
- swagger.yml: RESTful API definition
- command.py: API implementation
- HTML + jQuery: GUI

![](https://i.imgur.com/PII19jZ.jpg)  
▲ API will execute the command in the textbox and return the output

> Problem and future plan
> 1. 如何處理 interactive mode
> 2. 找一些 sqlmap 可以打進去的網站，然後去抓 log

### 2019.10.28
![](https://i.imgur.com/3halMeW.png)
▲ 可以逐行顯示執行結果，不需要等到 command 整個跑完才一次輸出結果

> Problem and future plan
> 1. 把 UI 畫好，接上 API
