const fse = require("fs-extra");

const create = [
  {
    name: "conf",
    type: "confirm",
    message: "🆕 是否创建新的项目？",
  },
  {
    name: "name",
    message: "👉 请输入项目名称:",
    validate: function (val) {
      if (!val) {
        return "亲，你忘了输入项目的名称哦～";
      }
      if (fse.existsSync(val)) {
        return "当前目录已存在同名的项目，请更换项目名";
      }
      return true;
    },
    when: (res) => Boolean(res.conf),
  },
  {
    name: "desc",
    message: "💬 请输入项目的描述:",
    when: (res) => Boolean(res.conf),
  },
  {
    name: "template",
    type: "list",
    message: "🔜 请选择一个框架?",
    choices: [
      {
        key: "a",
        name: "admin",
        value: "https://github.com/coderItway/VueTurbo.git",
      },
      {
        key: "b",
        name: "h5",
        value: "https://github.com/coderItway/VueTurboH5.git",
      },
    ],
    filter: function (val) {
      return val.toLowerCase();
    },
    default: "a",
  },
];

module.exports = {
  create,
};
