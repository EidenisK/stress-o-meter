function loadColors() {
  document.querySelector(".current-month").innerHTML = today.format('MMMM YYYY');

    let array = document.getElementsByClassName("calendar__day");
    let monthDays = today.daysInMonth();
    let startWeekDay = today.startOf("month").day() -1;
    let thisMonth = today.month();

    let rows = document.getElementsByClassName("calendar__week");
    let rowCount = 0;

    for (let index = 0; index < rows.length; index++) {
      const element = rows[index];
      element.classList.remove('active_row');
      element.classList.remove('bottom_line');
    }

    for (let index = 0; index < startWeekDay; index++) {
      const element = array[index];
      element.style.background = null;
      element.innerHTML = "";
      rows[rowCount].classList.add('active_row');
      if (index % 7 == 0) {
        rows[rowCount].classList.add('active_row');
        rowCount++;
      }
    }

    let dayOfMonth = 1;
    for (let index = startWeekDay; index < startWeekDay + monthDays; index++) {
      const element = array[index];
      element.style.background = null;
      element.innerHTML = dayOfMonth;
      dayOfMonth++;
      if (index % 7 == 0) {
        rows[rowCount].classList.add('active_row');
        rowCount++;
      }
    }
    rows[rowCount - 1].classList.add('bottom_line');

    for (let index = 0; index < startWeekDay; index++) {
      const element = array[index];
      element.style.background = null;
      element.innerHTML = "";
    }

    for (let index = 0; index < monthDayInfo.length; index++) {
      const element = monthDayInfo[index];
      if (moment(element.date).month() == thisMonth && moment(element.date).year() == today.year()) {
        let day = moment(element.date).date();
       
        if(element.numOfAssignments != 0) {
          let div = document.createElement('div');
          div.innerHTML = element.numOfAssignments + " assignment(s)";
          div.style.display = 'flex';
          div.style.justifyContent = 'flex-end';
          div.style.alignContent = 'center';
          div.style.flexDirection = 'column';
          div.style.height = '100%';
          div.style.paddingBottom = '16px';
          div.style.boxSizing = 'border-box';
          array[startWeekDay + day - 1].appendChild(div);
        }

        let val = element.score/40 * 1;
        array[startWeekDay + day - 1].style.background = 'rgba(255, 255, 255, 0.5)';


        /*array[startWeekDay + day - 1].style.backgroundColor = `#rgba(255, 0, 0, ${val});`;
        array[startWeekDay + day - 1].style.backgroundImage = `linear-gradient(to right, transparent 50%, rgba(255, 255, 255, 0.8) 50%), linear-gradient(to bottom, transparent 50%, rgba(255, 255, 255, 0.8) 50%);`
        array[startWeekDay + day - 1].style.backgroundSize = `5px 5px;`;*/

        //array[startWeekDay + day - 1].style.background = `repeating-linear-gradient(45deg, rgba(255 0 0 / 50%), rgba(255 0 0 / 50%) ${widthValue}px, #f2f2f2 ${widthValue}px, #f2f2f2 ${gapValue}px)`;
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