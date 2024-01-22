console.log(getFav);
getFav.forEach(element => {
    const addCity = document.createElement("p")
    addCity.textContent = element
    addCity.classList.add("desc")
    cityList.appendChild(addCity)
    cityList.childElementCount >= 1 ? favText.remove() : null
});

const citylist2 = document.querySelectorAll(".city-list p")

