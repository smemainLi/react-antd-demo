export const px2vw = (pixels: number, pixelTotal = 1920) => {
  const vwVal = (pixels / pixelTotal) * 100;
  return `${vwVal}vw`;
};
