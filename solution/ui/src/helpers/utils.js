
// Generate a random integer up to (not including) max
import {faker} from "@faker-js/faker";

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max))
}

function shuffle(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array
}

const getCard = () => {
  const firstName = faker.name.firstName()
  const lastName = faker.name.lastName()
  const imgNum = Math.floor(Math.random() * 12) + 1
  return {
    displayName: firstName + " " + lastName,
    division: faker.commerce.department() + " department",
    firstName: firstName,
    img: "/src/img/People and Skintones_Profile" + imgNum + ".jpg",
    jobTitle: faker.name.jobTitle(),
    lastName: lastName,
    location: "Fearless HQ",
    photoUrl: "/src/img/People and Skintones_Profile" + imgNum + ".jpg",
    preferredName: "",
    txt: firstName + " " + lastName
  }
}

export {
  shuffle,
  getRandomInt,
  getCard
}
