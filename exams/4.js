const assert = require('assert');

/**
 * --- 问题描述 ---
 *
 * 实现一个 arrange 函数，可以进行时间和工作调度
 *
 * --- 说明 ---
 *
 * - 本题需要自己实现测试用例
 * - 具体功能参考下列示例
 * - 在示例中调用到的方法都需要实现
 * - 下面示例中 `>` 表示在控制台中输出 (console.log)
 *
 * --- 示例 ---
 *
 * 示例一:
 * `arrange('William').execute();`
 * > William is notified
 *
 * 示例二:
 * `arrange('William').wait(5).do('commit').execute();`
 * > William is notified
 * 等待 5s...
 * > Start to commit
 *
 * 示例三:
 * `arrange('William').waitFirst(3).do('push').execute();`
 * 等待 3s...
 * > William is notified
 * > Start to push
 *
 */

class Task {
  constructor(name) {
    this.list = [`> ${name} is notified`];
    this.isWait = false;
    setTimeout(() => {
      !this.isWait && this.printTask(this.list);
    }, 0);
  }
  printTask(list) {
    list.forEach(item => {
      console.log(item);
    });
  }
  execute() {
    this.printTask(this.list);
  }
  wait(time) {
    this.isWait = true;
    this.list.push(`等待 ${time}s...`);
    setTimeout(() => {
      this.printTask(this.list);
    }, time);
    return this;
  }
  waitFirst(time) {
    this.isWait = true;
    setTimeout(() => {
      this.list.push(`等待 ${time}s...`);
      this.printTask(this.list.reverse());
    }, time);
    return this;
  }
  do(event) {
    this.list.push(`> Start to ${event}`);
  }
}

function arrange() {
  const task = new Task(name);
  return task;
}

/*******测试部分*******/
module.exports = function doTest() {
  try {
    assert.strictEqual(
      arrange('William').execute(),
      'William is notified'
    );
    assert.strictEqual(
      arrange('William').wait(5).do('commit').execute(),
      'William is notified'
    );
    assert.strictEqual(
      arrange('William').waitFirst(3).do('push').execute(),
      'William is notified'
    );
    return '通过';
  } catch (err) {
    return '不通过';
  }
};
