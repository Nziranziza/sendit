
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
        id:Math.random()*10**17,
        createdAt:new Date(),
        ordered:false,
        present_loc:from

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
        var present_loc=parcels[i].present_loc;
        var btnclass=parcels[i].ordered ? "label del":"label success";
        displayParcel.innerHTML+="<div class='box margin-left'>"+
                           "<div class='popup right' onMouseOver='popup("+id+")' onMouseOut='popup("+id+")' onclick='deleteParcel("+id+")'>x<span class='popuptext' id='"+id+"p'>Remove</span></div>"+
                           "<h3>Parcel order from "+from+" to "+destination+"</h3>"+
                           "<label>Status: "+status+"</label></br />"+
                           "<label>Weight: "+weight+" kg</label><br />"+
                           "<label>Price: "+price+"</label><br />"+
                           "<label>Present location: "+present_loc+"</label>"+
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
/*Admin codes
_______________________________________________________________________________________________________________________________________*/
//fetch parcels for the admin
function adminParcel(){
    var adm=document.getElementById('admin');
    adm.innerHTML="";
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for(i=0;i<parcels.length;i++){
        var from=parcels[i].from;
        var destination=parcels[i].destination;
        var weight=parcels[i].weight;
        var delivered=parcels[i].delivered;
        var price=parcels[i].price;
        var date=parcels[i].createdAt;
        var id=parcels[i].id;
        var present_loc=parcels[i].present_loc;
        var status=delivered ? "Delivered":"In transit";
        var btncls=delivered? "label success":"label primary";
        var btn_caption=delivered ? "Success":"Deliver";
        adm.innerHTML+="<tr class='tadm'>"+
        "<td><img src='../img/arrow.png' style='width:15px' onClick='detailParcel("+id+")' id='"+id+"img'></img> "+from+"</td>"+
        "<td>"+destination+"</td>"+
        "<td>"+price+"</td>"+
        "<td>"+weight+" Kg</td>"+
        "<td>"+status+"</td>"+
        "<td>"+present_loc+"</td>"+
        "<td>"+id+"</td>"+
        "<td><button class='"+btncls+"' onClick='deliverParcel("+id+")'>"+btn_caption+"</button>"+
     "</tr>"+"<div id='"+id+"'></div>"
    }
    
}
//Deliver the parcel order for Admin 
function deliverParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].delivered=true;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    adminParcel();
}
//Drop down details
function detailParcel(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var view=document.getElementById(id);
    for(i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
            var status=parcels[i].delivered ? "Delivered":"In transit";
            if(view.innerHTML)
              view.innerHTML=""
            else
              view.innerHTML="<div class='box'>"+
                             "<h3>Parcel delivery Order details</h3>"+
                             "<b>Id:</b> "+parcels[i].id+"<br />"+
                             "<b>From:</b> "+parcels[i].from+"<br />"+
                             "<b>Destination:</b> "+parcels[i].destination+"<br />"+
                             "<b>Price:</b> "+parcels[i].price+"<br />"+
                             "<b>Status:</b> "+status+"<br />"+
                             "<b>Present location:</b><br />"+
                             "<input type='text' value='"+parcels[i].present_loc+"'placeholder='New present location' id='"+id+"pr'>"+
                             "<button class='button primary' onClick='changePresentloc("+id+")'>Update</button>"
                             "</div>";
        }
    }
    var arrow_url=view.innerHTML ? "../img/arrowdown.png":"../img/arrow.png";
    document.getElementById(id+"img").setAttribute('src',arrow_url);
}
//Change Present location
function changePresentloc(id){
    var parcels=JSON.parse(localStorage.getItem('parcels'));
    var newlocation=document.getElementById(id+'pr').value;
    if(newlocation){
    for (i=0;i<parcels.length;i++){
        if(id===parcels[i].id){
           parcels[i].present_loc=newlocation;
        }
    }
    localStorage.setItem('parcels',JSON.stringify(parcels));
    adminParcel();
 }else
 alert("Type in new location");
}