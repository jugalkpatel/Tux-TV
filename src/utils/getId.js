const getId = (() => {
  let id = Date.now();
  return () => {
    id += 1;
    return id;
  };
})();

export default getId;
