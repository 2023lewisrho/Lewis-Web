function makeShoppingList(item1 = "milk", item2 = "bread", item3 = "eggs") {
    console.log("List: " + item1 + ", " + item2 + ", " + item3);
}

makeShoppingList();
makeShoppingList("ww");
makeShoppingList("ww", "www");
makeShoppingList(undefined, undefined, "www");

function monitorCount(rows, columns) {
    return rows * columns;
}

let numOfMonitors = monitorCount(481241,29019);
console.log(numOfMonitors);
