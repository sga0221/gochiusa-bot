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
      content:
        title: "Result"
        title_link: url
        image_url: url
        color: "#764FA5"
    robot.emit "slack.attachment", data
