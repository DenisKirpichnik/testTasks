// Checks the number of arguments passed
const checkArgsNumber = (argsNumber) => {
  if (argsNumber > 1) throw new Error('arguments overload, only one argument is allowed');
};

// Checks if some of the arguments were strings
const validateValuesInTheArray = (arr) => {
  return arr.every((num) => typeof num === 'number');
};

function chainSum(firstNum) {
  checkArgsNumber(arguments.length);
  let result = [firstNum];

  function add(anotherNum) {
    checkArgsNumber(arguments.length);
    if (anotherNum === undefined && validateValuesInTheArray(result)) {
      result = result.reduce((acc, num) => acc + num, 0);
    } else if (anotherNum === undefined && !validateValuesInTheArray(result)) {
      result = NaN;
    } else {
      result.push(anotherNum);
    }
    return typeof anotherNum === 'undefined' ? result : add;
  }

  return typeof firstNum === 'undefined' ? 0 : add;
}

console.log('input - chainSum(1)(2)(3)(4)(); output-', chainSum(1)(2)(3)(4)());
console.log('input - chainSum(1)(2)(“a”)(4)(); output-', chainSum(1)(2)('a')(4)());
console.log('input - chainSum(1)(2)(“3”)(4)(); output-', chainSum(1)(2)('3')(4)());
console.log('input - chainSum(5)(10)(15)(20)(); output-', chainSum(5)(10)(15)(20)());
console.log('input - chainSum(); output-', chainSum());
