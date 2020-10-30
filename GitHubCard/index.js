/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
import axios from 'axios';

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function
    ✅ 
    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

// Solved With Hard Coded Array
// const followersArray = [
//   "Scott-Buttocolla",
//   "Stone98",
//   "c-melchor",
//   "katieolson84",
//   "AgentSamSA",
//   "TreywRoberts",
//   "JuniorDugue",
//   "CerritoCode0101",
//   "Diegormnv",
//   "ahmedseragcodes",
//   "juancaruizc",
//   "atcriteria"
// ];

// followersArray.forEach((data) => {
//   axios
//     .get('https://api.github.com/users/' + data)
//     .then((futureData) => {
//       const gitHubInfo = futureData.data;
//       cards.appendChild(makeCard(gitHubInfo));
//     })
//     .catch((err) => {
//       console.log("Something went wrong", err);
//     })
// });

// Solved Programmatically
axios
  .get('https://api.github.com/users/joshuasamaniego/followers')
  .then((res) => {
    const followerObjects = res.data;
    followerObjects.forEach((objects) => {
      console.log(objects);
      const followerCard = objects.url;
      axios
        .get(`${followerCard}`)
        .then((res) => {
          const followerData = res.data;
          console.log(followerData);
          cards.appendChild(makeCard(followerData));
        })
        .catch((err) => {
          console.log('Something went wrong', err)
        })
      
    })
  })
  .catch((err) => {
    console.log('Something went wrong', err);
  }) 

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
const cards = document.querySelector('.cards'); 

function makeCard(object) {
  // Create Elements 
  const card = document.createElement('div');
  const image = document.createElement('img');
  const cardInfo = document.createElement('div');
  const usersName = document.createElement('h3');
  const usersUsername = document.createElement('p');
  const usersLocation = document.createElement('p');
  const profile = document.createElement('p');
  const profileAddress = document.createElement('a');
  const usersFollowers = document.createElement('p');
  const usersFollowing = document.createElement('p');
  const usersBio = document.createElement('p');
  // Create DOM Tree/Heirarchy
  card.appendChild(image);
  card.appendChild(cardInfo);
  cardInfo.appendChild(usersName);
  cardInfo.appendChild(usersUsername);
  cardInfo.appendChild(usersLocation);
  cardInfo.appendChild(profile);
  profile.appendChild(profileAddress);
  cardInfo.appendChild(usersFollowers);
  cardInfo.appendChild(usersFollowing);
  cardInfo.appendChild(usersBio);
  console.log(card);
  // Setting attributes, text and then class names
  image.src = object.avatar_url;
  usersName.textContent = object.name;
  usersUsername.textContent = object.login;
  usersLocation.textContent = `Location: ${object.location}`;
  profileAddress.setAttribute('href', object.html_url);
  profileAddress.textContent = object.html_url;
  profile.textContent = `Profile: ${object.html_url}`;
  usersFollowers.textContent = `Followers: ${object.followers}`;
  usersFollowing.textContent = `Following: ${object.following}`;
  usersBio.textContent = `Bio: ${object.bio}`;
        // Class Names
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  usersName.classList.add('name');
  usersUsername.classList.add('username');
  // Return Statement
  return card;

}

axios
  .get("https://api.github.com/users/joshuasamaniego")
  .then((res) => {
    const info = res.data;
    const maker = makeCard(info);
    cards.appendChild(maker);
  })
  .catch((err) => {
    console.log('something went wrong', err);
  })