
function loadColors() {
    let array = document.getElementsByClassName("calendar__day");

    let today = new Date();
    let monthDays = moment(today).daysInMonth();
    let weekDay = moment(today).day();
    let thisDay = moment(today).date();
    let startWeekDay = moment(today).subtract(thisDay, 'days').day();
    let thisMonth = moment(today).month();

    for (let index = 0; index < startWeekDay; index++) {
      const element = array[index];
      element.innerHTML = "";
    }

    let dayOfMonth = 1;
    for (let index = startWeekDay; index < startWeekDay + monthDays; index++) {
      const element = array[index];
      element.innerHTML = dayOfMonth;
      dayOfMonth++;
    }
    for (let index = startWeekDay + monthDays; index < array.length; index++) {
      const element = array[index];
      element.innerHTML = "";
    }

    for (let index = 0; index < monthDayInfo.length; index++) {
      const element = monthDayInfo[index];
      if (moment(element.date).month() == thisMonth) {
        let day = moment(element.date).date();
        let transparentValue = 110 - element.score / 40 * 100;
        
        array[startWeekDay + day - 1].style.background = "repeating-linear-gradient(45deg, rgba(255 0 0 / 50%), rgba(255 0 0 / 50%) 12px, #f2f2f2 12px, #f2f2f2 " + transparentValue + "px)";

      }
    }
}

function loadMonthDays() {
  let array = document.getElementsByClassName("calendar__day");
      
  let today = new Date();
  let monthDays = moment(today).daysInMonth();
  let weekDay = moment(today).day();
  let thisDay = moment(today).date();
  let startWeekDay = moment(today).subtract(thisDay, 'days').day();

  for (let index = 0; index < startWeekDay; index++) {
    const element = array[index];
    element.innerHTML = "";
  }
  
  let dayOfMonth = 1;
  for (let index = startWeekDay; index < startWeekDay + monthDays; index++) {
    const element = array[index];
    element.innerHTML = dayOfMonth;
    dayOfMonth++;
  }
  for (let index = startWeekDay + monthDays; index < array.length; index++) {
    const element = array[index];
    element.innerHTML = "";
  }
}