const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema ({
    owner: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        requried: true
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
    stats: {
        blue: Number,
        red: Number
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = Game = mongoose.model("games", GameSchema);