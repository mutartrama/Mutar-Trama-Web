export const debounce = (
  // eslint-disable-next-line
  func: Function,
  wait: number,
) => {
  let timeout: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
