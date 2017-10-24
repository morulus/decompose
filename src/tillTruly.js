export default function tillTruly(...fns) {
  return function tillTrulyChain(...args) {
    let result;
    for (let i = 0; i < fns.length; i++) {
      result = fns[i].apply(this, args);
      if (result) {
        break;
      }
    }
    return result;
  };
}
