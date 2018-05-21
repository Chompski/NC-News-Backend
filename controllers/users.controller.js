const { Article, Comment, Topic, User } = require('../models');

function getUser(req, res) {
    const user = req.params.username
    User
        .find({username:user})
        .then(articles => {
            return res.status(200).send(articles);
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = { getUser }