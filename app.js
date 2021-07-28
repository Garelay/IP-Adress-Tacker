var mymap = L.map('mapid').setView([65.751244, 38.618423], 9);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZ2FyZWxheSIsImEiOiJja3JhMHZ5ZTUwbzduMm5xeGU0Nm9uYm9tIn0.ciQhzhfFvPp2_Nl8Hv_m6A'
        }).addTo(mymap);
const ipApiAccessKey = "f26b0397f874a57e289cc7e521666cd9";

// getting user IP
async function getUserIp(){
        try {
            const response = await fetch(`http://api.ipstack.com/check?access_key=${ipApiAccessKey}`);        
            let info = await response.json();
            console.log(info);
            return info;           
        } catch (err) {
            console.log(err);
        }
}

//getting info for user selected ip
async function getSetIpInfo(ip){
    try {
        const response = await fetch(`http://api.ipstack.com/${ip}?access_key=${ipApiAccessKey}`);
        let info = await response.json();
        console.log(info);
        return info;
    } catch (e) {
        console.log(e);
    }
}

//user input handling
const form = document.getElementById("search");
const userInput = document.getElementById("ip-input");
function validateUserInput(input){
    
    const ipv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6 = /^([0-9a-f]){1,4}(:([0-9a-f]){1,4}){7}$/i;
    if (ipv4.test(input)||(ipv6.test(input))){
        return true;
    }
    else {
        return false;
    }
    
}
// joiner function
// (used to sync getting user IP info with building a map based on that info)
async function joiner () {
    render(await getSetIpInfo(userInput.value));
}
//form submissin event
function handSubmission() {
    form.addEventListener("submit", e =>{
        e.preventDefault();
        if (validateUserInput(userInput.value)){ 
            joiner();
            console.log(userInput.value);     
        } else {
            openModal();
        }
    
    });
}

// modal window to alert the user of invalid input
function openModal(){
    alert("Invalid input");
}

// renders info from APIS into html
async function render(ipInfo){
    //html elements displaying the ip-adress info
    const   ipElement = document.getElementById("ip-adress"),
    country = document.getElementById("country"),
    city = document.getElementById("city"),
    zip = document.getElementById("zip");

    ipElement.innerHTML = ipInfo.ip;
    city.innerHTML = ipInfo.city;
    country.innerHTML = ipInfo.country_name;
    zip.innerHTML = ipInfo.zip;
  
    mymap.flyTo([ipInfo.latitude, ipInfo.longitude],13);
}
// main function
const  main = async ()=> {   
    render(await getUserIp());
    handSubmission();   
};

window.addEventListener(("DOMContentLoaded"),()=>{    
    // main();
});
