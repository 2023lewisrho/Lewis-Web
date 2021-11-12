// makes a constant variable kelvin with a value of 293
const kelvin = 293;
// makes a variable celsius that is 273 less than `kelvin`
let celsius = kelvin - 273;
// makes a variable farenheit which is celsius but converted and floor
let farenheit = Math.floor(celsius * (9/5) + 32);

console.log("The tempratuer is " + farenheit + " degrees farenheit");
