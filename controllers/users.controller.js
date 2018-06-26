const { Article, Comment, Topic, User } = require('../models');

function getUser(req, res, next) {
    const user = req.params.username
    User
        .find({ username: user })
        .populate('created_by')
        .populate('belongs_to')
        .then(articles => {
            if (articles.length > 0) {
                return res.status(200).send(articles);
            }
            else {
                throw {status:404}
            }
        })
        .catch(error => {
            if (error.status === 404) return next({ status: 404, message:'404 user not found'})
            
            if (error.name === "ValidationError") return next({ status: 400, message:'400 bad request'})
        })
}



module.exports = { getUser }