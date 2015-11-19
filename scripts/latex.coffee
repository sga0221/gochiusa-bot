# Description:
#   $$で囲まれたLaTeX形式の数式を返します
# Dependencies:
#   "hubot-slack-attachment"
#
# Commands:
#    $LaTeXCode$ => LaTeX picture
module.exports = (robot) ->
  robot.hear /\$.+?\$/, (msg) ->
    url = "http://latex.codecogs.com/png.latex$?\dpi{120}\LARGE$#{msg.match[0]}$"
    data =
      title: "Result"
      title_link: url
      image_url: url
    robot.emit "slack.attachment", data
