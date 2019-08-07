const proxy = 'https://cors-anywhere.herokuapp.com/';
let zone = document.querySelector('#zone'),
    f = document.querySelector('#f'),
    c = document.querySelector('#c'),
    summary = document.querySelector('#summary')
    daily = document.querySelector('#daily');
    /*clouds = document.querySelector('#clouds');*/
function getWeather(){
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      let long = position.coords.longitude,
          lat = position.coords.latitude,
          api = `https://api.darksky.net/forecast/2b2beb638caa3a6bcc01c69fb5c13eb7/${lat||42.3601},${long||-71.0589}`;
      fetch(`${proxy}${api}`)
        .then(data => data.json())
        .then((data) => {
        let icon = data.currently.icon.replace(/-/gim, '_').toUpperCase();
        zone.textContent = data.timezone;
        f.textContent = Math.round(data.currently.temperature) + ' °F';
        c.textContent = Math.round((data.currently.temperature - 32)/1.8 ) + ' °C';
        summary.textContent = data.currently.summary;
        daily.textContent = data.daily.summary;
        /*clouds.textContent += data.currently.cloudCover;*/
        var skycons = new Skycons({"color": "#fff"});
        skycons.add(document.getElementById("icon1"), Skycons[icon]);
        skycons.play();
      });
    })
  } else{
    window.alert('Sorry, your browser doesn\'t support this feature');
  }
}
window.addEventListener('load', getWeather());