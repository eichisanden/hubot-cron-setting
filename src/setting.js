// Description
//   setting screen for hubot
//
// Configuration:
//   LIST_OF_ENV_VARS_TO_SET
//
// Commands:
//   hubot hello - <what the respond trigger does>
//   orly - <what the hear trigger does>
//
// Notes:
//   <optional notes required for the script>
//
// Author:
//   eichisanden <eichisanden@gmail.com>

const path = require('path');
const TextMessage = require('hubot').TextMessage;
const User = require('hubot').User;

module.exports = (robot) => {
  robot.router.set('views', path.join(__dirname, '..', 'views'));
  robot.router.set('view engine', 'pug');
  robot.router.get("/setting", (req, res) => {
    const data = robot.brain.data.cronjob;
    console.log(data);
    res.render('index', { title: 'hubot-setting', data: JSON.stringify(data) });
  });
  robot.router.get("/save", (req, res) => {
    const user = new User(999);
    user.name = 'eichisanden';
    user.room = 'town-square';
    const msg = new TextMessage(user, robot.name + " new job 0 9 * * 1-5 \"Good morning everyone!\"");
    console.log(msg);
    robot.receive(msg);
    res.render('index', { title: 'hubot-setting', data: msg });
  });
};

