const debounce = <T>(fn: (props: T) => any, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args as any);
    }, ms);
  };
};

export default debounce;
