/**
 * 同步任务 -> 清空微任务 —> 宏任务
 * 宏任务是整个事件环的最后一环
 */

export default class ConcurrencyRequest {
  constructor({ maxConcurrencyCount }) {
    this.maxConcurrencyCount = maxConcurrencyCount; // 请求并发数
    this.taskQueue = [];
    this.responses = {
      /**
       * getTest1: {
       *  result: res,
       *  error: err
       * }
       */
    };

    setTimeout(() => {
      console.log("----taskQueue--1-", this.taskQueue);

      this._doRequest();
    });
    console.log("----taskQueue--2-", this.taskQueue);
  }

  push(task) {
    this.taskQueue.push(task);
  }

  _doRequest() {
    if (!this.taskQueue.length) return; // 1

    const minConcurrencyCount = _getMinCount(
      this.maxConcurrencyCount,
      this.taskQueue.length
    );

    // [test1, test2, test3, test4, test5]
    for (let i = 0; i < minConcurrencyCount; i++) {
      const task = this.taskQueue.shift();
      this.maxConcurrencyCount--;
      this._runTask(task);
    }
  }

  _runTask(task) {
    task()
      .then((res) => {
        console.log("---res---", res);
        this.responses[task.name] = {
          result: res,
          error: null,
        };
      })
      .catch((err) => {
        console.log(err);
        this.responses[task.name] = {
          result: null,
          error: err,
        };
      })
      .finally(() => {
        this.maxConcurrencyCount++;
        this._doRequest();
      });
  }
}

function _getMinCount(count1, count2) {
  return Math.min(count1, count2);
}
