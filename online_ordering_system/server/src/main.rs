#[macro_use]
extern crate rocket;
#[macro_use]
extern crate lazy_static;
#[macro_use]
extern crate serde;

use std::collections::HashMap;
use rocket::{
    serde::json::Json,
    http::{
        Method,
        Header
    },
    fairing::{Fairing, Info, Kind},
    Request,
    Response
};
use serde::{Serialize, Deserialize};
use async_trait::async_trait;


// WOOOOOOOOOOOOOOOOH BECOME A RUSTACEAN WOOOOOOOOOOOOOOH
// (you're being rustacean hypno right now)
// R RR RR                  
// R RRRRRRRR R          R     
// R RR       R RRRRRRRRRRRRR R      RR     
// rR RRR    R RRRRRRRRRRRRRRRRR R   RRR R   
// RRR RR   RRRRRRRRRRRRRRRRRRRRRRR  RRRRR
// RRRRR  RRRRRRRRRRRRRRRRRRRRRRRR  RRRR    
// RRR RRRRRRRRRRRRRRRRRRRRRRRRRRRR RR     
// R  RRRRRRRRRR=  RR = RRRRRRRRRRR                 
// RRRRRRRRRRRR=  RR = RRRRRRRRRR                  
// RRRRRRRRRRR   RR   RRRRRRRRRR
// RR==RRRRRRRRRRRRRRRRRRRRRR===RR      
// RR =  ==RRRRRRR  RRRRRR==  = RR               
// RR =     ===========     = RR                
// RR                        R        
// R                       R
// R         
//                       
// (this is ferris the rust crab compelling you to learn rust)
// (they live in your walls)


