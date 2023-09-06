
async function search(test){
    var req= await fetch( `https://api.weatherapi.com/v1/forecast.json?key=fc63e69958b84cefad5164030232908&q=${test}&days=3&aqi=no&alerts=no`);

    if(req.ok && 400 != req.status ){
        var test = await req.json();
        displayCurrent(test.location, test.current),
        displayAnother(test.forecast.forecastday)
    }
}
document.getElementById("search").addEventListener("keyup", test=>{
    search(test.target.value)
});


var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function displayCurrent(test, req) {
        if (null != req) {
            var e = new Date(req.last_updated.replace(" ", "T"));
            let n = `<div class="today forecast col-md-4">
                <div class="forecast-header my-3 d-flex"  id="today">
                <div class="day">${days[e.getDay()]}</div>
                <div class=" date ms-auto">${e.getDate() + monthNames[e.getMonth()]}</div>
                </div>
                <div class="forecast-content justify-content-center align-items-center" id="current">
                <div class="location fs-4">${test.name}</div>
                <div class="degree fs-1 fw-bold text-white">
                <div class="num ">${req.temp_c}<sup>o</sup>C</div>
                                                      
                <div class="forecast-icon">
                <img src="https:${req.condition.icon}" alt="" width=90>
                </div>
                                                                                      
                </div>
                <div class="custom text-info">${req.condition.text}</div>
                <span><i class="fa-solid fa-umbrella mx-1"></i>20%</span>
                <span><i class="fa-solid fa-wind mx-1"></i>18km/h</span>
                <span><i class="fa-regular fa-compass mx-1"></i>East</span>
                </div>
                </div>`;
            document.getElementById("forecast").innerHTML = n
        }
}
function displayAnother(test) {
    let t = "";
    for (let e = 1; e < test.length; e++)
        t += `<div class="forecast  col-md-4">
        <div class="forecast-header my-3 w-100">
        <div class="day">${days[new Date(test[e].date.replace(" ", "T")).getDay()]}</div>
        </div>
        <div class="forecast-content justify-content-center">
        <div class="forecast-icon">
        <img src="https:${test[e].day.condition.icon}" alt="" width=48>
        </div>
        <div class="degree fw-bold fs-3 text-white">${test[e].day.maxtemp_c}<sup>o</sup>C</div>
        <small>${test[e].day.mintemp_c}<sup>o</sup></small>            
        <div class="custom text-info">${test[e].day.condition.text}</div>
        </div>                            
        </div>`

    document.getElementById("forecast").innerHTML += t;
    
}
search("cairo");


