# 專題題目: sqlmap GUI written in python with Flask

## 開發環境

- [Ubuntu 18.04 LTS](https://ubuntu.com/download/desktop)
- [python 3.6.8](https://www.python.org/)
  - `pip3 install connexion[swagger-ui] swagger-ui-bundle Flask`

## 進度

### 2019.10.23
- swagger.yml: 定義 RESTful API 格式
- command.py: 實作 API 細節
- HTML + jQuery: GUI 前端
![](https://i.imgur.com/Og4ly1i.jpg)
- API will execute the command in the textbox and return the output
> Problem
> 1. 如何處理 interactive mode (command 在跑的同時一邊輸出 output，而不是全部跑完一次輸出)

> Todo
> 1. 找一些 sqlmap 可以打進去的網站，然後去抓 log

### 2019.10.28
![](https://i.imgur.com/3halMeW.png)
- 可以逐行顯示執行結果，不需要等到 command 整個跑完才一次輸出結果
> Todo
> 1. 把 UI 畫好，接上 API

### 2019.11.13
![](https://i.imgur.com/Kb5Udyo.png)
- 將 [sqlmap usage](https://github.com/sqlmapproject/sqlmap/wiki/Usage) 上的選項全部貼到 GUI 上面，可以透過勾選、輸文字來設定參數，並利用 API 生成相對應的指令
> Problem
> 1. target 的選項，好像找不到有人用很多個的例子 (usage 上面寫 at least one 但是沒有指明能不能多個 target)
> 2. 有些東西應該不用放在 html 裡面，有註明起來

> Todo
> 1. toggleable tabs ([reference](https://www.w3schools.com/howto/howto_js_tabs.asp))
> 2. checkbox 的 style
> 3. 搜尋字串功能
> 4. attack 的 output 要放哪裡
> 5. 做一下 save 按鈕，可以把 output 存起來
> 6. 有空可以看一下 target 跟其他 argument 的搭配
> 7. 前端 (js) 檢查 input，打勾但是沒有填值要跳 error，還有上面提到的 target 跟誰搭配的部分
