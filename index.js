const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
  // 读取之前的任务
  const list = await db.read()

  //添加一个任务
  list.push({
    title,
    done: false
  })
  //存储到文件
  await db.write(list)
  console.log(list)
}

module.exports.clear = async (title) => {
  //写一个空数组
  await db.write([])
}

module.exports.showAll = async (title) => {
  //写一个空数组
  // await db.write([])
  console.log('show all')
  //读取之前的任务
  const list = await db.read()
  //打印之前的任务
  // list.forEach((task, index) => console.log(task.done ? '[X]' : '[_]', index + 1, '-', task.title))
  //printTasks
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [{
        name: '退出',
        value: '-1'
      }, ...list.map((task, index) => {
        return {
          name: `${task.done ? '[X]' : '[_]'} ${index + 1} '-' ${task.title}`,
          value: index
        }
      }), {
        name: '创建任务',
        value: '-2'
      }]
    })
    .then(answers => {
      const index = parseInt(answers.index)
      // console.log(JSON.stringify(answers.index));
      if (answers.index >= 0) {
        //选中一个任务
        //askForAction
        inquirer
          .prompt({
            type: 'list',
            name: 'action',
            message: '请选择操作',
            choices: [{
              name: '退出',
              value: 'quit'
            }, {
              name: '已完成',
              value: 'markAsDone'
            }, {
              name: '未完成',
              value: 'markAsUndone'
            }, {
              name: '改标题',
              value: 'updateTitle'
            }, {
              name: '删除',
              value: 'remove'
            }]
          }).then(answer2 => {
            console.log(list, answer2)

            switch (answer2.action) {
              case 'markAsDone':
                list[index].done = true
                db.write(list)
                break;

              case 'markAsUndone':
                list[index].done = false
                db.write(list)
                break;

              case 'updateTitle':
                inquirer.prompt({
                  type: 'input',
                  name: 'title',
                  message: "新的标题",
                  default: list[index].title
                }, ).then(answers => {
                  list[index].title = answers.title
                  db.write(list)
                });
                break;

              case 'remove':
                list.splice(index, 1)
                db.write(list)
                break;
            }
          })
      } else if (answers.index === '-2') {
        console.log(list)
        //创建任务
        inquirer.prompt({
          type: 'input',
          name: 'title',
          message: "输入任务的标题",
        }).then(answer3 => {
          list.push({
            title: answer3.title,
            done: false
          })
          db.write(list)
        });
      }
    });
}