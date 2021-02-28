# WarwickTECH hackathon (27 Feb 2021)

<img src="https://en.ktu.edu/wp-content/uploads/sites/5/2016/08/KTU-EN.svg" height="100" />
<img src="https://studentams.ktu.edu/wp-content/uploads/sites/54/2016/09/Gifted-300x141.png" height="100" />

## Team: 

| Member: | Discord username: | Programing skill level: |
| :------------------------- |:---------------------:| :---------------------------:|
| 🎓 Monika Bačkieriūtė     | Moni#1280 | Beginner |
| 🎓 Eidenis Kasperavičius  | Dusulys#2638 | Advanced |
| 🎓 Simonas Riauka         | ANANAS#6800 | Beginner |
| 🎓 Gintaras Stankevičius  | GSdcdc3117#8300 | Beginner |

## The Project  

<img src="https://raw.githubusercontent.com/EidenisK/warwick-hackathon/master/img/logo.png" height="100" />
<img src="https://raw.githubusercontent.com/EidenisK/warwick-hackathon/master/img/ExtendedLogo.png" height="100" />  

"Stress-O-Meter" is a student's best friend or his worst nightmare. By filling a short quiz and giving your timetable to "Stress-O-Meter", the predictions of your emotional level are visualized on a calendar. At various days of the month the stress level might differ. If the day is a weekend or just does not have any assignments to do, then snowy white will catch your eye. If there is a long, hard working day or an exam, then probably that day is blazing red. But that is not the end of "Stress-O-Meter's" capabilities:  
* Obviously, "Stress-O-Meter" provides a calendar that is painted accordingly to your busyness and emotional health: the more red there is, the more stress will be felt that day  
* "Stress-O-Meter" gives advices how to cope with stress and even reduce it  
* "Stress-O-Meter" has a chating function, so that the stressed ones can seek moral support and those, who are slacking off, provided that  
* "Stress-O-Meter" for user's interests can show stress prevalence on the map, so the loneliness is thrown out of the window. Or not...  

# USER INSTRUCTIONS

* Since Google APIs do not allow the project to be run locally, the only way to use it currently is through https://eidenisk.github.io/stress-o-meter/ .
* Before using the web app, you must login with Google. In Google Firebase we only collect the result of the last filled questionnaire and the date when it was filled out. Additionally, the successfull execution of our algorithms depend on events with "assignment" or "exam" in their name being found on user's main Google calendar.
* After logging in, the user can see the calendar for the current month. Above it, there are arrows for changing the shown month.
* To get more accurate results, the user is encouraged to fill out the questionnaire (accessible on the sidebar) - answer 10 questions about their stress levels. After clicking "Complete", the calculated score is saved in the database and accessed from there at next page load.
* On the sidebar there are also helpful tips for maintaining one's mental health, selected randomly.
* Lastly, there are "Stress map" and "Chat" buttons that illustrate some of our possible features.

# FUTURE ROADMAP

* Add the chatroom
* Add country statistics
* Improve mobile optimization
