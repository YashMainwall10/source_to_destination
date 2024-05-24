const url_1 = "https://api.openweathermap.org/data/2.5/weather?q=" ;
const url_2 = "&appid=4f95a1ab02491334fdeeb8932c1ddaf8" ;
let city = "Mumbai" ;
let API_KEY = "4f95a1ab02491334fdeeb8932c1ddaf8";
let lat = 19.0760 ;
let  lng = 72.8777  ;
let ump = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&lang=en&units=metric`
// var polyline = require('polyline');

// returns an array of lat, lon pairs
// arr = polyline.decode("oalsBovy{LueacC`fo_[ie}uA_jo~^") ;
// arr.forEach(element => {
//     console.log(element);
// });

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&lang=en&units=metric`)
                            .then(response => response.json())
                            .then(data => {
                                console.log(data)
                            })
                            .catch(error => {
                                // Handle any errors here
                                console.error('Error fetching weather data:', error);
                            });

// fetch(ump).then(response => response.json())
// .then(data => {
//     // Handle the weather data here
//     // console.log(data.coord.lon);
//     // console.log(data.coord.lat) ;
//     console.log(data) ;
// })
// .catch(error => {
//     // Handle any errors here
//     console.error('Error fetching weather data:', error);
// });

// function toRadians(degrees) {
//     return degrees * Math.PI / 180;
// }

// function toDegrees(radians) {
//     return radians * 180 / Math.PI;
// }

// function midpoint(lat1, lon1, lat2, lon2 , n , arr) {
//     // Convert latitude and longitude from degrees to radians
//     if(n == 0)return ;
//     let latr1 = toRadians(lat1);
//     let lonr1 = toRadians(lon1);
//     let latr2 = toRadians(lat2);
//     let lonr2 = toRadians(lon2);

//     // Convert from spherical to Cartesian coordinates
//     const x1 = Math.cos(latr1) * Math.cos(lonr1);
//     const y1 = Math.cos(latr1) * Math.sin(lonr1);
//     const z1 = Math.sin(latr1);

//     const x2 = Math.cos(latr2) * Math.cos(lonr2);
//     const y2 = Math.cos(latr2) * Math.sin(lonr2);
//     const z2 = Math.sin(latr2);

//     // Compute the midpoint in Cartesian coordinates
//     const x_m = (x1 + x2) / 2;
//     const y_m = (y1 + y2) / 2;
//     const z_m = (z1 + z2) / 2;

//     // Convert back to spherical coordinates
//     const lon_m = Math.atan2(y_m, x_m);
//     const hyp = Math.sqrt(x_m * x_m + y_m * y_m);
//     const lat_m = Math.atan2(z_m, hyp);

//     // Convert the midpoint from radians back to degrees
//     midpoint(lat1 , lon1 , toDegrees(lat_m) , toDegrees(lon_m) , n-1 , arr) ;
//     midpoint(toDegrees(lat_m) , toDegrees(lon_m), lat2 , lon2 , n-1 , arr) ;
//     arr.push({
//          "lat" :toDegrees(lat_m),
//         "lng" :toDegrees(lon_m)
// }) ;
// }

// // Example usage
// const point1 = { "lat": 19.0760, "lng": 72.8777 }; // Mumbai
// const point2 = { "lat": 40.7128, "lng": -74.0060 }; //new york
// let arr = [] ;
// midpoint(point1.lat, point1.lng, point2.lat, point2.lng , 5 , arr);
// arr.unshift(point1) ;
// arr.push(point2) ;
// // console.log(`Midpoint Latitude: ${mid.lat}, Longitude: ${mid.lon}`);
// arr.forEach(element => {
//    console.log(element); 
// });
























// Mist	          
// Smoke    	
// Haze	    
// Dust	     	 
// Fog
// Sand	
// Dust	
// Ash	    
// Squall
// Tornado