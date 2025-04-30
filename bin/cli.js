#!/usr/bin/env node

const { program } = require("commander");
const inquirer = require("inquirer");
const packageData = require("../package.json");
const question = require("../src/question");
const myChalk = require("../utils/chalk");
const createProject = require("../src/create");
// const git = require("../src/git");

const figlet = require("figlet");

console.log('\r\n' + figlet.textSync('VueTurbo', {
  horizontalLayout: 'default',
  verticalLayout: 'default',
  width: 100,
  whitespaceBreak: true
}));
// 测试
console.log("123");
alert("123");

const { red } = myChalk;

/** 获取package.json的版本号 **/
program.version(packageData.version, "-v, --version", "获取当前版本号");

/** 创建项目 */
program
  .command("create")
  .description("创建一个项目")
  .action(function () {
    inquirer.default
      .prompt(question.create)
      .then(async (answer) => {
        if (answer.conf) {
          createProject(answer);
        } else {
          red(`🆘 您已经终止此操作 🆘`);
        }
      })
      .catch((err) => {
        // console.log("🚀 ~ file: cli.js ~ line 27 ~ inquirer.prompt ~ err", err)
        red(`❌ 程序出错 ❌`);
        process.exit(1);
      });
  });

/** 推送远程仓库 */
// program
//   .command("pushGit")
//   .description("推送到gitlab仓库")
//   .action(function () {
//     inquirer
//       .prompt(question.pushGit)
//       .then((answer) => {
//         git.push(answer.url);
//       })
//       .catch((err) => {
//         red(`❌ 程序出错 ❌`);
//         process.exit(1);
//       });
//   });

//解析命令行的指令
program.parse(process.argv);
