const db = require('../db.js')
const fs = require('fs')

jest.mock('fs')

describe('can read', () => {
  // expect(db.read instanceof Function).toBe(true) 
  it('can read', async () => {
    const data = [{
      title: 'hi',
      done: false
    }]
    fs.setMock('/xxx', null, JSON.stringify(data))
    // expect(fs.x()).toBe('hi')

    const list = await db.read('/xxx')
    // 对比两个对象是否相等
    expect(list).toStrictEqual(data)
  })
  it('can write', async () => {
    let fakeFile
    fs.setWriteFileMock('/xxx', (path, data) => {
      fakeFile = data
    })
    // expect(fs.x()).toBe('hi')

    const list = [{
      title: 'hi',
      done: false
    }]
    await db.write.toBe(JSON.stringify(list))
    // 对比两个对象是否相等
    expect(fakeFile).toBe(JSON.stringify(list))
  })
})