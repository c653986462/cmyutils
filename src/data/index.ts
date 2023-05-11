
/**
 * 深拷贝
 * @param {any} obj 待拷贝对象
 * @returns {any}
 * @version 1.0
 */
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone) as unknown as T;
  }

  const cloned: Partial<T> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      cloned[key as keyof T] = deepClone(obj[key]) as T[keyof T];
    }
  }

  return cloned as T;
}