const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
let classes = require('./classes_server.js');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (request, response) => { response.sendFile(path.join(__dirname, '../public', 'index.html')) });
app.use(express.static('../public'))
app.use(express.static("."));


app.post('/submit', function (request, response) {
    teams = on_submit_request(request.body);
    response.json({
        teams: teams
    });
});
app.listen(8000, () => console.log('listening on port 8000...'));

function on_submit_request(players) {
    f_1 = exctrat_number_from_string(players.formation[0])
    f_2 = exctrat_number_from_string(players.formation[1])
    team_1 = new classes.Team([], [], [], [], f_1)
    team_2 = new classes.Team([], [], [], [], f_2)
    create_teams(players, team_1, team_2)
    let teams = [team_1, team_2]
    return teams
}


function create_teams(players, team_1, team_2) {
    let goalkeepers = []
    let defenders = []
    let midfielders = []
    let forwards = []
    for (let i = 0; i <= 21; i++) {
        switch (players.players[i].position) {
            case 'goalkeeper':
                goalkeepers.push(new classes.Player(players.players[i].first_name, players.players[i].last_name, players.players[i].position))
                break;
            case 'defender':
                defenders.push(new classes.Player(players.players[i].first_name, players.players[i].last_name, players.players[i].position))
                break;
            case 'midfielder':
                midfielders.push(new classes.Player(players.players[i].first_name, players.players[i].last_name, players.players[i].position))
                break;
            case 'forward':
                forwards.push(new classes.Player(players.players[i].first_name, players.players[i].last_name, players.players[i].position))
                break;
        }
    }
    shuffle_players(goalkeepers, defenders, midfielders, forwards, team_1, team_2)

}
function shuffle_players(goalkeepers, defenders, midfielders, forwards, team_one, team_two) {
    random_player(goalkeepers, team_one.goalkeeper, team_two.goalkeeper, "goalkeepers", team_one.formation, team_two.formation)
    random_player(defenders, team_one.defenders, team_two.defenders, "defenders", team_one.formation, team_two.formation)
    random_player(midfielders, team_one.midfielder, team_two.midfielder, "midfielders", team_one.formation, team_two.formation)
    random_player(forwards, team_one.forward, team_two.forward, "forwards", team_one.formation, team_two.formation)
    return
}

function random_player(arr_of_players, team_one_position, team_two_position, position, f1, f2) {
    let i = 0;
    let array_length = arr_of_players.length
    let max_number
    let index
    let player_in_index
    let max_players_in_position_1
    let max_players_in_position_2
    switch (position) {
        case 'goalkeepers':
            max_players_in_position_1 = 1
            max_players_in_position_2 = 1
            break;
        case 'defenders':
            max_players_in_position_1 = Number(f1[0])
            max_players_in_position_2 = Number(f2[0])
            break;
        case 'midfielders':
            max_players_in_position_1 = Number(f1[1])
            max_players_in_position_2 = Number(f2[1])
            break;
        case 'forwards':
            max_players_in_position_1 = Number(f1[2]) + ((isNaN(f1[3]) ? 0 : Number(f1[3])))
            max_players_in_position_2 = Number(f2[2]) + ((isNaN(f1[3]) ? 0 : Number(f2[3])))
            break;
    }

    for (let i = 0; i < array_length; i++) {
        max_number = arr_of_players.length
        index = Math.floor(Math.random() * max_number)
        player_in_index = arr_of_players[index]
        if (i % 2)
            if (max_players_in_position_1 > team_one_position.length)
                team_one_position.push(player_in_index)
            else
                team_two_position.push(player_in_index)
        else
            if (max_players_in_position_2 > team_two_position.length)
                team_two_position.push(player_in_index)
            else
                team_one_position.push(player_in_index)

        arr_of_players.splice(index, 1)
    }
    return
}

function exctrat_number_from_string(txt) {
    let numb = txt.match(/\d/g);
    numb = numb.join("");
    return numb;
}
