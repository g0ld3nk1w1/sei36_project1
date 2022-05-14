# Project Post Mortem
## Approach and Process

###    What in my process and approach to this project would I do differently next time?
I think I will attempt to model the game using purely classes. Currently, I've used a 2D array to draw up the garden. If gameplay is all of the same properties; no water stream and etc. it is possible to plot coordinates within the base class.

###    What in my process and approach to this project went well that I would repeat next time?
Breaking problems into smaller problems, solving the smaller problems, making progress. Ultimately attempting to refactor into a better model.

<br>


## Code and Code Design

###    What in my code and program design in the project would I do differently next time?

``` javascript
const app = {
  garden: [],
  day: 0,
  coins: 50,
  //Plant object in array.
  plantsAvail: [],
...
```

garden being modeled as an array 

###    What in my code and program design in the project went well? Is there anything I would do the same next time?

```  javascript
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
```

Classes has made implementing different features easier.
<br>

## SEI Post Mortem

###    What habits did I use during this unit that helped me?
Instead of giving up on a feature, dial the complexity down.
###    What habits did I have during this unit that I can improve on?
The type of questions that should be tackled in the beginning and thought through. For e.g. Classes.
###    How is the overall level of the course during this unit? (instruction, course materials, etc.)
It was okay.