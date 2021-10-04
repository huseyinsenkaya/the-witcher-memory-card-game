const section = document.querySelector("section");
const playerMovesCount = document.querySelector(".playerLivesCount");
let playerMoves = 0;

//Display lives
playerMovesCount.textContent = playerMoves;

//Generate the images
const getData = () => [
  { imgSrc: "./images/ciri.jpeg", name: "ciri" },
  { imgSrc: "./images/gaunter.jpeg", name: "gaunter" },
  { imgSrc: "./images/geralt.jpeg", name: "geralt" },
  { imgSrc: "./images/jaskier.jpeg", name: "jaskier" },
  { imgSrc: "./images/olgierd.jpeg", name: "olgierd" },
  { imgSrc: "./images/triss.jpeg", name: "triss" },
  { imgSrc: "./images/vesemir.jpeg", name: "vesemir" },
  { imgSrc: "./images/yennefer.jpeg", name: "yennefer" },
];

const cardDataArr = [...getData(), ...getData()];

//Randomize
const randomize = () => {
  const cardData = cardDataArr;
  return cardData.sort(() => Math.random() - 0.5);
};

//Card Generator Function
const cardGenerator = () => {
  const cardData = randomize();

  cardData.forEach((item) => {
    //Generate the HTML
    const card = document.createElement("div");
    const face = document.createElement("img");
    const back = document.createElement("div");
    card.classList.add("card");
    face.classList.add("face");
    back.classList.add("back");

    //Attach the info to the cards
    face.src = item.imgSrc;
    card.setAttribute("name", item.name);

    //Attach the cards to the section
    section.appendChild(card);
    card.appendChild(face);
    card.appendChild(back);

    //Clicking the card
    card.addEventListener("click", (e) => {
      card.classList.toggle("toggleCard");
      checkCards(e);
    });
  });
};

//Check Cards
const checkCards = (e) => {
  const clickedCard = e.target;
  clickedCard.classList.add("flipped");
  const flippedCards = document.querySelectorAll(".flipped");
  const toggleCard = document.querySelectorAll(".toggleCard");

  if (flippedCards.length === 2) {
    const firstCard = flippedCards[0].getAttribute("name");
    const secondCard = flippedCards[1].getAttribute("name");

    if (firstCard === secondCard) {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        card.style.pointerEvents = "none";
      });
    } else {
      flippedCards.forEach((card) => {
        card.classList.remove("flipped");
        setTimeout(() => {
          card.classList.remove("toggleCard");
        }, 1500);
      });
    }

    //Increasing the moves
    playerMoves++;
    playerMovesCount.textContent = playerMoves;
  }
};

//Restart the Game
const restart = () => {
  const cardData = randomize();
  const cards = document.querySelectorAll(".card");
  const face = document.querySelectorAll(".face");
  section.style.pointerEvents = "none";
  cards.forEach((item, index) => {
    item.classList.remove("toggleCard");

    setTimeout(() => {
      item.style.pointerEvents = "auto";
      face[index].src = cardData[index].imgSrc;
      item.setAttribute("name", cardData[index].name);
      section.style.pointerEvents = "all";
    }, 1500);
  });
  playerMoves = 0;
  playerMovesCount.textContent = playerMoves;
};

cardGenerator();
