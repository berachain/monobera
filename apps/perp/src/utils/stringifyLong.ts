import Long from "long";

const stringifyLong = (obj: any): any => {
  if (obj instanceof Long) {
    return obj.toString();
  }

  if (typeof obj === "object" && obj !== null) {
    const newObj: any = Array.isArray(obj) ? [] : {};
    for (const key in obj) {
      newObj[key] = stringifyLong(obj[key]);
    }
    return newObj;
  }

  return obj;
};

export default stringifyLong;
