var friends = require("../data/friends.js");

module.exports = function(app) {

    app.post("/api/friends", function(req, res) {
        var newPerson = req.body;
        newPerson.answers.forEach((value, index) => { newPerson.answers[index] = parseInt(value); });
        var matches = findClosestMatches(newPerson);
        friends.push(newPerson);
        res.send(matches);
    });

    app.get("/api/friends", function(req, res) {
        res.send(friends);
    });

}

function findClosestMatches(person) {
    var matches = [];
    differenceToBeat = 41;
    friends.forEach(friend => {
        var difference = 0;
        friend.answers.forEach((value, index) => {
            difference += value > person.answers[index] ? value - person.answers[index] : person.answers[index] - value;
        });
        if (difference < differenceToBeat) {
            matches = [friend];
            differenceToBeat = difference;
        }
        else if (difference === differenceToBeat) matches.push(friend);        
    });

    return {
        matches,
        difference: differenceToBeat
    };

}