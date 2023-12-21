let isDay = ""

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
        cityName = `${data.name}`
        let tempConvert = 0


        if (data.cod === '404') {
            console.log(data.message);
            cases = data.message
            error()
        } else {
            setData()
            inputValue.value = "";
        }

        function konversi(menit) {
            // if (menit < 0) {
            //     jam = 24
            //     menits = 60
            //     jam += Math.floor(menit / 60);
            //     menits += menit % 60;
            //     console.log(jam + " " + menits);
            //     time.textContent = `${jam}:${menits}`
            // } else {
            //     // console.log(menit);
            //     jam = Math.floor(menit / 60);
            //     menits = menit % 60;
            //     // console.log(jam + " " + menits);
            //     time.textContent = `${jam}:${menits}`
            // }


            jam = Math.floor(menit / 60);
            menits = menit % 60;

            if (jam > 23) {
                jam = jam % 24;
            } else if (jam < 0) {
                jam = jam + 24
            }

            if (menits < 0) {
                menits += 60
            }

            let jamformat = jam < 0 ? `0${jam}` : jam
            let menitFormat = menits < 10 & menits > 0 ? `0${menits}` : menits
            time.textContent = `${jamformat}:${menitFormat}`

        }



        if (jam > 0 && jam < 18) {
            isDay = true;
        } else {
            isDay = !isDay;
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
            tempConvert = Math.floor(data.main.temp - 273);
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

        if (data.weather[0].main == "Clear") {
            imgW.src = `img/asset/clear-${isDay}.png`
        } else if (data.weather[0].main == "Clouds") {
            if (data.weather[0].description === "scattered clouds" | "few clouds") {
                imgW.src = `img/asset/cloudy-${isDay}.png`
            } else {
                imgW.src = `img/asset/more-cloud-${isDay}.png`
            }
        } else if (data.weather[0].main === "Rain") {
            if (data.weather[0].description === "extreme rain" | "light intensity shower rain" | "shower rain" | "heavy intensity shower rain" | "ragged shower rain") {
                imgW.src = `img/asset/shower-rain.png`
            } else if (data.weather[0].description === "freezing rain") {
                imgW.src = `img/asset/snow.png`
            } else {
                imgW.src = `img/asset/rain.png`
            }
        } else if (data.weather[0].main === "Drizzle") {
            imgW.src = "img/asset/rain.png"

        } else if (data.weather[0].main === "Snow") {
            imgW.src = "img/asset/snow.png"
        } else {
            imgW.src = `img/asset/clear-${isDay}.png`
        }

        if (tempConvert > 30) {
            imgT.src = "img/asset/over.png"
        } else if (tempConvert > 0) {
            imgT.src = "img/asset/mid.png"
        } else {
            imgT.src = "img/asset/cold.png"
        }

        // console.log(jam);
        // console.log(data.weather[0].description + " deskripsi ");
        // console.log(data.weather[0].main + " weather ");

    }
    catch (err) {
        console.log("catch error, error execution")
    }
}

function createFav() {
    //jika favhistory memiliki kesamaan 
    if (cityName === "") {
        cases = "no city have added! "
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
