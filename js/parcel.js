
//Receives input from parcel form
//Save them to LocalStorage
function saveParcel(e){
    //collect inputs from form
    var from=document.getElementById("from").value;
    var destination=document.getElementById("destination").value;
    var weight=document.getElementById("weight").value;
   
    //Combine them into a structure
    var  parcel={
        from:from,
        destination:destination,
        weight:weight,
        delivered:false,
        price:0,
        id:Math.random()*10**16,
        createdAt:new Date()
    }
    //Create parcels object and Save the parcel
    if(localStorage.getItem('parcels')==null){
        var parcels=new Array();
        parcels.push(parcel)
        localStorage.setItem('parcels',JSON.stringify(parcels));
    }else{
        //Save the parcel
        var parcels=JSON.parse(localStorage.getItem('parcels'));
        parcels.push(parcel);
        localStorage.setItem('parcels',JSON.stringify(parcels));
}
fetchParcel();
e.preventDefault();
}

//Fetch parcel order and display them to the page
function fetchParcel(){
    //get the area to output the parcel delivery order
    var displayParcel=document.getElementById("display");
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    displayParcel.innerHTML="";//make sure the area is empty

    //loop through all parcel delivery order and output them
    for(let i=0;i<parcels.length;i++){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var status=delivered ? "Delivered":"In transit";
        var date=parcels[i].createdAt
        displayParcel.innerHTML+="<div class='box margin-left'>"+
                           "<h3>Parcel order from "+from+" to "+destination+"<h3>"+
                           "<label>Status: "+status+"</label></br />"+
                           "<label>Weight: "+weight+" kg</label><br />"+
                           "<label>Price: "+price+"</label><br />"+
                           "<label>"+date.toString()+"</label><br />"+
                           "<button id='order'>Order</button>"+
                           "<button id='location'>Change location</button>"
                       "</div>"
    }
}
//Make an order
function orderParcel(){

}