let counter = 0;

let elem = document.getElementById("counter");

document.getElementById("down").onclick = (ev) => {
    counter--;
    if (counter < 0) {
        elem.className = "";
        elem.classList.add("negative")
    } else if (counter == 0) {
        elem.className = "";
        elem.classList.add("zero")
    }
    elem.innerText = counter.toString();
}

document.getElementById("up").onclick = (ev) => {
    counter++;
    if (counter > 0) {
        elem.className = "";
        elem.classList.add("positive")
    } else if (counter == 0) {
        elem.className = "";
        elem.classList.add("zero")
    }
    elem.innerText = counter.toString();
}

document.getElementById("reset").onclick = (ev) => {
    counter = 0;
    elem.className = "";
    elem.classList.add("zero")
    elem.innerText = counter.toString();
}