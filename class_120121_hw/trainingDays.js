// The scope of `random` is too loose
const getRandEvent = () => {
    const random = Math.floor(Math.random() * 3);
    if (random === 0) {
        return "Marathon";
    } else if (random === 1) {
        return "Triathlon";
    } else if (random === 2) {
        return "Pentathlon";
    }
};

// The scope of `days` is too tight
const getTrainingDays = (event) => {
    let dayss = 0;
    if (event === "Marathon") {
        dayss = 50;
    } else if (event === "Triathlon") {
        dayss = 100;
    } else if (event === "Pentathlon") {
        dayss = 200;
    }

    return dayss;
};

const name = "Nala";
// The scope of `name` is too tight
const logEvent = (event) => {
    console.log(`${name}'s event is: ${event}`);
};

const logTime = (days) => {
    console.log(`${name}'s time to train is: ${days} days`);
};

const event = getRandEvent();
const days = getTrainingDays(event);
// Define a `name` variable. Use it as an argument after updating logEvent and logTime

logEvent(event);
logTime(days);