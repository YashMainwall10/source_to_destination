// const url = "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}"
const url_1 = "https://api.openweathermap.org/data/2.5/weather?q=" ;
const url_2 = "&appid=4f95a1ab02491334fdeeb8932c1ddaf8" ;
let map;
let check = false ;
let API_KEY = "4f95a1ab02491334fdeeb8932c1ddaf8";

let colors = {
    "Clouds": "#778899", 
    "Clear": "#87CEEB",       // Light Blue
    "Few Clouds": "#B0E0E6",      // Powder Blue
    "Scattered Clouds": "#ADD8E6", // Light Sky Blue
    "Broken Clouds": "#B0C4DE",   // Light Steel Blue
    "Shower Rain": "#4682B4",     // Steel Blue
    "Rain": "#1E90FF",            // Dodger Blue
    "Thunderstorm": "#000080",    // Navy
    "Snow": "#FFFAFA",            // Snow (White)
    "Mist": "#778899",            // Light Slate Gray
    "Smoke": "#696969",           // Dim Gray
    "Haze": "#708090",            // Slate Gray
    "Dust": "#D3D3D3",            // Light Gray
    "Fog": "#C0C0C0",             // Silver
    "Sand": "#EDC9AF",            // Desert Sand
    "Ash": "#A9A9A9",             // Dark Gray
}
function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function midpoint(lat1, lon1, lat2, lon2 , n , arr) {
    // Convert latitude and longitude from degrees to radians
    if(n == 0)return ;
    let latr1 = toRadians(lat1);
    let lonr1 = toRadians(lon1);
    let latr2 = toRadians(lat2);
    let lonr2 = toRadians(lon2);

    // Convert from spherical to Cartesian coordinates
    const x1 = Math.cos(latr1) * Math.cos(lonr1);
    const y1 = Math.cos(latr1) * Math.sin(lonr1);
    const z1 = Math.sin(latr1);

    const x2 = Math.cos(latr2) * Math.cos(lonr2);
    const y2 = Math.cos(latr2) * Math.sin(lonr2);
    const z2 = Math.sin(latr2);

    // Compute the midpoint in Cartesian coordinates
    const x_m = (x1 + x2) / 2;
    const y_m = (y1 + y2) / 2;
    const z_m = (z1 + z2) / 2;

    // Convert back to spherical coordinates
    const lon_m = Math.atan2(y_m, x_m);
    const hyp = Math.sqrt(x_m * x_m + y_m * y_m);
    const lat_m = Math.atan2(z_m, hyp);

    // Convert the midpoint from radians back to degrees
    midpoint(lat1 , lon1 , toDegrees(lat_m) , toDegrees(lon_m) , n-1 , arr) ;
    midpoint(toDegrees(lat_m) , toDegrees(lon_m), lat2 , lon2 , n-1 , arr) ;
    arr.push({
         "lat" :toDegrees(lat_m),
        "lng" :toDegrees(lon_m)
}) ;
}

async function initMap() {
            var input1 = document.createElement('input');
            input1.type = 'text';
            input1.name = 'input1';
            input1.placeholder = 'Enter text here';
            
            // Create the second input field
            var input2 = document.createElement('input');
            input2.type = 'text';
            input2.name = 'input2';
            input2.placeholder = 'Enter more text here';
            
            // Append the input fields to the body of the document
            document.body.appendChild(input1);
            document.body.appendChild(input2);

            const { Map, InfoWindow } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
              "marker",
            );

    const map = new Map(document.getElementById("map"), {
      center: { lat: 28.7041 , lng: 77.1025 },
      zoom: 6,
      mapId: "4504f8b37365c3d0",
    });
    
        document.getElementById("btn").addEventListener("click" , ()=>{
                let a = document.getElementById("input1").value;
                let b = document.getElementById("input2").value;
                // let city = "Mumbai" ;

                let lt1 , lt2 , long1, long2 ;

                    
                

                fetch(url_1+a+url_2).then(async response => response.json())
                .then(data => {
                    // Handle the weather data here
                    // console.log(data);
                    lt1 = data.coord.lat ;
                    long1 = data.coord.lon ;
                })
                .then(()=>{
                    fetch(url_1+b+url_2).then(async response => response.json())
                    .then(data => {
                        // Handle the weather data here
                        // console.log(data);
                        lt2 = data.coord.lat ;
                        long2 = data.coord.lon ;
                        let arr = [] ;
                        midpoint(lt1 , long1 , lt2, long2 , 4 , arr) ;
                        arr.push({"lat" : lt2 , "lng" : long2}) ;
                        arr.unshift({"lat" : lt1 , "lng" : long1}) ;

                        
             
                        const infoWindow = new InfoWindow();
                        let i = 0 ;
                        // Create the markers.
                        arr.forEach(position => {
                              
                            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${API_KEY}&lang=en&units=metric`)
                            .then(response => response.json())
                            .then(data => {
                                // console.log(data) ;
                                let temp_arr = "unknown" ;
                                let weather_cond = data.weather[0].main ;
                                console.log(weather_cond) ;

                                let image = document.createElement("img");
                                image.style.width = "70px" ;
                                image.style.height = "70px" ;
                                image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                                // let color = "#FF0000" ;
                                // if(data.main.temp > 20)color = "#FBBC04" ;
                                if(data.name != "")temp_arr = data.name ;
                                // console.log(temp_arr) ;
                                const pin = new PinElement({
                                    glyph: image ,
                                    scale: 2,
                                    background: colors[weather_cond],
                                });
                                const marker = new AdvancedMarkerElement({
                                    position,
                                    map,
                                    title: temp_arr + ` , ${data.weather[0].main} , ${data.main.temp} °C`,
                                    content: pin.element ,
                                    // icon : image ,
                                    gmpClickable: true,
                                });
    
                                // Add a click listener for each marker, and set up the info window.
                                marker.addListener("click", ({ domEvent, latLng }) => {
                                    const { target } = domEvent;
    
                                    infoWindow.close();
                                    infoWindow.setContent(marker.title);
                                    infoWindow.open(marker.map, marker);
                                });

                                line = new google.maps.Polyline({
                                    path: arr,
                                    strokeColor: "#0000FF",
                                    strokeOpacity: 1.0,
                                    strokeWeight: 4,
                                    geodesic: true,
                                    map: map
        
                                })
                                line.setMap(Map)   ;
                            })
                            .catch(error => {
                                // Handle any errors here
                                console.error('Error fetching weather data:', error);
                            });
                        });
                        
                        return arr ;

                    })
                //     .then(arr =>{
                //         line = new google.maps.Polyline({
                //             path: arr,
                //             strokeColor: "#0000FF",
                //             strokeOpacity: 1.0,
                //             strokeWeight: 4,
                //             geodesic: true,
                //             map: map

                //         })
                //         line.setMap(Map)   ;     
                // })
                .catch(error => {
                    // Handle any errors here
                    console.error('Error fetching weather data:', error);
                });
           
                
            });
            
            
                        
           
            
        })
            
        
    
  }


  window.initMap = initMap;



 