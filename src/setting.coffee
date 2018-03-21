# Description
#   setting screen for hubot
#
# Configuration:
#   LIST_OF_ENV_VARS_TO_SET
#
# Commands:
#   hubot hello - <what the respond trigger does>
#   orly - <what the hear trigger does>
#
# Notes:
#   <optional notes required for the script>
#
# Author:
#   eichisanden <eichisanden@gmail.com>

path = require 'path'

module.exports = (robot) ->
  robot.respond /hello/, (res) ->
    res.reply "hello!"

  robot.hear /orly/, (res) ->
    res.send "yarly"

  robot.router.set 'views', path.join(__dirname, '..', 'views');
  robot.router.set 'view engine', 'pug'
  robot.router.get "/setting", (req, res) ->
    res.render 'index', title: 'hubot-setting'

