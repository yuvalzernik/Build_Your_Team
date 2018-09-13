 class Team {
    constructor(goalkeeper, defenders, midfielder, forward, formation){
      this.goalkeeper = goalkeeper;
      this.defenders = defenders;
      this.midfielder = midfielder;
      this.forward = forward;
      this.formation = formation;
    }
    
   }
   class Player {
    constructor(first_name, last_name, position){
        this.first_name = first_name;
        this.last_name = last_name;
        this.position = position;
     }
    }
    module.exports = {
        Team : Team,
        Player : Player
      }
   
 
   
