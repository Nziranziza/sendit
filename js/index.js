function welcome (){
    alert("Welcome to SendIT");
}

function createParcel(){
    var from=document.getElementById("from").value;
    var destination=document.getElementById("destination").value;
    var weight=document.getElementById("weight").value;
   return("<div class='box'>"+
               "<h2>Parcel order from "+from+" to "+destination+"</h2>"+
            "<button class='button button-danger'>Cancel</button>"+
            "<button class='button'>Change destination</button>"+
            "</div>"
        );
}


function displayParcel(){
    var displayParcel=document.getElementById("display");
    var parcel=createParcel();
    displayParcel.innerHTML+=parcel;
}