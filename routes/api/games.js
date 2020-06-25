const express = require("express");
const router = express.Router();
const passport = require("passport");

const Game = require("../../models/Game");

//@route Get api/games
//@desc Get all games for a specfic user
//@access Private

router.get(
    "/",
    passport.authenticate("jwt", { session: false}),
    async (req, res) => {
        let gamesArr = [];


        //Player Games
        await Game.find({}).then(games => {
            games.map(game => {
                game.players && game.players.map(player => {
                    if (player.email == req.user.email) {
                        gamesArr.push(project);
                    }

                });
            });
        })
        .catch(err => console.log(err));

        const OWNER = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        };

        //Combine with owner of host
        await Game.find({ owner: OWNER })
        .then(games => {
            let finalArr = [...games, ...gamesArr];
            res.json(finalArr);
        })
        .catch(err => console.log(err));
    }
);

//@route GET api/games/:id
//@desc Get specfic game id
//@access private

router.get(
    "/:id",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
        let id = req.params.id;

        Game.findById(id).then(game => res.json(game));
        
    }
);

//@route POST api/games/create
//@desc Create a new game
//@access Private

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const OWNER = {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email
        };

        const NEW_GAME = await new Game({
            owner: OWNER,
            name: req.body.gameName,
            players: req.body.players
        });

        NEW_GAME.save()
        .then(game => res.json(game));
    }
);

//@route PATCH api/games/update
//@desc Update an exisiting game
//@access Private

router.patch(
    "/update",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        let gameFields = {};

        gameFields.name = req.body.gameName;
        gameFields.players = req.body.players;
        gameFields.stats = req.body.gameStats;

        Game.findOneAndUpdate(
            { _id: req.body.id },
            { $set: gameFields },
            { new: true }
        )
        .then(game => {
            res.json(game);
        })
        .catch(err => console.log(err));
    }
);

//@route DELETE api/games/delete/:id
//@desc Delete a game
//@access Private

router.delete(
    "/delete/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Game.findById(req.params.id)
        .then(game => {
            game.remove()
            .then(() => res.json({ success: true }));
        });
    }
);

module.exports = router;