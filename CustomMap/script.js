Array.prototype.customMap = function (callback) {
  if (!callback || typeof callback !== 'function') {
    throw new Error('The callback is not a function');
  }
  if (!this) {
    throw new Error('Cannot call map on null or undefined');
  }

  let resArray = [];
  for (let i = 0; i < this.length; i++) {
    const changedValue = callback(this[i], i, this);
    resArray.push(changedValue);
  }
  return resArray;
};

console.log(
  '[1,2,3,4,5].customMap(function(x){return ++x;}) output-',
  [1, 2, 3, 4, 5].customMap((x) => ++x)
);

console.log(
  ' [1, 2, 3, 4, 5].customMap((el) => el * 5) output-',
  [1, 2, 3, 4, 5].customMap((el) => el * 5)
);
