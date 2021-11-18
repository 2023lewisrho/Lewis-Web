let race_number = Math.ceil(Math.random() * 1000);
let registered_early = false;
let runner_age = 2;

if (runner_age > 18 && registered_early) {
    race_number += 1000;
}

if (runner_age > 18 && registered_early) {
    console.log(`Your race time is 9:30 AM. Your race number is ${race_number}.`);
} else if (runner_age > 18 && !registered_early) {
    console.log(`Your race time is 11:00 AM. Your race number is ${race_number}.`);
} else if (runner_age < 18) {
    console.log(`Youth registrants run at 12:30 pm (regardless of registration). Your race number is ${race_number}.`);
} else {
    console.log("Please see the help desk.")
}

