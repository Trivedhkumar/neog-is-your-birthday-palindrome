const input = document.getElementById("input-box");
const checkBtn = document.getElementById("check");
const output = document.getElementById("message");

const reverseStr = (str) => str.split("").reverse().join("");
const isPalindrome = (str) => str === reverseStr(str);
const convertDatetoStr = (date) => {
  let dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day += "0";
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month += "0";
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
};
const getAllDateFormats = (date) => {
  let dates = [];
  const dateArr = date.split("-");
  const dateObj = {
    year: dateArr[0],
    month: dateArr[1],
    day: dateArr[2],
  };
  const year = dateObj.year[2] + dateObj.year[3];
  dates.push(dateObj.year + dateObj.month + dateObj.day);
  dates.push(dateObj.day + dateObj.month + dateObj.year);
  dates.push(dateObj.month + dateObj.day + dateObj.year);
  dates.push(dateObj.day + dateObj.month + year);
  dates.push(dateObj.month + dateObj.day + year);
  dates.push(year + dateObj.month + dateObj.day);

  return dates;
};
const checkPalindromeForAllDateFormats = (date) => {
  const listOfPalindromes = getAllDateFormats(date);
  let flag = false;
  for (let i = 0; i < listOfPalindromes.length; i++) {
    if (isPalindrome(listOfPalindromes[i])) {
      flag = true;
      break;
    }
  }
  return flag;
};

const isLeapYear = (year) => {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
};
const getNextDate = (date) => {
  var temp = date.split("-");
  var day = parseInt(temp[2]) + 1;
  var month = parseInt(temp[1]);
  var year = parseInt(temp[0]);
  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  let str = `${year}-${month}-${day}`;
  return str;
};
const checkPalindromeForAllDates = (dates) => {
  for (let i = 0; i < dates.length; i++) {
    if (isPalindrome(dates[i])) {
      return true;
    }
  }
  return false;
};
const checkPalindromeStatus = () => {
  let date = input.value;
  let dates = getAllDateFormats(date);
  let flag = checkPalindromeForAllDates(dates);
  if (flag) {
    output.innerText = "😃 Yup! your birthday is palindrome";
  } else {
    let counter = 0;
    while (true) {
      counter++;
      let nextDate = getNextDate(date);
      let dateArr = nextDate.split("-");
      dates = getAllDateFormats(nextDate);
      flag = checkPalindromeForAllDates(dates);
      if (flag) {
        output.innerText = `The next palindrome day is ${dateArr[2]}/${dateArr[1]}/${dateArr[0]} you missed it by ${counter} days`;
        break;
      }
      date = nextDate;
    }
  }
};

const check = () => {
  let date = input.value;
  if (!date) {
    output.innerText = "Please enter valid date";
  } else {
    checkPalindromeStatus();
  }
};
checkBtn.addEventListener("click", check);
