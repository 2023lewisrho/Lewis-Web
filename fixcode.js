function startWithChar(string, char) {
    let count = 0;
    for (let i = 0; i < string.length; i++) {
        const element = string[i];
        if (element[0] === char) {
            count++;
        }
    }
    return count;
}

console.log(startWithChar(["a", "aa", "www", "a"], "a"));