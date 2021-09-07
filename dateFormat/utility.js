export const isLongerThan1 = (number) => {
  return number.toString().length === 2 ? true : false;
};

export const customMonthEmoticonScheme = (monthNumber) => {
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

export const customMonthSchemeMethods = {
  M: function (date) {
    return customMonthEmoticonScheme(date.getMonth() + 1);
  },
  MM: function (date) {
    return customMonthEmoticonScheme(date.getMonth() + 1);
  },
  MMM: function (date) {
    return customMonthEmoticonScheme(date.getMonth() + 1);
  },
  MMMM: function (date) {
    return customMonthEmoticonScheme(date.getMonth() + 1);
  },
};
