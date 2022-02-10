let operations = []
const ALLOWED = [
    "(", ")", "/", "7",, "8", "9", "+", "-", "/", "*", "4", "5", "6", "1", "2", "3", "0", "."
]

function evaluate() {
    // sanitize operations in case someone edited it, prevent XSS
    operations.filter((elem) => {
        ALLOWED.includes(elem)
    })
    try {
        // Since these calculations are valid JS, we can just eval() this
        let caxlc = eval(`function calc() { return (${operations.join("")}); } 
        calc()`)
        document.getElementById("results").innerText = `= ${caxlc}`
    } catch (error) {
        console.log(error);
        document.getElementById("results").innerText = "Invalid Operation"
        operations = []
    }
}

function backspace() {
    operations.pop()
    document.getElementById("results").innerText = operations.join("")

}

function clear() {
    operations = []
    document.getElementById("results").innerText = "0"
}

let items = document.getElementsByClassName("button");
for (let index = 0; index < items.length; index++) {
    const element = items[index];
    switch (element.innerText) {
        case 'C':
            element.onclick = (ev) => {
                clear()
            }
            break;
        case '<':
            element.onclick = (ev) => {
                backspace()
            }
            break;
        case '=':
            element.onclick = (ev) => {
                evaluate()
            }
            break;    
        default:
            element.onclick = (ev) => {
                operations.push(
                    ev.target.innerText
                )
                console.log(ev);
                document.getElementById("results").innerText = operations.join("")
            }
            break;
    }
}
