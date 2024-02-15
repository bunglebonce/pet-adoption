const template = document.querySelector("#pet-card-template");
const wrapper = document.createDocumentFragment();

async function start() {
  const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast");
  const weatherData = await weatherPromise.json();
  const ourTemperature = weatherData.properties.periods[0].temperature;
  document.querySelector("#temperature-output").textContent = ourTemperature;
}

start();

async function petsArea() {
  const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json");
  const petsData = await petsPromise.json();
  petsData.forEach(pet => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector(".pet-description").textContent = pet.description;
    clone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear);

    if (!pet.photo) pet.photo = "images/fallback.jpg";

    clone.querySelector(".pet-card-photo img").src = pet.photo;
    clone.querySelector(".pet-card-photo img").alt = `A ${pet.species} called ${pet.name}`
    clone.querySelector(".pet-card-photo img").title = `This is an image of the ${pet.species} named ${pet.name}. He is ${clone.querySelector(".pet-age").textContent}.`;
    wrapper.appendChild(clone);
  });

  document.querySelector(".list-of-pets").appendChild(wrapper);
}

petsArea();


function createAgeText(birthYear) {
  const thisYear = new Date().getFullYear();
  const age = thisYear - birthYear;

  if (age == 1) return "1 Year Old";
  if (age == 0) return "Less Than A Year Old";
  return `${age} Years Old`;
}

//pet filter button code
const allButtons = document.querySelectorAll(".pet-filter button")

allButtons.forEach(el => {
  el.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e) {
  //remove active class from any and all buttons
  allButtons.forEach(el => el.classList.remove("active"))

  //add active class to button that has just been clicked
  e.target.classList.add("active")

  //filter the pets shown based on the button just clicked
}