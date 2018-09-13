export class Player {
   constructor(first_name, last_name, position){
       this.first_name = first_name;
       this.last_name = last_name;
       this.position = position;
    }
   }
  
  export class Team {
    constructor(goalkeeper, defenders, midfielders, forwards, formation){
      this.goalkeeper = goalkeeper;
      this.defenders = defenders;
      this.midfielders = midfielders;
      this.forwards = forwards;
      this.formation = formation;
    }
}