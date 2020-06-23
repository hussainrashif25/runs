const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    owner: {
        type: Object,
        required: true
    },
    players: [
        {
            email: {
                type: String
            },
            name: {
                type: String
            },
            team: {
                type: String
            }
        }
    ],
    game: {
        blue: Number,
        red: Number
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Game = mongoose.model("games", GameSchema);