const { Article, Comment, Topic, User } = require('../models');

function getUser(req, res, next) {
    const user = req.params.username
    User
        .find({ username: user })
        .then(articles => {
            if (articles.length > 0) {
                return res.status(200).send(articles);
            }
            else {
                next({status:404, error: 'User Not Found.'})
            }
        })
        .catch(next)
}



module.exports = { getUser }