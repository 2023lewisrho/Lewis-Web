function addition(a, b) {
    return a + b
}

function circle(r) {
    return r^2 * Math.PI
}

function lessThan(a, b) {
    return (a + b) < 100
}

function leapYear(y) {
    return y % 4 == 0
}

function ten(a, b) {
    return (a == 10) || (b == 10) || (a + b == 10)
}

console.log(addition(3,2));
console.log(addition(-3, -6));

console.log(circle(2));
console.log(circle(10));

console.log(lessThan(22, 15));
console.log(lessThan(212, 15));

console.log(leapYear(2020));
console.log(leapYear(2021));

console.log(ten(9,10));
console.log(ten(9, 9));
console.log(ten(1,10));