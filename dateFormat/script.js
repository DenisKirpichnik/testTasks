import { APP } from './formatter.js';
import { customMonthSchemeMethods } from './utility.js';

Date.prototype.format = function (formatScheme, customMonthScheme = false) {
  if (!this) throw new Error('it should be called on a Date obj');
  if (!formatScheme || typeof formatScheme !== 'string')
    throw new Error('format scheme should be provided as a string');

  const date = this;
  let formattedDate = '';

  const functionsObj = {
    yy: function () {
      return date.getFullYear().toString().substring(2, 4);
    },
    yyyy: function () {
      return date.getFullYear();
    },
    M: function () {
      return date.getMonth() + 1;
    },
    MM: function () {
      return APP.valueWithTwoDigits(date.getMonth() + 1);
    },
    MMM: function () {
      return date.toLocaleString('en-us', { month: 'short' });
    },
    MMMM: function () {
      return date.toLocaleString('en-us', { month: 'long' });
    },
    d: function () {
      return date.getDate();
    },
    dd: function () {
      return APP.valueWithTwoDigits(date.getDate());
    },
    H: function () {
      return date.getHours();
    },
    HH: function () {
      return APP.valueWithTwoDigits(date.getHours());
    },
    h: function () {
      return Number(date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[0]);
    },
    hh: function () {
      return APP.valueWithTwoDigits(
        Number(date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[0])
      );
    },
    m: function () {
      return date.getMinutes();
    },
    mm: function () {
      return APP.valueWithTwoDigits(date.getMinutes());
    },
    s: function () {
      return date.getSeconds();
    },
    ss: function () {
      return APP.valueWithTwoDigits(date.getSeconds());
    },
  };

  customMonthScheme === true ? Object.assign(functionsObj, customMonthSchemeMethods) : null;

  formattedDate = formatScheme.replace(APP.regEXP, function (match) {
    return functionsObj[match](date);
  });
  return formattedDate;
};

console.log(new Date(2015, 2, 4, 5, 7, 8).format('yyyy_MM_dd HH_mm_ss')); //2015_03_04 05_07_08
console.log(new Date(2015, 2, 4, 5, 7, 8).format('MMMM yy, d H:m')); //2015_03_04 05_07_08
console.log(new Date(2015, 2, 4, 5, 7, 8).format('Why am I writing some text here??')); //W5y a7 I writing 8o7e text 5ere??
console.log(new Date(2015, 2, 4, 5, 7, 8).format('d-MMM-yy')); //4-Mar-15
console.log(new Date(2015, 2, 4, 5, 7, 8).format('ddMMyyyyTHHmmssZ')); //04032015T050708Z
console.log(new Date(2015, 2, 4, 23, 7, 8).format('HH hh M MM MMM MMMM m mm')); //23 11 3 03 Mar March 7 07
console.log(new Date(2015, 2, 4, 5, 7, 8).format('yyyy_MM_dd HH_mm_ss', true)); //2015_:-*_04 05_07_08
