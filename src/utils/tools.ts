export const changeNum = (value: number) => {
  const numStr = value.toString();
  let len = numStr.length;
  let res = '';
  while (len > 3) {
    // if (len % 3) {
    // }
    res = `,${numStr[len - 3]}${numStr[len - 2]}${numStr[len - 1]}${res}`;
    len -= 3;
  }
  for (let i = len; i > 0; i--) {
    res = `${numStr[i - 1]}${res}`;
  }
  return res;
};
