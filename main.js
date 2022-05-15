import "./style.css";

//create classes for plants, zombies?

//Testing
//Arrange (setup) Act (thing to test) Assert (verifying).

//another way to track: single array of objects, within objects track their co-ordinates.
//drawing = go through all the active elements, try to churn their location on the grid?

import {populatePlants,gamePlantInGarden, pressPlay, banking, checkEndGame} from  "./gameState"

const plantsWin = 'Plants', zombiesWin = 'Zombie';

const playGame = () => {
if(app.endGameState === zombiesWin){
    window.alert(`The zombies won on day ${app.day}!`);
    disablePlay();
    return;
  } else if (app.endGameState === plantsWin){
    window.alert(`The Plants won on day ${app.day}!`);
    disablePlay();
    return;
  }
  pressPlay(app);
  checkEndGame(app);
  renderAll();
}

const renderAll = () => {
  drawDateOnly();
  drawCoinsOnly();
  drawGarden();
}

const drawDateOnly = () => {
  const dayDiv = document.querySelector('.day');
  dayDiv.innerText = 'DAY ' + app.day;
}

const drawCoinsOnly = () => {
  const topDiv = document.querySelector('.coins');
  topDiv.innerText = app.coins + ' coins';
}

const disablePlay = () => {
  const button = document.querySelector('button');
  button.setAttribute('disabled', 'true');
}

const choosePlant = (row, col) => {
  //Check space is not occupied & coins > cost of plant
  if (banking(app,'checkBuy') && gamePlantInGarden(app, row, col)) {
    banking(app,'deduct');
    drawCoinsOnly();
    drawGarden();
  } else {
    window.alert("Unable to buy or space is occupied.");
  }
};

//Need to be able to draw zombiues also
const drawGarden = () => {
  const gardenDisplay = document.getElementsByClassName("garden")[0].childNodes;
  //node 0 is some text.
  for(let i = 1 ; i < gardenDisplay.length; i++) {
    //draw whatever is in the app.garden
    if(gardenDisplay[i].hasChildNodes()){
      gardenDisplay[i].removeChild(gardenDisplay[i].firstChild)
    }
    const cellRow = (gardenDisplay[i]).getAttribute('row');
    const cellCol = (gardenDisplay[i]).getAttribute('col');
    const tokenObj = app.garden[cellRow][cellCol];
    if( tokenObj != null && !gardenDisplay[i].hasChildNodes()){
      const img = document.createElement("img");
      img.setAttribute("src" , tokenObj.imgurl);
      gardenDisplay[i].appendChild(img);
    }
  }
 console.log(app.garden);
}

const generateGarden = () => {
  //5 row X 6 column
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 6; col++) {
      const gardenGrid = document.createElement("div");
      gardenGrid.setAttribute("row", row);
      gardenGrid.setAttribute("col", col);
      gardenGrid.classList.add("garden-grid-a");
      gardenGrid.onclick = (event) => {
        if(app.selectedPlant !== null && app.endGameState === null)
        choosePlant(event.target.getAttribute('row'), event.target.getAttribute('col'));
      };
      document.querySelector(".garden").appendChild(gardenGrid);
    }
  }
};

const generatePlants = () => {
  //Populate plants in game state.
  const plantsGrid = document.querySelector(".plants");
  app.plantsAvail.forEach((plantObj) => {
    const plantDiv = document.createElement("div");
    plantDiv.classList.add('plant-item');
    const plantImg = document.createElement("img");
    plantImg.setAttribute('src', plantObj.imgurl);
    plantImg.setAttribute('name', plantObj.name);
    plantDiv.appendChild(plantImg);
    const plantDesc = document.createElement("p");
    plantDesc.innerText = plantObj.name + '\n Cost: ' + plantObj.cost;
    plantDiv.appendChild(plantDesc);
    plantsGrid.appendChild(plantDiv);

    plantDiv.onclick = (event) => {
      app.selectedPlant = plantObj;
    }
  });
};

const app = {
  garden: [],
  day: 0,
  coins: 50,
  //Plant object in array.
  plantsAvail: [],
  selectedPlant: null,
  endGameState: null
};

const init = () => {
  const topDiv = document.querySelector('.coins');
  const coins = document.createTextNode(`${app.coins} coins`);
  topDiv.appendChild(coins);

  const dayDiv = document.querySelector('.day');
  const day = document.createTextNode(`DAY ${app.day}`);
  dayDiv.appendChild(day);

  const newArray = Array(6).fill(null);
  for (let i = 0; i < 5; i++){
    app.garden.push(newArray.slice(0));
  }

  const play = document.getElementsByClassName('play')[0];
  play.onclick = playGame;
  
  populatePlants(app);
  generateGarden();
  generatePlants();
  drawGarden();
}

init();

export {
  plantsWin,
  zombiesWin
}