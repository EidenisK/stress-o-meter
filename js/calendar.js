const today = moment();
console.log(today);
function loadColors() {
  document.querySelector(".current-month").innerHTML = today.format('MMMM YYYY');

    let array = document.getElementsByClassName("calendar__day");
    let monthDays = today.daysInMonth();
    let weekDay = today.day();
    let thisDay = today.date();
    let startWeekDay = today.subtract(thisDay, 'days').day();
    let thisMonth = today.month();

    for (let index = 0; index < startWeekDay; index++) {
      const element = array[index];
      element.style.background = null;
      element.innerHTML = "";
    }

    let dayOfMonth = 1;
    for (let index = startWeekDay; index < startWeekDay + monthDays; index++) {
      const element = array[index];
      element.style.background = null;
      element.innerHTML = dayOfMonth;
      dayOfMonth++;
    }
    for (let index = startWeekDay + monthDays; index < array.length; index++) {
      const element = array[index];
      element.style.background = null;
      element.innerHTML = "";
    }

    for (let index = 0; index < monthDayInfo.length; index++) {
      const element = monthDayInfo[index];
      if (moment(element.date).month() == thisMonth && moment(element.date).year() == today.year()) {
        let day = moment(element.date).date();
        let transparentValue = 110 - element.score / 40 * 100;
       
        array[startWeekDay + day - 1].style.background = "repeating-linear-gradient(45deg, rgba(255 0 0 / 50%), rgba(255 0 0 / 50%) 12px, #f2f2f2 12px, #f2f2f2 " + transparentValue + "px)";
      }
    }
}
document.querySelector('.next').addEventListener('click', () => {
  today.setMonth(today.getMonth() + 1);
  calculateStress();
});
document.querySelector('.previous').addEventListener('click', () => {
  today.setMonth(today.getMonth() - 1);
  calculateStress();
});