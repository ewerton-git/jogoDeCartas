const state ={
    score:{
        playerScore: 0,
        computerScores: 0,
        scoreBox: document.getElementById('scorePoints'),
    },

    cardSprites:{
        avatar: document.getElementById("cardImage"),
        name: document.getElementById("cardName"),
        type: document.getElementById("ccardType"),
    },

    fieldCards:{
        player: document.getElementById("playerFieldCard"),
        computer: document.getElementById("computerFieldCard"),
    },
    actions: {
        button: document.getElementById("nextDuel"),
    },
};

const playerSides = {
    player1: "playerCards",
    compueter: "computerCards",
}

const patchImages = "./src/assets/icons/";
const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${patchImages}dragon.png`,
        winOf: [1],
        LoseOf: [2],
    },
    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${patchImages}magician.png`,
        winOf: [2],
        LoseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${patchImages}exodia.png`,
        winOf: [0],
        LoseOf: [2],
    },

async function drawCards(cardNumbers, fieldSide){
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage);
    };
}
]   
 async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
 }


async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("dataId", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("click", ()=>{
            setCarsField(cardImage.getAttribute("dataId"))
        });

        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(IdCard);
        });
    };

    return cardImage;
};

async function setCarsField(cardId){
    await removeAllCardsImage();

    let computerCardId = await getRandomCardId();

    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults =  await chekDuelResults(cardId, computerCardId);

    await updateScores();
    await drawButton(duelResults);

};

async function drawButton(text) {
    state.actions.button.innerText = text;
    state.actions.button.style.display = "block";
}

async function updateScores() {
    state.score.scoreBox.innerText = `Wind: ${state.score.playerScore} | Lose: ${state.score.computerScores}`;
}

async function chekDuelResults(playerCardId, computerCardId){
    let duelResults = "Empate"
    let playerCard = cardData[playerCardId];

    if(playerCard.winOf.includes(computerCardId)){
        duelResults = "Ganhou"
        state.score.playerScore++;
    }
    if(playerCard.LoseOf.includes(computerCardId)){
        duelResults = "Perdeu";
        state.score.computerScores++;
    }

    return duelResults;
};

async function removeAllCardsImage(){
    let cards = document.querySelector(".cardBox.framed#computerCards")
    let imgElements = cards.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());

    cards = document.querySelector(".cardBox.framed#playerCards")
    imgElements = cards.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());
}

async function drawSelectCard(index){
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute :" + cardData[index].type;
}



 async function drawCards(cardNumbers, fieldSide){
    for (let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);

        document.getElementById(fieldSide).appendChild(cardImage)
    };
 };


async function resetDuel(){
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.compueter);
}
init();