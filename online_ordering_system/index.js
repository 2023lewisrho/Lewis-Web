
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
    element.classList = ["flex-item", "clearfix"];
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
    rating.innerHTML = resturant.rating.rate + "/5.0";
    element.appendChild(rating);

    return element;
}
