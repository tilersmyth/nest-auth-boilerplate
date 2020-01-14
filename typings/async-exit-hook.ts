declare module 'async-exit-hook' {
  function add(hook: (cb: any) => void): void;
  export = add;
}
