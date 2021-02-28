function calculateStress() {
    let monthEndDate = moment().endOf("month");
    let daliklis = Math.pow(baseNumber, 1/7);

    let tasks = [];
    let score = [];
    for(let i = 1; i <= parseInt(monthEndDate.format("DD")); i++) {
        tasks[i] = 0;
        score[i] = 1; // 1 is default
    }        

    gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': moment().startOf("month").toISOString(),
        'timeMax': moment().endOf("month").add(1, "month").toISOString(),
        'showDeleted': false,
        'maxResults': 2500,
        'singleEvents': true,
        'orderBy': 'startTime'
    }).then(function(response) {
        var events = response.result.items;

        for(let i = 0; i < events.length; i++) {
            // check if event is an assignment
            let summary = events[i].summary.toLowerCase();
            if(!summary.includes("assignment") && !summary.includes("exam")) {
                continue;
            }

            // get event date, increase amount of tasks that day
            var when = events[i].start.dateTime ?? events[i].start.date;
            if(moment(when) <= monthEndDate) {
                tasks[moment(when).format("D")]++; 
            } 

            // go through each day 7 days before assignment, calculate day's score
            let stressPerDay = {};
            for(let delta = 0; delta < 8; delta++) {
                stressPerDay[
                    moment(when).add(-delta, "days").toISOString()
                ] = baseNumber/Math.pow(daliklis, delta) -1;
            }

            // check each of the 7 days if they are in this month, if so, increase day score
            for(const dateBeforeExam in stressPerDay) {
                if(moment(dateBeforeExam) < monthEndDate) {
                    score[
                        moment(dateBeforeExam).format("D")
                    ] += stressPerDay[dateBeforeExam];
                }
            }
        }

        for(let i = 1; i <= parseInt(monthEndDate.format("D")); i++) {
            monthDayInfo.push({
                'date': moment().startOf("month").add(i -1, "days").format("YYYY-MM-DD"),
                'numOfAssignments': tasks[i],
                'score': score[i].toFixed(2)
            });
        }

        loadColors();
    })
}