lazy_static! {
    static ref RESTURANTS: HashMap<Resturant, Vec<FoodItem>> = {
        let mut map = HashMap::new();
        // Look, we would have an SQL Database in real life that we could query
        // but we don't, lmao
        // so we have to do this AHHHHHHHHHHHH
        map.insert(
            Resturant::new(
                "Chicken Hosen",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.template.net%2Fwp-content%2Fuploads%2F2016%2F11%2F04115938%2FCreative-Restaurant-Logo.jpg&f=1&nofb=1",
                "Everything Chicken",
                4.4_f32,
            ),
            vec![
                FoodItem::new(
                    "Roast Pan Chicken",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg2.mashed.com%2Fimg%2Fgallery%2Fmistakes-youre-making-when-cooking-a-heritage-chicken%2Fcook-heritage-chicken-low-and-slow-1597170193.jpg&f=1&nofb=1",
                    vec!["Roast", "Whole Chicken"],
                    10000,
                    4.2_f32
                ),
                FoodItem::new(
                    "Rice Chicken",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdirectory.dmagstatic.com%2Fwp-content%2Fuploads%2F2018%2F02%2Frice-chicken.jpg&f=1&nofb=1",
                    vec!["Fried", "Rice", "Whole Chhicken"],
                    15000,
                    4.7_f32
                ),
            ]
        );


        map.insert(
            Resturant::new(
                "Food Circles",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fclipart-restaurant-restaurant-logo-5.png&f=1&nofb=1",
                "Exotic Meats",
                3.2_f32,

            ),
            vec![
                FoodItem::new(
                    "Wild Boar Burger",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fs.hdnux.com%2Fphotos%2F67%2F01%2F63%2F14425318%2F3%2F920x920.jpg&f=1&nofb=1",
                    vec!["Exotic", "Wild Boar", "Burger"],
                    25000,
                    3.7_f32
                ),
                FoodItem::new(
                    "Lamb Steak",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.thegentlemansjournal.com%2Fwp-content%2Fuploads%2F2015%2F01%2FOstrichMeat-TGJ.04-compressor.jpg&f=1&nofb=1",
                    vec!["Steak"],
                    20000,
                    4.2_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Costa Coffee",
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.designhill.com%2Fdesign-blog%2Fwp-content%2Fuploads%2F2015%2F01%2F7.png&f=1&nofb=1",
                "Tropical Raw Coffees and Paninis",
                4.2_f32
            ),
            vec![
                FoodItem::new(
                    "Expresso",
                    "https://2.bp.blogspot.com/-9J8OUTOWYUY/V0W2DWZWVjI/AAAAAAAAAT4/JEzFvOl3Bn4fdqPAm-woOQbA3PohcfQ6ACKgB/s1600/espresso2.jpg",
                    vec!["Coffee", "Expresso", "Hot"],
                    5000,
                    4.2_f32
                ),
                FoodItem::new(
                    "Americano",
                    "https://perfectdayforcoffee.com/wp-content/uploads/2019/09/IMG_20190815_142047_298.jpg",
                    vec!["Coffee", "Americano", "Iced"],
                    2000,
                    4.7_f32
                ),
                FoodItem::new(
                    "Hamilton Beach Panini",
                    "https://simplegreenmoms.com/wp-content/uploads/2019/04/grilled-panini-sandwiches.jpg",
                    vec!["Panini", "Sandwich", "Ham"],
                    10000,
                    4.4_f32
                ),
                FoodItem::new(
                    "Chicken Cordon Bleu Panini",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.foodrepublic.com%2Fwp-content%2Fuploads%2F2013%2F10%2Fchickenpanini_final.jpg&f=1&nofb=1",
                    vec!["Panini", "Sandwich", "Chicken"],
                    10000,
                    4.5_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Mr. Bolat Kebab &amp; Pizza",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.sosfactory.com%2Fwp-content%2Fuploads%2F2016%2F12%2Ffull-restaurant-logo-min.png&f=1&nofb=1",
                "The Best Pizza and late-night Kebabs in town",
                4.7_f32
                ),
            vec![
                FoodItem::new(
                    "Feta Kebab",
                    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fkebabking.pl%2Fwp-content%2Fuploads%2F2019%2F02%2Ffet-kebab.png&f=1&nofb=1",
                    vec!["Kebab", "Turkish", "Wrap", "Feta"],
                    9000,
                    4.9_f32
                ),
                FoodItem::new(
                    "Pepperoni Pizza",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdashofgingerblog.com%2Fwp-content%2Fuploads%2F2019%2F01%2FBrunch-07842.jpg&f=1&nofb=1",
                    vec!["Pizza", "Pepperoni", "New York Style"],
                    7000,
                    4.8_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Uptown Slice",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F57%2F2d%2F7f%2F572d7f90c8a9ef92e7f9710563ecebc3.png&f=1&nofb=1",
                "Fresh, oven baked neopolitician pizza",
                4.0_f32,
                ),
            vec![
                FoodItem::new(
                    "Margherita Pizza",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.mklibrary.com%2Fwp-content%2Fuploads%2F2018%2F05%2FNeapolitan-Style-Margherita-Pizza-featured.jpg&f=1&nofb=1",
                    vec!["Pizza", "Margherita", "Neapolitan"],
                    15000,
                    4.3_f32
                ),
                FoodItem::new(
                    "Pepperoni Pizza",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fexternal-preview.redd.it%2F-rgse8DSIYHIU1wdhuWvhH-puTUVzxWAAgCFnqyoRt0.jpg%3Fauto%3Dwebp%26s%3Db98bf764278cdeb96f33068277f7e52b0cb4aec4&f=1&nofb=1",
                    vec!["Pizza", "Pepperoni", "Neapolitan"],
                    16000,
                    4.2_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Salami Resturant",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwebstockreview.net%2Fimages%2Fclipart-restaurant-restaurant-logo-7.png&f=1&nofb=1",
                "Fermented Salty Meats",
                4.3_f32
                ),
            vec![
                FoodItem::new(
                    "Salami Sandwich",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdnimg.webstaurantstore.com%2Fimages%2Fproducts%2Flarge%2F485848%2F1814939.jpg&f=1&nofb=1",
                    vec!["Sandwich", "Salami", "Fresh"],
                    12000,
                    4.2_f32
                ),
                FoodItem::new(
                    "Sliced Salami Spread",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.dukeshillham.co.uk%2FPortals%2F0%2Fproduct%2Fimages%2FSliced-Fennel-Salami-Two-Packs.jpg&f=1&nofb=1",
                    vec!["Salami", "Fresh", "Spread", "Sliced", "Sides"],
                    10000,
                    4.7_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Indian Lounge",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdcassetcdn.com%2Fdesign_img%2F3633399%2F746845%2F746845_20161237_3633399_b8c1ce2c_image.png&f=1&nofb=1",
                "Real Indian Curry",
                4.2_f32,
                ),
            vec![
                FoodItem::new(
                    "South Indian Chicken Curry",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.thespruceeats.com%2Fthmb%2FheuS-yz2S_1hJBlLXeym-S-EoBc%3D%2F6016x4016%2Ffilters%3Afill(auto%2C1)%2Fsouth-indian-style-chicken-curry-1957789-hero-01-4886b469548e40278351a0085a4d9c92.jpg&f=1&nofb=1",
                    vec!["Indian", "Curry", "South Indian"],
                    10000,
                    4.3_f32
                ),
                FoodItem::new(
                    "Chicken Tikka Masala",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ffeenix.co.in%2Fwp-content%2Fuploads%2F2018%2F01%2Fmaxresdefault-1-1.jpg&f=1&nofb=1",
                    vec!["Indian", "Curry", "Chicken", "Masala"],
                    10000,
                    4.6_f32
                ),
                FoodItem::new(
                    "3x Naan Tandoori Bread",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Froyalindia-cuisine.com%2Fwp-content%2Fuploads%2F2017%2F04%2Finidan-bread.jpg&f=1&nofb=1",
                    vec!["Indian", "Naan", "Bread", "Tandoori"],
                    2000,
                    4.5_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Chillis",
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F12%2Fd0%2F7c%2F12d07c2c753c6342ff4a477fcbbe03ed.png&f=1&nofb=1",
                "Gas station chilli without the bathroom visit",
                3.9_f32,
                ),
            vec![
                FoodItem::new(
                    "Vegeterian Chilli",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.l4CKFq6-t3ilJO1rPPJAaQHaJQ%26pid%3DApi&f=1",
                    vec!["Vegeterian", "Chilli"],
                    9000,
                    4.3_f32
                ),
                FoodItem::new(
                    "Meat Lover's Chilli",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdrizzlemeskinny.com%2Fwp-content%2Fuploads%2F2017%2F01%2FDSCN0511-768x576.jpg&f=1&nofb=1",
                    vec!["Meat Lover", "Chilli"],
                    10000,
                    3.8_f32
                ),
            ]
        );

        map.insert(
            Resturant::new(
                "Ichiban",
                "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.ichibanrestaurantscharlestonwv.com%2Fwp-content%2Fuploads%2F2017%2F01%2Fichiban-logo-transparent.png&f=1&nofb=1",
                "Pan-Asian Cusine",
                4.1_f32,
                ),
            vec![
                FoodItem::new(
                    "Variety Chinese Dimsum",
                    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.senyorita.net%2Fwp-content%2Fuploads%2F2013%2F05%2FSeafood-Dim-Sum.jpg&f=1&nofb=1",
                    vec!["Dumpling", "Steamed", "Variety", "Spread", "Chinese"],
                    10000,
                    4.2_f32
                ),
                FoodItem::new(
                    "Korean Bibimbap",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Fnylonpink.tv%2Fwp-content%2Fuploads%2F2016%2F08%2FBibimbap.jpg&f=1&nofb=1",
                    vec!["Rice", "Mix", "Beef", "Korean"],
                    9000,
                    4.3_f32
                ),
                FoodItem::new(
                    "Variety Japanese Sushi",
                    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.H-f4-HsnqOv2bMvgBDf6eAHaE8%26pid%3DApi&f=1",
                    vec!["Salmon", "Crab", "Squid", "Tuna", "Rice", "Japanese"],
                    11000,
                    4.1_f32
                ),
            ]
        );

        map
    };
}

// we have to do this because floats are not Eq, Ord, and Hash
// In an actual application this would be a proper rational/f32 wrapper
// but you see, that requires actual effort than an From impl
#[derive(Clone, Default, Debug, Deserialize, Serialize, Ord, PartialOrd, Eq, PartialEq, Hash)]
struct StringRating {
    pub rating: String
}

impl From<f32> for StringRating {
    fn from(from: f32) -> Self {
        StringRating {
            rating: format!("{:.1}", from)
        }
    }
}

// This struct will be serialized into every food type per resturant
#[derive(Clone, Default, Debug, Ord, PartialOrd, Eq, PartialEq, Hash, Serialize, Deserialize)]
struct FoodItem {
    pub name: String,
    pub ico: String,
    pub food_type: Vec<String>,
    pub price: u32,
    pub rating: StringRating,
}

impl FoodItem {
    pub fn new(name: &str,
               ico: &str,
               food_type: Vec<&str>,
               price: u32,
               rating: f32) -> Self {
        FoodItem {
            name: name.to_string(),
            ico: ico.to_string(),
            food_type: food_type.into_iter().map(|x| x.to_string()).collect::<Vec<String>>(),
            price,
            rating: rating.into()
        }
    }
}

// This struct will be serialized into every resturant
#[derive(Clone, Default, Debug, Ord, PartialOrd, Eq, PartialEq, Hash, Serialize, Deserialize)]
struct Resturant {
    pub name: String,
    pub ico: String,
    pub description: String,
    pub rating: StringRating,
}

impl Resturant {
    pub fn new(name: &str, ico: &str, desc: &str, rating: f32) -> Self {
        Resturant {
            name: name.to_string(),
            ico: ico.to_string(),
            description: desc.to_string(),
            rating: rating.into(),
        }
    }
}

#[get("/resturants")]
fn resturant() -> Json<Vec<Resturant>> {
    let restaurants = RESTURANTS.keys().map(|x| x.clone()).collect::<Vec<Resturant>>();
    Json(restaurants)
}

#[get("/foods/<resturant>")]
fn foods(resturant: String) -> Json<Vec<FoodItem>> {
    let restaurant = RESTURANTS.keys().filter(|x| x.name == resturant).map(Clone::clone).collect::<Vec<Resturant>>();
    // return empty if null
    match restaurant.get(0) {
        Some(res) => {
            match RESTURANTS.get(res) {
                Some(foods) => {
                    Json(foods.clone())
                }
                None => {
                    Json(vec![])
                }
            }
        }
        None => {
            Json(vec![])
        }
    }
}

pub struct Cors;

#[async_trait]
impl Fairing for Cors {
    fn info(&self) -> Info {
        Info {
            name: "Cross-Origin-Resource-Sharing Middleware",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self,
                             request: &'r Request<'_>,
                             response: &mut Response<'r>) {
        response.set_header(Header::new(
            "access-control-allow-origin",
            "*",
        ));
        response.set_header(Header::new(
            "access-control-allow-methods",
            "GET, PATCH, OPTIONS",
        ));
    }
}



#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Cors)
        .mount("/", routes![resturant, foods])
}
