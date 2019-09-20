/**
 * 省级行政区简写
 */
export const provincialLevelAbbr = (list: any) => {
  const test = list.map((item: any, index: number) => {
    if (item.properties.name.includes('黑龙江') || item.properties.name.includes('内蒙古')) {
      return {
        ...item,
        properties: {
          ...item.properties,
          name: item.properties.name.substring(0, 3)
        }
      };
    } else {
      return {
        ...item,
        properties: {
          ...item.properties,
          name: item.properties.name.substring(0, 2)
        }
      };
    }
  });
  return test;
};
