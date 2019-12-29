//get home directory 获取home目录文件夹


const homedir = require('os').homedir()
const home = process.env.HOME || homedir
const fs = require('fs')

const p = require('path')
const dbPath = p.join(home, '.todo')

const db = {
  read(path = dbPath) {
    // Promise 异步操作里面不能return
    return new Promise((resolve, reject) => {
      fs.readFile(path, {
        flag: 'a+'
      }, (error, data) => {
        if (error) {
          return reject(error)
        }

        let list
        try {
          list = JSON.parse(data.toString())
          console.log(list)
        } catch (error) {
          list = []
        }
        //不能是return list
        //这样外面调用这个函数的时候还是拿不到return的值，
        //因为return出来的是readFIle的回调函数
        resolve(list)

      })
    })

  },
  write(list, path = dbPath) {
    return new Promise((resolve, reject) => {
      const string = JSON.stringify(list)
      fs.writeFile(path, string, err => {
        if (err) {
          return reject(err)
        }
        resolve()

      })
    })

  },
}

module.exports = db