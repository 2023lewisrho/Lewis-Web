/*
Im sorry I couldn't get you proper commit messages since I did this in one sitting,
but enjoy some comments instead.
*/

// Array for the list of row elements in the table
var timeSlotArrayElements;
// Array to keep track of all the time slots in the schedule table
var timeArray = new Array(4);

// Object prototype for our custom timeslot object
function TimeSlot(label, start, length, day, colour) {
    this.label = label;
    this.start = start;
    this.length = length;
    this.day = day;
    this.colour = colour;
    this.start_id = start+"-"+day;
    let id_array = new Array();
    for (var i = start; i < (start+length); i++) {
        id_array.push(i+"-"+day);
    }
    this.id_array = id_array;
}

// Initialize the arrays we need.
function init() {
    
    // Initialize Time Slot Array and the Table
    // The ID format for each of the new elements is 
    // TIMESLOT-DAY
    // For example, for the 10:00AM-11:00AM Wednesday 
    // The TIMESLOT would be the third timeslot, meaning a value of 2 (we count from 0)
    // The DAY would be the third day Wednesday, meaning a value of 2 (we count from 0)
    // So the ID would be "2-2".
    {
        let base_string = "time"
        var array = new Array();
        for (var i = 0; i < 9; i++) {
            let row = document.getElementById(base_string+i);
            for(var j = 0; j < 4; j++) {
                let a = document.createElement("td");
                a.id = i+"-"+j;
                a.setAttribute("class", "table_data");
                a.addEventListener("click", function(event) {
                    handleOnClick(event);
                });
                row.appendChild(a);
            }
            array.push(row);
        }
        timeSlotArrayElements = array;
    }

    // Initialize Time Array
    for (var i = 0; i < 4; i++) {
        timeArray[i] = new Array();
    }
}

init();

// This function takes a timeslot adds it to the timeArray list, and renders it onto the table. 
function render(timeslot) {
    timeArray[timeslot.day].push(timeslot);
    for (var i = timeslot.start; i < (timeslot.start+timeslot.length); i++) {
        let element = document.getElementById(i+"-"+timeslot.day);
        if (i === timeslot.start) {
            element.innerHTML = timeslot.label.toString();
            element.title = timeslot.label.toString() + " (click me to delete me)"; // Hover message
        }
        element.setAttribute("style", "background-color: "+timeslot.colour+";");
    }
}

// Check if the timeslots conflict. 
// We do this by iterating over all the timeslots for a particular day
// and checking if it contains the IDs of the elements we are trying to set as.
function isConflicting(timeslot) {
    for (var i = 0; i < timeArray[timeslot.day].length; i++) {
        let element = timeArray[timeslot.day][i];
        for (var j = 0; j < element.id_array.length; j++) {
            for (var k = 0; k < timeslot.id_array.length; k++) {
                let id_timeslot = timeslot.id_array[k];
                // check if the ID is included.
                if (element.id_array.includes(id_timeslot)) {
                    console.log(id_timeslot);
                    return true;
                }
            }
        }
    }
    return false;
}

// The handler for each table data element that we generate in JS. 
function handleOnClick(event) {
    // We only want this logic to work if this is the root element for the timeslot, i.e. the one with the label
    if (event.explicitOriginalTarget.innerHTML !== "") {
        let src_id = event.explicitOriginalTarget.id;
        let day = Number(src_id.split("-")[1]);
        
        // Loop over the time array to find the correct time slot.
        let timeslotObj = undefined;
        for (var i = 0; i < timeArray[day].length; i++) {
            if (timeArray[day][i].start_id == src_id) {
                timeslotObj = timeArray[day][i];
                // remove the time slot
                timeArray[day].splice(i,1);
            }
        }

        // Get the list of IDs that the time slot contains and clear them.
        if (timeslotObj !== undefined) { // object safety
            document.getElementById(src_id).style = "";
            document.getElementById(src_id).innerHTML = "";
            timeslotObj.id_array.forEach(ids => {
                document.getElementById(ids).style = "";
            });
        }
    }
    
}

// Data input fields
const TextLabel = document.getElementById("text_label");
const DaySelect = document.getElementById("day_select");
const TimeSelect = document.getElementById("time_select");
const HourSelect = document.getElementById("hour_select");
const ColourSelect = document.getElementById("color_select");
const addButton = document.getElementById("add");
const saveButton = document.getElementById("save_button");

// So when clicked, this will clear the text box and make the input text black.
TextLabel.addEventListener("focus", function(event) {
    TextLabel.value = "";
    TextLabel.style = "color: black;";
});

// If the input value is nothing it is reverted.
TextLabel.addEventListener("focusout", function(event) {
    if (this.value == "") {
        TextLabel.value = "Put Some Text Here!";
        TextLabel.style = "color: gray;";
    }
});

// To prevent users from selecting invalid times, we dynamically adjust the time range selectable 
// if the user selects a specific starting time.
TimeSelect.addEventListener("blur", function(event) {
    let selected = Number(TimeSelect.value);
    HourSelect.innerHTML = "";
    for (var i = 0; i < (9-selected); i++){
        let option = document.createElement("option");
        option.value = ""+(i+1);
        option.innerHTML = ""+(i+1);
        HourSelect.appendChild(option);
    }
});

// Submit to table logic
addButton.addEventListener("click", function(event) {
    let text_in = TextLabel.value;
    // Check for valid table labels
    if (text_in == "Put Some Text Here!" || text_in == "") {
        alert("Please put a proper message for Label!");
        return;
    }
    let day = Number(DaySelect.value);
    let starting = Number(TimeSelect.value);
    let length = Number(HourSelect.value);
    let colour = ColourSelect.value;
    
    let time_slot = new TimeSlot(text_in, starting, length, day, colour);
    // Check conflicting
    if (isConflicting(time_slot)) {
        alert("The time select is conflicting! Please choose a different time!");
        return;
    }
    // Render the new timeslot to the table.
    render(time_slot);
});

// Button that takes a screenshot of the table.
saveButton.addEventListener("click", function(event) {
    // Use an external library that renders a DOM element to a HTMLCanvas. Turn that into a PNG Data URL. Make a link, click it using JS and make the user download the file. 
    html2canvas(document.getElementById("tableDisplay"), {
        allowTaint: true,
        useCORS: true,
    }).then((result) => {
        let image = result.toDataURL("image/png", 0.75);
        let link = document.createElement("a");
        link.download = "schedule.png";
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
    }).catch((err) => {
        alert("Failed to save!");
        console.log(err);
    });
})
