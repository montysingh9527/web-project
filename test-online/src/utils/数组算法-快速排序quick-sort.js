/**
 * i 从左向右开始移动   j 从左向右移动
 * 小于基准元素-停止移动 大于基准数-停止移动
 * 交换 i 和 j 的元素
 * j 从右向左移动   i 从左向右开始移动
 * 小于基准数 - 停止移动
 * i 和 j 相遇，停止移动
 * 交换相遇位置的元素和基准元素
 * 基准元素的左边都是小于基准元素
 * 基准元素的右边都是大于基准元素
 * 先排原基准元素的左边，再排原基准元素的右边， j从右向左移动
 * i 从左到右移动  j元素小于基准元素-停止移动
 * i 和 j相遇，停止移动
 * 交换相遇位置的元素和基准元素
 * j 从右向左移动
 * i 从左向右移动
 * j 元素小于基准元素-停止移动
 * 大于基准元素 - 停止元素
 * 交换 i 和 j的元素
 * j 从右向左移动
 * i 和 j相遇，停止移动
 * 交换相遇位置的元素和基准元素
 */

const arr = [3, 5, 2, 1, 6, 4];

quickSort(arr, 0, arr.length - 1);
console.log("-----------", arr); // [ 1, 2, 3, 4, 5, 6 ]

function quickSort(arr, left, right) {
  if (left > right) return;

  let base = arr[left],
    i = left,
    j = right;
  // i和j没相遇的情况
  while (i !== j) {
    // j从右向左移动
    while (arr[j] >= base && i < j) {
      j--;
    }

    // j 停止
    // j 从右向左移动
    while (arr[i] <= base && i < j) {
      i++;
    }

    // i 和 j 都停止
    // 两个值交换位置
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }

  // i 和 j相遇
  arr[left] = arr[i];
  arr[i] = base;

  quickSort(arr, left, i - 1);
  quickSort(arr, i + 1, arr.length - 1);
}
