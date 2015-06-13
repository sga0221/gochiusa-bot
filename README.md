# gochiusa-bot

[![Build Status](https://travis-ci.org/jtwp470/gochiusa-bot.svg)](https://travis-ci.org/jtwp470/gochiusa-bot)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

gochiusa-bot is "Is the order a rabbit?" BOT.

(Inspired by [Makibot](https://github.com/sanographix/makibot))

## Feature

* ごちうさというフレーズに反応してアニメ画像をランダムで吐きます.
* chino / @chino でチノちゃんがランダムでつぶやきます.
* `$`で囲まれた部分をLaTeXと認識して数式を画像化したものを返します.
* 麻雀点数計算機能
    * `point 10 han`とかで点数を返します.[実装途中]

## 機能追加
基本的には`scripts/hoge.coffee`にCoffeeScriptで拡張機能を書きます.面白い機能やほしい機能があれば是非プルリクエストやIssueを立てていただけると幸いです.

## How to contribute

1. [Fork](https://github.com/jtwp470/gochiusa-bot/fork) this repository.
2. Check other pull request because we don't accept a redudant request.
3. Push and submit your pull request. (Plz submit your code to accept CI test.)

## License
MIT License
