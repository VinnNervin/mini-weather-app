// GLOBAL SELECTORS 
const btn = document.querySelector(".btn")
const inputValue = document.querySelector(".input")
const sideName = document.querySelector(".city-name")
const mainName = document.querySelector(".p-current")
const weather = document.querySelector(".weather-info")
const desc = document.querySelector(".weather-desc")
const temp = document.querySelector(".temp")
const wind = document.querySelector(".wind")
const time = document.querySelector(".times")
const tedency = document.querySelector(".tendecies")
const humidity = document.querySelector(".humidities")
const favCities = document.querySelector(".fav")
const moreData = document.querySelector(".more-data")

// FOR IMG
const imgW = document.querySelector(".img")
const imgT = document.querySelector(".img-T")
const imgWi = document.querySelector(".img-W")

//FOR SIDEBAR
const sideBar = document.querySelector(".side-bar")
const addBtn = document.querySelector(".add-btn")
const cityList = document.querySelector(".city-list")
const favText = document.querySelector(".fav-text")
const closeBtn = document.querySelector(".close")

//FOR HAMBURGER
const hamInner = document.querySelector(".hamburger-inner")
const hamburger = document.querySelector(".hamburger")

//FOR ERRORS
const errorDisplay = document.querySelector(".error-box")
const errortext = document.querySelector(".error-text")

//CITIES AND HISTORY
let cityName = ""
let cases = ""
let favHistory = []

//LOCAL STORAGE
let getFav = JSON.parse(localStorage.getItem('Favorite')) || [];
