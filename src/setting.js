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

  robot.router.get("/hubot-cron-setting", (req, res) => {
    const data = robot.brain.data.cronjob;
    res.render('index', { title: 'hubot-cron-setting', data: data });
  });

  robot.router.get("/hubot-cron-setting/new", (req, res) => {
    res.render('new', { title: 'hubot-cron-setting' });
  });

  robot.router.post("/hubot-cron-setting/new", (req, res) => {
    const dummyId = 999;
    const user = new User(dummyId);
    user.name = 'anoymous';
    user.room = req.body.room;
    const pattern = req.body.pattern;
    const message = req.body.message;
    const msg = new TextMessage(user, `${robot.name} new job ${pattern} "${message}"`, dummyId);
    robot.receive(msg);

    setTimeout(() => {
      res.redirect('/hubot-cron-setting');
    }, 1000);
  });

  robot.router.get("/hubot-cron-setting/del", (req, res) => {
    const dummyId = 999;
    const user = new User(dummyId);
    user.name = 'anoymous';
    const id = req.query.id;
    const msg = new TextMessage(user, `${robot.name} rm job ${id}`, dummyId);
    robot.receive(msg);

    setTimeout(() => {
      res.redirect('/hubot-cron-setting');
    }, 1000);
  });
};

