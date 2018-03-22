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

  robot.router.get("/new-cron", (req, res) => {
    res.render('new', { title: 'hubot-setting' });
  });

  robot.router.post("/new-cron", (req, res) => {
    const dummyId = 999;
    const user = new User(dummyId);
    user.name = 'eichisanden';
    user.room = req.body.room;
    const pattern = req.body.pattern;
    const message = req.body.message;
    const msg = new TextMessage(user, `${robot.name} new job ${pattern} "${message}"`, dummyId);
    robot.receive(msg);
    res.render('index', { title: 'hubot-setting', data: msg });
  });
};

