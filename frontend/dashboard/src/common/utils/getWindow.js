export function isWindow(obj) {
  return obj !== null && obj !== undefined && obj === obj.window;
}

export const getScroll = (target, top) => {
  if (typeof window === "undefined") {
    return 0;
  }
  const method = top ? "scrollTop" : "scrollLeft";
  let result = 0;
  if (isWindow(target)) {
    result = target[top ? "pageYOffset" : "pageXOffset"];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = target[method];
  }
  if (target && !isWindow(target) && typeof result !== "number") {
    result = (target.ownerDocument || target).documentElement?.[method];
  }
  return result;
};
