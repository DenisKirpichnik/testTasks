const isLongerThan1 = (number) => {
  return number.toString().length === 2 ? true : false;
};

const customMonthEmoticonScheme = (monthNumber) => {
  switch (monthNumber) {
    case 1:
      return ':)';
    case 2:
      return ':(';
    case 3:
      return ':-*';
    case 4:
      return '()()';
    case 5:
      return '(°□° )';
    case 6:
      return 'ʕ ᵔᴥᵔ ʔ';
    case 7:
      return ':’-) ';
    case 8:
      return ':-<';
    case 9:
      return '[:]|||[:]';
    case 10:
      return '/:-]';
    case 11:
      return '{(:-)';
    case 12:
      return '<]:-o)';
    default:
      return 'oh well';
  }
};

Date.prototype.format = function (formatScheme, customMonthScheme = false) {
  if (!this) throw new Error('it should be called on a Date obj');
  if (!formatScheme || typeof formatScheme !== 'string')
    throw new Error('format scheme should be provided as a string');
  const date = this;
  let formattedDate = '';

  let dateObj = {
    year: date.getFullYear(),
    monthNumber: date.getMonth() + 1, // zero indexing for getMonth(),adding 1 fixes this
    shortMonth: date.toLocaleString('en-us', { month: 'short' }),
    fullMonth: date.toLocaleString('en-us', { month: 'long' }),
    day: date.getDate(),
    hours24: date.getHours(),
    hours12: Number(date.toLocaleString('en-US', { hour: 'numeric', hour12: true }).split(' ')[0]),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };

  function formatYear(formatScheme, dateObj) {
    let initialScheme = formatScheme;
    const res = initialScheme
      .replace(/yyyy/, dateObj.year)
      .replace(/yy/, dateObj.year.toString().substring(2, 4));
    formattedDate = res;
  }

  function formatMonth(dateObj, customMonthScheme = false) {
    let res;
    if (!customMonthScheme) {
      res = formattedDate
        .replace(
          /(?<!M)MM(?!M)/,
          isLongerThan1(dateObj.monthNumber) ? dateObj.monthNumber : '0' + dateObj.monthNumber
        )
        .replace(/(?<!M)M(?!M)/, dateObj.monthNumber)
        .replace(/MMMM/, dateObj.fullMonth)
        .replace(/MMM/, dateObj.shortMonth);
    }
    if (customMonthScheme) {
      res = formattedDate
        .replace(/(?<!M)MM(?!M)/, customMonthEmoticonScheme(dateObj.monthNumber))
        .replace(/(?<!M)M(?!M)/, customMonthEmoticonScheme(dateObj.monthNumber))
        .replace(/MMMM/, customMonthEmoticonScheme(dateObj.monthNumber))
        .replace(/MMM/, customMonthEmoticonScheme(dateObj.monthNumber));
    }
    formattedDate = res;
  }

  function formatDay(dateObj) {
    const res = formattedDate
      .replace(/dd/, isLongerThan1(dateObj.day) ? dateObj.day : '0' + dateObj.day)
      .replace(/d/g, dateObj.day);
    formattedDate = res;
  }

  function formatHour(dateObj) {
    const res = formattedDate
      .replace(/HH/, isLongerThan1(dateObj.hours24) ? dateObj.hours24 : '0' + dateObj.hours24)
      .replace(/H/, dateObj.hours24)
      .replace(/hh/, isLongerThan1(dateObj.hours12) ? dateObj.hours12 : '0' + dateObj.hours12)
      .replace(/h/g, dateObj.hours12);
    formattedDate = res;
  }

  function formatMinutes(dateObj) {
    const res = formattedDate
      .replace(/mm/, isLongerThan1(dateObj.minutes) ? dateObj.minutes : '0' + dateObj.minutes)
      .replace(/m/g, dateObj.minutes);
    formattedDate = res;
  }

  function formatSeconds(dateObj) {
    const res = formattedDate
      .replace(/ss/, isLongerThan1(dateObj.seconds) ? dateObj.seconds : '0' + dateObj.seconds)
      .replace(/s/g, dateObj.seconds);
    formattedDate = res;
  }

  formatYear(formatScheme, dateObj);
  formatDay(dateObj);
  formatHour(dateObj);
  formatMinutes(dateObj);
  formatSeconds(dateObj);
  formatMonth(dateObj, customMonthScheme);

  return formattedDate;
};

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(yyyy_MM_dd HH_mm_ss); Output ---',
  new Date(2015, 2, 4, 5, 7, 8).format('yyyy_MM_dd HH_mm_ss')
);

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(MMMM yy, d H:m); Output ---',
  new Date(2015, 2, 4, 5, 7, 8).format('MMMM yy, d H:m')
);

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(Why am I writing some text here??); Output ---',
  new Date(2015, 2, 4, 5, 7, 8).format('Why am I writing some text here??')
);

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(d-MMM-yy); Output ---',
  new Date(2015, 2, 4, 5, 7, 8).format('d-MMM-yy')
);

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(ddMMyyyyTHHmmssZ); Output ---',
  new Date(2015, 2, 4, 5, 7, 8).format('ddMMyyyyTHHmmssZ')
);

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(HH hh M MM MMM MMMM m mm); Output ---',
  new Date(2015, 2, 4, 23, 7, 8).format('HH hh M MM MMM MMMM m mm')
);

console.log(
  'new Date(2015, 2, 4, 5, 7, 8).format(HH hh M MM MMM MMMM m mm); Output ---',
  new Date(2015, 2, 4, 23, 7, 8).format('HH hh M MM MMM MMMM m mm', (customMonthScheme = true))
);
