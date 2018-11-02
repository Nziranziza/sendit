
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
        createdAt:new Date(),
        ordered:false,

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
    if(localStorage.getItem('parcels')==null||!JSON.parse(localStorage.getItem('parcels')).length){
    var displayParcel=document.getElementById("display");
    displayParcel.innerHTML="<div class='box margin-left'>"+
                  "<p>Your recent parcel delivery order is empty."+
                  "Please create the first 3 for free</p>"+
                  "</div>"

    }else{
    //get the area to output the parcel delivery order
    var displayParcel=document.getElementById("display");
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    displayParcel.innerHTML="";//make sure the area is empty

    //loop through all parcel delivery order and output them
    var length=parcels.length;
    for(let i=length-1;i>=0;i--){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var status=delivered ? "Delivered":"In transit";
        var date=parcels[i].createdAt;
        var ordered=parcels[i].ordered ? "Cancel":"Order";
        var id=parcels[i].id;
        var btnclass=parcels[i].ordered ? "label del":"label success";
        displayParcel.innerHTML+="<div class='box margin-left'>"+
                           "<button class='left' onclick='deleteParcel("+id+")'>x</button>"+
                           "<h3>Parcel order from "+from+" to "+destination+"</h3>"+
                           "<label>Status: "+status+"</label></br />"+
                           "<label>Weight: "+weight+" kg</label><br />"+
                           "<label>Price: "+price+"</label><br />"+
                           "<label>"+date.toString()+"</label><br />"+
                           "<button onClick='orderParcel("+id+")' class='"+btnclass+"'>"+ordered+"</button>"+
                           "<button onClick='edit("+id+")' class='label primary'>Change location</button>"+
                           "<div id='"+id+"'></div>"
                       "</div>"
    }
}
}
//Make an order
function orderParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].ordered=!parcels[i].ordered;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    fetchParcel();
}
//Change destination
function changeDestination(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var destination=document.getElementById(id+"i").value;
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].destination=destination;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    fetchParcel();
}
//bring destination text field
function edit(id){
  var dist=document.getElementById(id)
  dist.innerHTML="<input type='text' placeholder='Type in new destination' id='"+id+"i'><br />"+
                 "<button class='label primary' onClick='changeDestination("+id+")'>Update</button>"
}
//delete parcel delivery order
function deleteParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for(i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
            parcels.splice(i,1);
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    fetchParcel();
}
//fetch parcels for the admin
function adminParcel(){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for(i=0;i<parcels.length;i++){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var date=parcels[i].createdAt;
        var id=parcels[i].id;
        var status=delivered ? "Delivered":"In transit";
        var adm=document.getElementById('admin');
        adm.innerHTML+="<tr class='tadm'>"+
        "<td>"+from+"</td>"+
        "<td>"+destination+"</td>"+
        "<td>"+price+"</td>"+
        "<td>"+weight+"</td>"+
        "<td>"+status+"</td>"+
        "<td>"+id+"</td>"+
     "</tr>"
    }
    
}