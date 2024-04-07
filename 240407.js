//最长递增子序列
function getSequence(arr) {
  //1. 遍历，比前一个数大的放到后面
  //2. 比前一个数小的，用二分法查找第一个比自己大的数，替换
  //3. 用数组p记录前一个数的索引 最后还原索引
  const resultIndex = [0];
  const p = new Array(arr.length);
  for (let i = 1; i < arr.length; i++) {
    let lastIndex = resultIndex[resultIndex.length - 1];
    if (arr[i] > arr[lastIndex]) {
      p[i] = lastIndex;
      resultIndex.push(i);
      continue;
    }
    let start = 0;
    let end = resultIndex.length - 1;
    while (start < end) {
      let middle = Math.floor((start + end) / 2);
      if (arr[i] > arr[resultIndex[middle]]) {
        start = middle + 1;
      } else {
        end = middle;
      }
    }
    p[i] = p[resultIndex[start]];
    resultIndex[start] = i;
  }
  let i = resultIndex.length - 1;
  let last = p[resultIndex[i]];
  while (i-- > 0) {
    resultIndex[i] = last;
    last = p[resultIndex[i]];
  }
  return resultIndex;
}
console.log(getSequence([2, 8, 4, 5, 9, 10, 6]));
