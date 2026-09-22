let secretCode =Math.floor(Math.random()*20) +1;
let remainingAttempts = 5;
let task1Completed = false;
let task2completed = false;
let task3Completed = false;

const secretPassword = "Cybercafe";


const task1 = document.getElementById("task1");
const task2 = document.getElementById("task3");
const task3 = document.getElementById("task3");


const codeInput = document.getElementById("codeInput");
const codeButton = document.getElementById("codeButton");
const codeMessage = document.getElementById("codeMessage");
const attemptsText = document.getElementById("attempts");


const passwordInput = document.getElementById("passwordInput");
const passwordButton = document.getElementById("passwordButton");
const passwordMessage = document.getElementById("passwordMessage");


const sequenceInput = document.getElementById("sequenceInput");
const sequenceButton = document.getElementById("sequenceButton");
const sequenceOutput = document.getElementById("sequenceOutput");
const sequenceMessage = document.getElementById("sequenceMessage");


const gameStatus = document.getElementById("gameStatus");
const progressBar = document.getElementById("progressBar");
const winScreen = document.getElementById("winScreen");
const restartButton = document.getElementById("restartButton");


function checkCode() {
    const enteredCode =       
    Number(codeInput.value);

    if (codeInput.value === "") {


        showMessage(
            codeMessage,
            "Bitte gib eine Zahl ein.",
            false
        );

    } else if (
    enteredCode < 1 ||
    enteredCode > 20
    ) {

    showMessage(
        codeMessage,
        "Der Code muss zwischen 1 und 20 liegen.",
        false
    );

    } else if (enteredCode === secretCode) {
    task1Completed = true;
    remainingAttempts = 0;

    showMessage(
    codeMessage,
    "Zugangscode korrekt! Aufgabe 1 abgeschlossen.",
    true);

    completeTask(
    task1,
    "status1");

    unlockTask(
    task2,
    "status2");

    codeButton.disabled = true;
    codeInput.disabled = true;
    updateProgress();

} else {
    remainingAttempts--;
    attemptsText.textContent =
        remainingAttempts;
    
    if (remainingAttempts === 0) {
        showMessage(
            codeMessage,
            "GAME OVER: Keine Versuche mehr übrig.",
            false
        );

        codeButton.disabled = true;
        codeInput.disabled = true;

    } else if (secretCode > enteredCode) {
        showMessage(
            codeMessage,
            "Falsch. Der gesuchte Code ist größer.",false
    );

    
        } else {


            showMessage(
                codeMessage,
                "Falsch. Der gesuchte Code ist kleiner.",
                false
            );
        }
    }
}


function checkPassword() {


    // Sicherheitsprüfung
    if (!task1Completed) {
        
        showMessage(
            passwordMessage,
            "Aufgabe 2 ist noch gesperrt.",
            false
        );




    // Keine Eingabe
    } else if (
        passwordInput.value === ""
    ) {


        showMessage(
            passwordMessage,
            "Bitte gib ein Passwort ein.",
            false
        );




    // Zu kurz
    } else if (
        passwordInput.value.length < 8
    ) {


        showMessage(
            passwordMessage,
            "Das Passwort muss mindestens 8 Zeichen lang sein.",
            false
        );




    // Falsches Passwort
    } else if (
        passwordInput.value !== secretPassword
    ) {


        showMessage(
            passwordMessage,
            "Falsches Passwort. Zugriff verweigert.",
            false
        );




    // Richtiges Passwort
    } else {


        task2Completed = true;




        showMessage(
            passwordMessage,
            "Passwort korrekt! Aufgabe 2 abgeschlossen.",
            true
        );




        completeTask(
            task2,
            "status2"
        );




        unlockTask(
            task3,
            "status3"
        );




        passwordButton.disabled = true;


        passwordInput.disabled = true;




        updateProgress();
    }
}






// =====================================
// AUFGABE 3
// SICHERHEITSSEQUENZ
// =====================================


