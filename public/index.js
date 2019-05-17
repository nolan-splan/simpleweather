let lat;
let long;
navigator.geolocation.getCurrentPosition((res) => {
    console.log(res);
    let lat = res.coords.latitude;
    let long = res.coords.longitude;
    console.log(lat);
    console.log(long);
    // let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c48566402cc12bee720fb0f4c5585055`;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=42.6526&lon=73.7562&appid=c48566402cc12bee720fb0f4c5585055`;
    
    
    fetch(url).then((res) => {
        return res.json();
    }).then((json) => {
        if (json.weather[0].main == "Rain") {
            $('.answer').text("Yes");
        } else {
            $('.answer').text("No");
        }
        console.log(json);
        console.log(json.name)
    })
})

var map;
var myLatlng;
function initMap() {
    navigator.geolocation.getCurrentPosition((res) => {
        let lat = res.coords.latitude;
        let long = res.coords.longitude;
        myLatlng = {lat: lat, lng: long};
        map = new google.maps.Map(document.getElementById('map'), {
            center: myLatlng,
            zoom: 8
        });
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
        });
        map.addListener('click', (e) => {
            
            newLat = e.latLng.lat()
            newLong = e.latLng.lng()
            console.log(newLat);
            console.log(newLong);
            newLatlng = {lat: newLat, lng: newLong};
            marker.setPosition(newLatlng);
            map.setCenter(marker.position);
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${newLat}&lon=${newLong}&appid=c48566402cc12bee720fb0f4c5585055`;
            fetch(url).then((res) => {
                return res.json();
            }).then((json) => {
                if (json.weather[0].main == "Rain") {
                    $('.answer').before(`${json.name}`).text("Yes");
                } else {
                    $('.answer').before(`${json.name}`).text("No");
                }
                console.log(json);
                console.log(json.name)
            })
            // var newMarker = new google.maps.Marker({
            //     position: newLatlng,
            //     map: map
            // })

            // map.setCenter(new google.maps.LatLng(newLat, newLong));
        })
    })
}