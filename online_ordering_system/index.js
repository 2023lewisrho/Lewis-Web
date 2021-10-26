
// where the API lives
const API_ENDPOINT = "http://localhost:8000"

async function get_resturant() {
    const url = API_ENDPOINT + "/resturants";
    try {
        const response = await fetch(url);
        const resturants = await response.json();

        return resturants;
    }
    catch(err) {
        console.error(err);
    }
}

async function get_menu(resturant) {
    const url = API_ENDPOINT + "/foods/" + resturant;
    try {
        const response = await fetch(url);
        const foods = await response.json();
        console.log(foods);
        return foods;
    }
    catch(err) {
        console.error(err);
    }
}

function Rating(rate) {
    this.rating = rate;
}

function Resturant(name, ico, description, rating) {
    this.name = name;
    this.ico = ico;
    this.description = description;
    this.rating = new Rating(rating);
}

function FoodItem(name, ico, types, price, rating) {
    this.name = name;
    this.ico = ico;
    this.types = types,
    this.price = price;
    this.rating = new Rating(rating);
}

function resturant_to_element(resturant) {
    let element = document.createElement("div");
    let icon = document.createElement("img");
    let header = document.createElement("h4");
    let description = document.createElement("p");
    let rating = document.createElement("label");

    // set up resturant elem
    element.classList = "flex-item";
    // set up icon image
    icon.setAttribute("src", resturant.ico);
    icon.setAttribute("alt", "Resturant Logo");
    element.appendChild(icon);
    // set up header
    header.innerHTML = resturant.name;
    element.appendChild(header);
    // set up description
    description.innerHTML = resturant.description;
    element.appendChild(description);
    //
    console.log(resturant);
    rating.innerHTML = "★" + resturant.rating.rating + "/5.0";
    element.appendChild(rating);

    return element;
}

function fooditem_to_element(fooditem) {
    let element = document.createElement("div");
    let icon = document.createElement("img");
    let header = document.createElement("h4");
    let description = document.createElement("p");
    let price = document.createElement("label");
    let rating = document.createElement("label");

    element.classList = "flex-item";
    // set up icon image
    icon.setAttribute("src", fooditem.ico);
    icon.setAttribute("alt", "Food Image");
    element.appendChild(icon);
    // set up header
    header.innerHTML = fooditem.name;
    element.appendChild(header);
    // set up description
    let desc = fooditem.food_type.toString();
    desc.replace('[', '');
    desc.replace(']', '');
    description.innerHTML = desc;
    element.appendChild(description);
    //
    price.innerHTML = "₩" + fooditem.price;
    element.appendChild(price);

    // nooooo dont use <br> to format!!!!!!
    // haha <br> go 
    //
    //
    //
    //
    //
    //
    //
    element.appendChild(document.createElement("br"));

    rating.innerHTML = "★" + fooditem.rating.rating + "/5.0";
    element.appendChild(rating);

    return element;
}

function set_pageheader(str) {
    let header = document.getElementById("header");
    header.innerHTML = str;
}

function remove_all_children(id) {
    let elem = document.getElementById(id);
    while (elem.lastChild) {
        elem.removeChild(elem.lastChild);
    }
}

// on load
function main() {
    let main_div = document.getElementById("root_view");
    remove_all_children("root_view");
    get_resturant().then((success) => {
        success.forEach(element => {
            let to_add = resturant_to_element(element);
            to_add.onclick = prepareFoods;
            set_pageheader("Resturants");
            main_div.appendChild(to_add);
        });
    }, (failure) => {
        console.error(failure);
    });
}

main()

function prepareFoods(event) {
    var resturant_to_get = event.target || event.srcElement;
    if (resturant_to_get.localName != "div") {
        resturant_to_get = resturant_to_get.parentNode;
    }

    // get the h4 containing the resturant
    var resturant = resturant_to_get.getElementsByTagName('h4')[0].innerHTML;
    let main_div = document.getElementById("root_view");
    remove_all_children("root_view");
    get_menu(resturant).then((success) => {
        success.forEach(element => {
            let to_add = fooditem_to_element(element);
            to_add.onclick = checkout;
            set_pageheader("Menu of Resturant " + resturant);
            main_div.appendChild(to_add);
        });
    }, (failure) => {
        console.error(failure);
    });
}

function checkout(event) {
    remove_all_children("root_view");
    set_pageheader("Checkout");

    document.getElementById("form").hidden = false;
    document.getElementById("submit").onclick = thank_you;
}

function thank_you(ev) {
    remove_all_children("root_view");
    let main_div = document.getElementById("root_view");
    let thank = document.createElement("div");
    let you = document.createElement("h1");

    document.getElementById("form").hidden = true;
    set_pageheader("Bought!");


    thank.classList = "center";
    you.innerHTML = "Thank you for your purchase!";

    thank.appendChild(document.createElement("br"));
    thank.appendChild(you);
    main_div.appendChild(thank);
}
