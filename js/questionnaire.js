function QuestionaireDone() {
    a1 = parseInt(document.querySelector('input[name="q1"]:checked').value);
    a2 = parseInt(document.querySelector('input[name="q2"]:checked').value);
    a3 = parseInt(document.querySelector('input[name="q3"]:checked').value);
    a4 = parseInt(document.querySelector('input[name="q4"]:checked').value);
    a5 = parseInt(document.querySelector('input[name="q5"]:checked').value);
    a6 = parseInt(document.querySelector('input[name="q6"]:checked').value);
    a7 = parseInt(document.querySelector('input[name="q7"]:checked').value);
    a8 = parseInt(document.querySelector('input[name="q8"]:checked').value);
    a9 = parseInt(document.querySelector('input[name="q9"]:checked').value);
    a10 = parseInt(document.querySelector('input[name="q10"]:checked').value);

    ats = a1 + a2 + a3 + a6 + a9 + a10 - a4 - a5 - a7 - a8 + 14;
    
    setBaseNumber(ats/10);

    document.getElementById("qstBody").style.visibility = "hidden"; 
}

function displayQuestionnaire() {
    document.getElementById("qstBody").style.visibility = "visible";
}