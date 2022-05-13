import {plantsWin, zombiesWin} from '/main.js'

const peashooterStr = "Peashooter", sunflowerStr ="Sunflower";
class Base {
    constructor (name,imgurl,isPlant){
        this.name = name;
        this.imgurl = imgurl;
        this.isPlant = isPlant || false;
    }
}

class Plant extends Base {
    constructor (name,imgurl,cost){
        super(name,imgurl,true);
        this.cost = cost;
    }
    canAttack = this.isPlant && this.name === peashooterStr;

}

class Zombie extends Base {
    constructor (name, imgurl, hits){
        super(name,imgurl);
        this.hits = hits;
    }
}

function populatePlants(app){
    //Plants
    //Sunflower is currently cosmetic
    const sunflower = new Plant(sunflowerStr, 'https://github.com/g0ld3nk1w1/sei36_project1/blob/main/images/sunflower.png',30);
    app.plantsAvail.push(sunflower);

    //Peashooter always hit once per day
    const peashooter = new Plant(peashooterStr, 'https://github.com/g0ld3nk1w1/sei36_project1/blob/main/images/peashooter.png',20);
    app.plantsAvail.push(peashooter);
}



function gamePlantInGarden(app, row, col) {
    if(app.selectedPlant !== null && app.garden[row][col] === null){
        app.garden[row][col] = app.selectedPlant;
        return true;
    } else return false;
}

function pressPlay(app){
    app.day += 1;
    app.coins += 10;
    attackingPhase(app);
    moveZombies(app);
    if(app.day === 1) generateZombie(app);

}


function checkEndGame(app) {
    //zombies found at col 0 locations
    let ended = false;
    for(let row = 0; row < app.garden.length; row++){
        if(app.garden[row][0] !== null && !app.garden[row][0].isPlant){
           app.endGameState = zombiesWin;
           ended = true;
           return;
        }
    }
    //Plants win scenario: no zombies, only plants.
    const flattenedGarden = app.garden.flat().filter(ele => ele !== null);
    ended = flattenedGarden.every(ele => ele.isPlant);
    if(app.day > 1 && ended) app.endGameState = plantsWin;

}

function banking(app, action){
    const search = app.plantsAvail.filter(element => element.name === app.selectedPlant.name);
    switch (action){
        case 'checkBuy':
            return app.coins >= search[0].cost;
            break;
        case 'deduct':
            app.coins -= search[0].cost;
            app.selectedPlant = null;
            break;
    }
}

function generateZombie(app){
   let numOfZombies = randNum();
   if(numOfZombies ===0) numOfZombies++;
    //pick a zombie, plant the zombie app.zombies
    // console.log('numOfZombies', numOfZombies);
    for (let i =1; i <= numOfZombies; i++ ){
        const row = randNum();
        app.garden[row][5] = new Zombie('basic_zombie', '/images/zombie_tutorial.png',2);
    }
}

function moveZombies(app){
    const containsZombie = app.garden.some((row) => {
        return row.some((item) => {
            if(item !== null) return !item.isPlant
            }
        )
    })
    if(containsZombie){
        //definitely can be optimized
        for (let row = 0; row <app.garden.length; row++){
            for(let col = 0; col < app.garden[row].length; col++){
                if(app.garden[row][col] !== null && !app.garden[row][col].isPlant){
                    const zom = app.garden[row][col];
                    if (zom !== null && zom.hits <=0){
                        //don't move. but remove later.
                    } else if(col > 0) app.garden[row][col-1] = zom;
                        app.garden[row][col] = null;
                }
            }
        }
    }
}

//Zombies and plants attack
function attackingPhase(app) {
    // console.log(app.garden);
  app.garden.forEach((row, rowIndex) => {
    const containsZombie = row.some((item) => {
      if (item !== null) return !item.isPlant;
    });
    const containsPeashooter = row.some((item) => {
      if (item !== null) return item.canAttack;
    });

    if(containsPeashooter && containsZombie){
        //find zombie
        const zombieIndex = row.findIndex(ele => ele!== null && !ele.isPlant);
        //find peashooters, every peashooter deduct zombie hit
        row.forEach((ele, index) => {
            if(ele !== null && ele.canAttack){
                if(index < zombieIndex-1){
                    app.garden[rowIndex][zombieIndex].hits--;
                }
            }
        })
    }
  });
}

const randNum = () => Math.floor(Math.random() * 5);


export {
    populatePlants,
    gamePlantInGarden,
    pressPlay,
    banking,
    checkEndGame
}