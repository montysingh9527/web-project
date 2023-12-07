export const cmn = (m, n) => {
  // cmn = m!/(n!)(m-n)!
  if (n > m) return 0;
  n = Math.min(n, m - n);
  let t1 = 1;
  let t2 = 1;
  for (let i = 1; i <= n; i++) {
    t1 *= (m - i + 1);
    t2 *= i;
  }
  return t1 / t2;
}

export const directmNote = (selected = [], numcnt = 0) => {
  function dfs(arr, idx, set) {
    if (idx >= arr.length) return 1;
    let cnt = 0;
    for (let i = 0; i < arr[idx].length; i++) {
      const num = arr[idx][i];
      if (!set.has(num)) {
        set.add(num);
        cnt += dfs(arr, idx + 1, set);
        set.delete(num);
      }
    }
    return cnt;
  }
  if (selected.length < numcnt) return 0;
  return dfs(selected, 0, new Set());
}
