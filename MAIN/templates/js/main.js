// GitHub repo - 'countrylist.js'
// Author - Nitin Nair
// Repo URL - https://github.com/nitin9nair/countrylist.js
// Date Created - 20/Feb/2019

// global variables
// get the dropdown reference in js
let countrySelector = document.getElementById("countrySelector");
let stateSelector = document.getElementById("stateSelector");
let citySelector = document.getElementById("citySelector");

// get selected values of all dropdowns
let countrySelected = document.getElementById("countrySelector").value;
let stateSelected = document.getElementById("stateSelector").value;
let citySelected = document.getElementById("citySelector").value;

// displaying selected values in template
let displayCountry = document.getElementById("displayCountry");
let displayState = document.getElementById("displayState");
let displayCity = document.getElementById("displayCity");

// get total countries
let totalCountries = Object.keys(countrylist).length;
console.log(totalCountries); // 247

//default disabled select dropdown
stateSelector.disabled = true;
citySelector.disabled = true;

// displaying list of all countries on load
for (let x = 0; x < totalCountries; x++) {
  let optCountry = document.createElement("option");
  optCountry.value = countrylist[x].name;
  optCountry.textContent = countrylist[x].name;
  countrySelector.appendChild(optCountry);
}

// function to select a country
function selectCountry() {
  let countrySelected = document.getElementById("countrySelector").value;
  displayCountry.textContent = countrySelected;

  // displaying state dropdown default values and disabling if country is changes
  if (stateSelector.childElementCount > 1) {
    stateSelector.length = 1;

    let optState = document.createElement("options");
    optState.value = "default";
    optState.disabled = true;
    optState.textContent = "Select State";
    stateSelector.selectedIndex = 0;
    stateSelector.appendChild(optState);
    displayState.textContent = null;
  }

  // displaying city dropdown default values and disabling if country is changes
  if (citySelector.childElementCount > 1) {
    citySelector.length = 1;

    let optCity = document.createElement("options");
    optCity.value = "default";
    optCity.disabled = true;
    optCity.textContent = "Select City";
    citySelector.selectedIndex = 0;
    citySelector.appendChild(optCity);
    citySelector.disabled = true;
    displayCity.textContent = null;
  }

  // generating states based on selected country
  generateStates(countrySelected);
}

// function to generate list of all states based on selected country
function generateStates(selectedCountry) {
  let stateSelector = document.getElementById("stateSelector");

  for (let x = 0; x < totalCountries; x++) {
    if (selectedCountry === countrylist[x].name) {
      // check whether the country has a state or not
      if (countrylist[x].hasOwnProperty("states")) {
        stateSelector.disabled = false;
        for (let y = 0; y < Object.keys(countrylist[x].states).length; y++) {
          // generating state options for state dropdown
          let optState = document.createElement("option");
          optState.value = Object.keys(countrylist[x].states)[y];
          optState.textContent = Object.keys(countrylist[x].states)[y];
          stateSelector.appendChild(optState);
        }
      } else {
        // disabling state if there is no state for a selected country
        stateSelector.disabled = true;
        citySelector.disabled = true;
        citySelector.length = 1;

        let optState = document.createElement("options");
        optState.value = "default";
        optState.textContent = "Select State";
        stateSelector.selectedIndex = 0;
        stateSelector.appendChild(optState);
        displayState.textContent = null;

        let optCity = document.createElement("options");
        optCity.value = "default";
        optCity.textContent = "Select City";
        citySelector.selectedIndex = 0;
        citySelector.appendChild(optCity);
        displayCity.textContent = null;
      }
    }
  }
}

// function to display the selected state
function selectState() {
  let stateSelected = document.getElementById("stateSelector").value;
  displayState.textContent = stateSelected;

  // disabling city dropdown if selected state is changed
  if (citySelector.childElementCount > 1) {
    citySelector.length = 1;

    let optCity = document.createElement("options");
    optCity.value = "default";
    optCity.textContent = "Select City";
    citySelector.selectedIndex = 0;
    citySelector.appendChild(optCity);
    displayCity.textContent = null;
  }

  // generating cities based on selected state
  generateCities(stateSelected);
}

// function to generate the cities based on selected state
function generateCities(selectedState) {
  let citySelector = document.getElementById("citySelector");

  for (let x = 0; x < totalCountries; x++) {
    let selectedCountry = document.getElementById("countrySelector").value;

    if (selectedCountry === countrylist[x].name) {
      // check if country has states
      if (countrylist[x].hasOwnProperty("states")) {
        stateSelector.disabled = false;

        for (let y = 0; y < Object.keys(countrylist[x].states).length; y++) {
          if (selectedState === Object.keys(countrylist[x].states)[y]) {
            citySelector.disabled = false;
            for (
              let z = 0;
              z < Object.values(countrylist[x].states)[y].length;
              z++
            ) {
              let opt = document.createElement("option");
              opt.value = Object.values(countrylist[x].states)[y][z];
              opt.textContent = Object.values(countrylist[x].states)[y][z];
              citySelector.appendChild(opt);
            }
          }
        }
      } else {
        citySelector.disabled = true;
      }
    }
  }
}

// function to display the selected city
function selectCity() {
  let citySelected = document.getElementById("citySelector").value;
  displayCity.textContent = citySelected;
}

// reset the all dropdowns
function resetDropdown() {
  // resetting the country dropdown
  countrySelector.selectedIndex = 0;
  displayCountry.textContent = null;

  // resetting the state dropdown
  stateSelector.selectedIndex = 0;
  stateSelector.length = 1;
  stateSelector.disabled = true;
  displayState.textContent = null;

  // resetting the city dropdown
  citySelector.selectedIndex = 0;
  citySelector.length = 1;
  citySelector.disabled = true;
  displayCity.textContent = null;
}
