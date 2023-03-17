const container = document.querySelector('.container');
const error = document.querySelector('.error');

let weather = {
    apiKey: "de173f5655c59715297df013dd125726",

    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city
            +"&units=imperial&appid="
            + this.apiKey
        )
        .then((response) => {
            if (!response.ok) {
                container.style.height = '380px';
                error.style.display = 'block';
                error.classList.add('fadeIn');
            }
            return response.json();
          })
          .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
        const {name} = data;
        const {icon, description} = data.weather[0];
        const {temp, humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".error").style.display = 'none';
        document.querySelector(".weather-box").style.scale ="1";
        document.querySelector(".weather-box").style.opacity ="1";
        document.querySelector(".weather-details").style.scale ="1";
        document.querySelector(".weather-details").style.opacity ="1";
        document.querySelector(".container").style.height = '310px';
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        document.querySelector(".temp").innerText = Math.round(temp) + "°F";
        document.querySelector(".description").innerText = description;
        document.querySelector(".humi").innerText = "Humidity: " + humidity + '%';
        document.querySelector(".speed").innerText = "Wind: " + Math.round(speed) + ' mph';

    },
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);

    },

    

};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });
