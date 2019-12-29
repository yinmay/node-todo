const program = require('commander');
const api = require('./index.js')

program
  .option('-d, --debug', 'output extra debugging')

//add 子命令
program
  .command('add')
  .description('add a task')
  .action((...args) => {
    const words = args.slice(0, -1).join(' ')
    // console.log(words);
    api.add(words).then(() => console.log('添加成功'), () => {
      console.log('添加失败')
    })
  });

//clear 子命令
program
  .command('clear')
  .description('clear all tasks')
  .action((...args) => {
    api.clear().then(() => console.log('清除成功'), () => {
      console.log('清除失败')
    })
  });

program.parse(process.argv);

if (process.argv.length === 2) {
  //说明用户直接运行cli.js
  void api.showAll() // void 强制消除

}

// console.log(process.argv)