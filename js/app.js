const API_KEY = config.API_KEY;
let jam, menits;
btn.addEventListener("click", checkData)
addBtn.addEventListener("click", createFav)
inputValue.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        checkData()
    }
})

checkData()


// FUNCTION
function checkData() {
    if (inputValue.value.trim() === "") {
        console.log("type a city name")
        cases = "type a city name";
        error()
    } else { configData() }
}

async function configData() {
    try {
        const respone = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputValue.value}&appid=${API_KEY}`)
        const data = await respone.json()
        console.log(data);
        inputValue.value = "";
        cityName = `${data.name}`

        if (data.cod === '404') {
            console.log(data.message);
            cases = data.message
            error()
        } else {
            setData()
        }

        function konversi(menit) {
            if (menit < 0) {
                jam = 24
                menits = 60
                jam += Math.floor(menit / 60);
                menits += menit % 60;
                console.log(jam + " " + menits);
                time.textContent = `${jam}:${menits}`
            } else {
                // console.log(menit);
                jam = Math.floor(menit / 60);
                menits = menit % 60;
                // console.log(jam + " " + menits);
                time.textContent = `${jam}:${menits}`
            }
        }

        function set_UTC() {
            const getLclHour = new Date().getHours() * 60
            const getLclMinute = new Date().getMinutes()
            const addToMinute = getLclHour + getLclMinute
            const getLcl_UTC = new Date().getTimezoneOffset()
            const minutePlusUTC = addToMinute + getLcl_UTC
            const getOtherUTC = data.timezone / 60
            const baru = minutePlusUTC + getOtherUTC
            konversi(baru)
        }

        function setData() {
            let tempConvert = Math.floor(data.main.temp - 273);
            sideName.textContent = `${cityName} , ${data.sys.country}`
            mainName.textContent = `current weather in ${cityName}`
            temp.textContent = `${tempConvert}°C`
            wind.textContent = `${data.wind.speed} m/s`
            weather.textContent = `weather : ${data.weather[0].main}`
            desc.textContent = `condition : ${data.weather[0].description}`
            tedency.textContent = `${data.clouds.all} %`
            humidity.textContent = `${data.main.humidity} %`
            set_UTC()
        }

        console.log(jam);
        console.log(data.weather[0].description + " deskripsi ");
        console.log(data.weather[0].main + " weather ");

        if (jam > 12 && jam < 18) {
            console.log("day");

            if (data.weather[0].main == "Clear") {
                imgW.src = "img/asset/clear.png"

            } else if (data.weather[0].main == "Clouds") {
                if (data.weather[0].description === "broken clouds" | "overcast clouds") {
                    imgW.src = "img/asset/more-cloud-day.png"
                } else {
                    imgW.src = "img/asset/cloudy-day.png"
                }

            } else if (data.weather[0].main === "Rain") {

                if (data.weather[0].description === "extreme rain" | "light intensity shower rain" | "shower rain" | "heavy intensity shower rain" | "ragged shower rain") {
                    imgW.src = "img/asset/shower-rain.png"
                } else {
                    imgW.src = "img/asset/rain.png"
                }

            } else if (data.weather[0].main === "Drizzle") {
                imgW.src = ".img/asset/rain.png"

            } else if (data.weather[0].main === "Snow") {
                imgW.src = ".img/asset/snow.png"
            }

        } else {
            console.log("night");
            if (data.weather[0].main == "Clear") {
                imgW.src = "img/asset/moon.png"
            } else if (data.weather[0].main == "Clouds") {
                imgW.src = "img/asset/cloudy-night.png"
            }
        }


    }
    catch (err) {
        console.log("catch error, error execution")
    }
}

function createFav() {
    //jika favhistory memiliki kesamaan 
    if (inputValue.value.trim() === "" | undefined) {
        cases = "no city have added"
        error()
    } else {
        if (favHistory.includes(cityName)) {
            console.log(cityName + " already added");
            cases = `${cityName} already added`
            error()
        } else {
            console.log(cityName + " added");
            favHistory.push(cityName)
            const addCity = document.createElement("p")
            addCity.textContent = cityName
            addCity.classList.add("desc", "fav")
            cityList.appendChild(addCity)
        }
    }

    if (cityList.childElementCount = 2) {
        favText.remove()
    }
}

//FOR ERROR
function error() {
    errortext.textContent = `${cases} `
    errorDisplay.classList.add("visible")
    setTimeout(() => {
        errorDisplay.classList.remove("visible")
    }, 2000);
}


//FOR SIDE BAR AND BURGER
hamburger.addEventListener("click", () => {
    hamburger.classList.add("is-active")
    sideBar.classList.add("side-active")

})

closeBtn.addEventListener("click", () => {
    sideBar.classList.remove("side-active")
    hamburger.classList.remove("is-active")

})



/* 
            }*/