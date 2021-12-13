let arr = ['a', 'b', 'a', 'c', 'a', 'd']
console.log(arr.indexOf('a'))
let zind = arr.indexOf('z')
if (zind != -1) {
    arr[zind] = 'FOUND'
}

const concept = ['arrays', 'can', 'be', 'mutated']

function changeArr(arr) {
    arr[arr.length - 1] = 'MUTATED'
}
changeArr(concept)
console.log(concept)

let numC = [[1,2],[3,4],[5,6]]
console.log(numC[0][0]);
numC[2][1] = -6
console.log(numC[1].length);