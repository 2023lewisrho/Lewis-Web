let secretMessage = [
    "Learning",
    "is",
    "not",
    "about",
    "what",
    "you",
    "get",
    "easily",
    "the",
    "first",
    "time,",
    "it",
    "is",
    "about",
    "what",
    "you",
    "can",
    "figure",
    "out.",
    "-2015,",
    "Chris",
    "Pine,",
    "Learn",
    "JavaScript",
  ];
secretMessage.pop()
console.log(secretMessage.length);
secretMessage.push("to")
secretMessage.push("Program")
secretMessage.splice(0, 1)
secretMessage.unshift("Programming", "or", "Coding")
let sliceTheArray = secretMessage.slice(-3)
console.log(sliceTheArray[-1]);

if (sliceTheArray[-1].length > 2) {
    sliceTheArray[-1] = "UPDATED"
} else {
    sliceTheArray.pop()
}