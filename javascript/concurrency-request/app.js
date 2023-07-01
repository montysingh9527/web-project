/**
 * 测试
 * 1、很多请求要一起做
 * 2、限制并发数，可配置
 */

/**
 * 异步和多线程
 * 两个任务 -> 跑在两个线程
 */

async function test() {
    console.log(1);
  
    return 2;
  }
  
  async function test2() {
    console.log(11);
    return 22;
  }
  
  test().then((res) => {
    console.log("---res---1---", res);
  });
  
  test2().then((res) => {
    console.log("---res---2---", res);
  });
  
  console.log(3);
  
  // 1
  // 11
  // 3
  // ---res---1--- 2
  // ---res---2--- 22
  
  