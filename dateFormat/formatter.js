import { isLongerThan1 } from './utility.js';

export const APP = (function () {
  const valueWithTwoDigits = function (value) {
    return isLongerThan1(value) ? value : '0' + value;
  };
  const regEXP = /yyyy|yy|dd|d|HH|H|hh|h|mm|m|ss|s|MMMM|MMM|MM|M/g;
  return {
    regEXP: regEXP,
    valueWithTwoDigits: valueWithTwoDigits,
  };
})();