function startSequence() {


    const endNumber =
        Number(sequenceInput.value);




    // Aufgabe darf noch nicht geöffnet sein
    if (!task2Completed) {


        showMessage(
            sequenceMessage,
            "Aufgabe 3 ist noch gesperrt.",
            false
        );




    // Keine Eingabe
    } else if (
        sequenceInput.value === ""
    ) {


        showMessage(
            sequenceMessage,
            "Bitte gib eine Zahl ein.",
            false
        );




    // Zu klein
    } else if (endNumber < 1) {


        showMessage(
            sequenceMessage,
            "Die Zahl muss mindestens 1 sein.",
            false
        );




    // Zu groß
    } else if (endNumber > 10) {


        showMessage(
            sequenceMessage,
            "Die Zahl darf höchstens 10 sein.",
            false
        );




    // Eingabe ist gültig
    } else {


        sequenceOutput.textContent = "";




        // =================================
        // SCHLEIFE
        // =================================


        for (
            let number = 1;
            number <= endNumber;
            number++
        ) {


            sequenceOutput.textContent +=
                number + " ";
        }




        task3Completed = true;




        showMessage(
            sequenceMessage,
            "Sicherheitssequenz erfolgreich ausgeführt!",
            true
        );




        completeTask(
            task3,
            "status3"
        );




        sequenceButton.disabled = true;


        sequenceInput.disabled = true;




        updateProgress();




        unlockSystem();
    }
}






// =====================================
// NACHRICHT ANZEIGEN
// =====================================


function showMessage(
    element,
    message,
    success
) {


    element.textContent = message;




    if (success) {


        element.className =
            "message success";


    } else {


        element.className =
            "message error";
    }
}






// =====================================
// AUFGABE ABSCHLIESSEN
// =====================================


function completeTask(
    task,
    statusId
) {


    task.classList.remove("active");


    task.classList.add("completed");




    document.getElementById(statusId)
        .textContent = "ABGESCHLOSSEN";
}






// =====================================
// NÄCHSTE AUFGABE FREISCHALTEN
// =====================================


function unlockTask(
    task,
    statusId
) {


    task.classList.remove("locked");


    task.classList.add("active");




    document.getElementById(statusId)
        .textContent = "OFFEN";
}


function updateProgress() {


    let completed = 0;




    if (task1Completed) {


        completed++;
    }




    if (task2Completed) {


        completed++;
    }




    if (task3Completed) {


        completed++;
    }




    gameStatus.textContent =
        "Fortschritt: " +
        completed +
        " / 3 Aufgaben abgeschlossen";




    progressBar.style.width =
        (completed / 3 * 100) + "%";
}






// =====================================
// SYSTEM ENTSPERREN
// =====================================


function unlockSystem() {


    if (
        task1Completed &&
        task2Completed &&
        task3Completed
    ) {


        // CSS-Klasse hinzufügen
        document.body.classList.add(
            "unlocked"
        );




        // Gewinnbildschirm anzeigen
        winScreen.classList.add(
            "show"
        );




        gameStatus.textContent =
            "SYSTEMSTATUS: ENTSPERRT";
    }
}






// =====================================
// SPIEL NEUSTARTEN
// =====================================


function restartGame() {


    location.reload();
}






// =====================================
// EVENTS
// =====================================




// Button Aufgabe 1
codeButton.addEventListener(
    "click",
    checkCode
);




// Button Aufgabe 2
passwordButton.addEventListener(
    "click",
    checkPassword
);




// Button Aufgabe 3
sequenceButton.addEventListener(
    "click",
    startSequence
);




// Neustart
restartButton.addEventListener(
    "click",
    restartGame
);






// =====================================
// ENTER-TASTE
// =====================================


codeInput.addEventListener(
    "keydown",
    function(event) {


        if (event.key === "Enter") {


            checkCode();
        }
    }
);




passwordInput.addEventListener(
    "keydown",
    function(event) {


        if (event.key === "Enter") {


            checkPassword();
        }
    }
);




sequenceInput.addEventListener(
    "keydown",
    function(event) {


        if (event.key === "Enter") {


            startSequence();
        }
    }
);






// =====================================
// STARTZUSTAND
// =====================================


updateProgress();

