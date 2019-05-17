let lat;
let long;
navigator.geolocation.getCurrentPosition((res) => {
    let lat = res.coords.latitude;
    let long = res.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c48566402cc12bee720fb0f4c5585055`;
    fetch(url).then((res) => {
        return res.json();
    }).then((json) => {
        if (json.weather[0].main == "Rain") {
            $('.answer').text("Yes");
        } else {
            $('.answer').text("No");
        }
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
            $('.city-name').remove();
            newLat = e.latLng.lat()
            newLong = e.latLng.lng()
            newLatlng = {lat: newLat, lng: newLong};
            marker.setPosition(newLatlng);
            map.setCenter(marker.position);
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${newLat}&lon=${newLong}&appid=c48566402cc12bee720fb0f4c5585055`;
            fetch(url).then((res) => {
                return res.json();
            }).then((json) => {
                var name = json.name
                var nameDiv = $(`<div class=city-name>${name}</div>`)
                if (json.weather[0].main == "Rain") {
                    $('.answer').append(nameDiv)
                } else {
                    $('.answer').append(nameDiv)
                }
            });
        })
    })
}