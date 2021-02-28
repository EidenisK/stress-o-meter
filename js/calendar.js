let today = moment().startOf("month");
console.log(today);
function loadColors() {
  document.querySelector(".current-month").innerHTML = today.format('MMMM YYYY');

  console.log("at load colors");
  console.log(today);

    let array = document.getElementsByClassName("calendar__day");
    let monthDays = today.daysInMonth();
    let startWeekDay = today.startOf("month").day();
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
    console.log("After load colors");
    console.log(today);
}
document.querySelector('.next').addEventListener('click', () => {
  console.log("next");
  today = today.add(1, "month");
  calculateStress();
});
document.querySelector('.previous').addEventListener('click', () => {
  console.log("prev");
  today = today.subtract(1, "month");
  calculateStress();
});