import { Player } from './classes.js';
import { Team } from './classes.js';

var x = document.getElementById("btn");
x.addEventListener("click", on_submit);

for (let i = 0; i <= 21; i++) {
    document.getElementById("body").innerHTML += "<tr><td><input type='text' name='firstname' id='f" + i + "'></td><td><input type='text' name='lastname' id='l" + i + "'></td><td>  <select name='positions' id='p" + i + "'><option value='goalkeeper'>Goalkeeper</option><option value='defender'>Defender</option><option value='midfielder'>Midfielder</option><option value='forward'>Forward</option></select></td></tr>";
}

function on_submit() {
    let jso = {
        "players": [],
        "formation": []
    }
    extract_data_and_create_json_of_players(jso)


    if (create_players(jso.players, jso.formation[0], jso.formation[1])) {
        document.getElementById("formation_team_1_image").src = "public/images/" + jso.formation[0] + ".png";
        document.getElementById("formation_team_2_image").src = "public/images/" + jso.formation[1] + ".png";
        let myJSON = JSON.stringify(jso);
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/submit', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let teams = JSON.parse(xhr.response)
                document.getElementById('team_one').setAttribute("class", "team")
                document.getElementById('team_two').setAttribute("class", "team")
                insert_players_to_HTML_list(teams.teams[0], "team_one_list")
                insert_players_to_HTML_list(teams.teams[1], "team_two_list")
            }
        }
        xhr.send(myJSON);
    }
}

function create_players(players, formation_value_team1, formation_value_team2) {
    let goalkeepers = []
    let defenders = []
    let midfielders = []
    let forwards = []
    for (let i = 0; i <= 21; i++) {
        switch (players[i].position) {
            case 'goalkeeper':
                goalkeepers.push(new Player(players[i].first_name, players[i].last_name, players[i].position))
                break;
            case 'defender':
                defenders.push(new Player(players[i].first_name, players[i].last_name, players[i].position))
                break;
            case 'midfielder':
                midfielders.push(new Player(players[i].first_name, players[i].last_name, players[i].position))
                break;
            case 'forward':
                forwards.push(new Player(players[i].first_name, players[i].last_name, players[i].position))
                break;
        }
    }
    let f_1 = exctrat_number_from_string(formation_value_team1)
    let f_2 = exctrat_number_from_string(formation_value_team2)
    return validtion(goalkeepers, defenders, midfielders, forwards, f_1, f_2)
}


function validtion(goalkeepers, defenders, midfielders, forwards, f_team_1, f_team_2) {
    let msg = "The formation does not match the number of "
    if (!alert_validtion(goalkeepers.length, 2, "Invalid goalkeepers numbers", ""))
        return false
    if (!alert_validtion(defenders.length, (Number(f_team_1[0]) + Number(f_team_2[0])), msg, "defenders"))
        return false
    if (!alert_validtion(midfielders.length, (Number(f_team_1[1]) + Number(f_team_2[1])), msg, "midfielders"))
        return false
    if (!alert_validtion(forwards.length, (Number(f_team_1[2]) + ((isNaN(f_team_1[3]) ? 0 : Number(f_team_1[3]))) + Number(f_team_2[2]) + ((isNaN(f_team_2[3]) ? 0 : Number(f_team_2[3])))), msg, "forwards"))
        return false
    return true
}

function alert_validtion(arr_length, number_to_compare, error_msg, position) {
    if (arr_length != number_to_compare) {
        alert(error_msg + position)
        return false
    }
    return true
}

function exctrat_number_from_string(txt) {
    let numb = txt.match(/\d/g);
    numb = numb.join("");
    return numb;
}

function insert_players_to_HTML_list(team, team_id) {
    let listOfPlayerToDisplay = "<ul>"
    Object.keys(team).forEach(function (key) {
        for (let i = 0; i < team[key].length && (team[key] !== team.formation); i++) {
            listOfPlayerToDisplay += "<li> " + team[key][i].first_name + " " + team[key][i].last_name + " in position : " + team[key][i].position + "</li>"
        }
    });
    listOfPlayerToDisplay += "</ul>"
    document.getElementById(team_id).innerHTML = listOfPlayerToDisplay
}

function extract_data_and_create_json_of_players(jso) {
    for (let j = 0; j <= 21; j++) {
        jso.players[j] = {
            first_name: document.getElementById('f' + j).value,
            last_name: document.getElementById('l' + j).value, 
            position: document.getElementById('p' + j).value
        }
    }
    var selector_team1 = document.getElementById('formation_team_1');
    var formation_value_team1 = selector_team1[selector_team1.selectedIndex].value;
    jso.formation[0] = formation_value_team1;
    var selector_team2 = document.getElementById('formation_team_2');
    var formation_value_team2 = selector_team2[selector_team2.selectedIndex].value;
    jso.formation[1] = formation_value_team2;
}

