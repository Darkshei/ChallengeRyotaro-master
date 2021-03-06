const express = require('express');
const router = express.Router();
const Database = require('sqlite-async');

/* POST Add tags to the repo of a specific user. */
router.get('/search', async (req, res, next) => {
    Database.open('tags.db').then(db => {
        const search_data = req.query.search

        if (search_data == undefined) {
            res.status(400).json({
                error: "Syntax error, please specify all entries"
            })
            return console.log("Error : Syntax error, please specify all entries")
        }

        db.run("INSERT OR REPLACE INTO TagsTable (repoPath, tags) VALUES (?, ?)", [`${full_name}`, tags])
        res.status(200).json({
            info: "Tags modified"
        })
    }).catch(err => {
        res.status(404).json({
            error: "Internal error"
        })
    })
});

module.exports = router;
