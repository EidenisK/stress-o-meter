function loadColors() {
  document.querySelector(".current-month").innerHTML = today.format('MMMM YYYY');

    let array = document.getElementsByClassName("calendar__day");
    let monthDays = today.daysInMonth();
    let startWeekDay = today.startOf("month").day() -1;
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
       
        let widthValue = 5;
        let gapValue = 1000 - element.score/40 * 990;

        array[startWeekDay + day - 1].style.background = `repeating-linear-gradient(45deg, rgba(255 0 0 / 50%), rgba(255 0 0 / 50%) ${widthValue}px, #f2f2f2 ${widthValue}px, #f2f2f2 " + ${gapValue} + "px)`;
      }
    }
}
document.querySelector('.next').addEventListener('click', () => {
  today = today.add(1, "month");
  calculateStress();
});
document.querySelector('.previous').addEventListener('click', () => {
  today = today.subtract(1, "month");
  calculateStress();
});