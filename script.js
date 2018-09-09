function main() {
    incBtn = document.querySelector("#inc");
    decBtn = document.querySelector("#dec");
    sec = document.querySelector("#sec-input");
    res = document.querySelector("#result");

    function updateOutput() {
        res.innerHTML = timestr(Number(sec.textContent));
    }

    incBtn.onclick = function() {
        sec.textContent = Number(sec.textContent) + 1;
        updateOutput();
    };

    decBtn.onclick = function() {
        if (sec.textContent == "0") return;
        sec.textContent = Number(sec.textContent) - 1;
        updateOutput();
    };

    // Is the number of seconds increasing/decreasing automatically?
    // 0 if no
    // 1 if it's increasing
    // 2 if it's decreasing
    onAuto = 0;

    // Time interval (in milliseconds) between automated second changing
    autoSpeed = 500;

    secAuto = undefined;

    function triggerAutoSec() {
        switch (onAuto) {
            case 0:
                clearInterval(secAuto);
                break;
            case 1:
                clearInterval(secAuto);
                secAuto = setInterval(function() {
                    incBtn.click();
                }, autoSpeed);
                break;
            case 2:
                clearInterval(secAuto);
                secAuto = setInterval(function() {
                    decBtn.click();
                }, autoSpeed);
                break;
            default:
                console.log("Something isn't right :(");
        }

        document.querySelector("#isauto").textContent = (onAuto == 0 ? "Off" : "On");
        document.querySelector("#auto-speed-clock").textContent = autoSpeed;
    }


    notifyTimeout = undefined;
    function notify(msg) {
        clearTimeout(notifyTimeout);
        document.querySelector("#notif-tray").textContent = msg;
        notifyTimeout = setTimeout(function() {
            document.querySelector("#notif-tray").textContent = "No event recently.";
        }, 3000);
    }

    document.onkeyup = function(e) {
        switch (e.keyCode) {
            case 38:  // Up arrow key -> Decrease auto interval time by 100ms
                autoSpeed = (autoSpeed == 0 ? 0 : autoSpeed - 100);
                triggerAutoSec(); break;

            case 40:  // Down arrow key -> Increase auto speed by 100ms
                autoSpeed += 100; triggerAutoSec(); break;

            case 65:  // A key
            case 73:  // I key
                // Start increasing the number of seconds automatically
                onAuto = 1; triggerAutoSec();
                notify("Automation started, number of seconds is increasing on its own...");
                break;

            case 68:  // D key -> Start decreasing the number of seconds
                onAuto = 2; triggerAutoSec(); break;

            case 80:  // P key -> Manual input for number of seconds
                userInput = Number(prompt("Enter number of seconds"));
                if (! isNaN(userInput)) {
                    sec.textContent = userInput;
                    notify("Valid input, number of seconds changed to " + userInput + ".");
                }
                else {
                    notify("Invalid input!");
                }
                updateOutput();
                break;

            case 82:  // R key -> Reset number of seconds to 0
                sec.textContent = "0"; updateOutput();
                notify("Number of seconds is back to 0.")
                break;

            case 83:  // S key -> Stop automated second changing
                onAuto = 0; triggerAutoSec();
                notify("Automation stopped.");
                break;
        }
    }
}

document.addEventListener("DOMContentLoaded", main);
