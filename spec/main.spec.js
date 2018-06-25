process.env.NODE_ENV = 'test';

const app = require('../app')
const request = require('supertest')(app)
const { expect } = require('chai');
const seed = require('../seed/seed');
const { articlesData, commentsData, topicsData, usersData } = require('../seed/testData')
const mongoose = require('mongoose')

describe('API endpoints', () => {
    let commentDocs, articleDocs, topicDocs, userDocs;
    before(() => {
        return seed(articlesData, commentsData, topicsData, usersData).then((docs) => {
            [commentDocs, articleDocs, topicDocs, userDocs] = docs
        })
    })

    after(() => {
        mongoose.disconnect()
    })

    it('PASSES /GET /api/topics', () => {
        return request
            .get('/api/topics')
            .then(res => {
                expect(res.body.length).to.equal(2)
                expect(res.body[0].title).to.equal('Mitch')
            })
    });

    it('PASSES /GET /api/topics/:topic_id/articles', () => {
        return request
            .get(`/api/topics/${topicDocs[0]._id}/articles`)
            .then(res => {
                expect(res.body.length).to.equal(2)
                expect(res.body[0].title).to.equal('Living in the shadow of a great man')
            })
    });

    it('FAILS /GET /api/topics/:topic_id/articles', () => {
        return request
            .get(`/api/topics/fail/articles`)
            .expect(400)
            .then(res => {
                expect(res.body.message).to.equal('400 bad request')
            })
    });

    it('PASSES /POST /api/topics/:topic_id/articles', () => {
        return request
            .post(`/api/topics/${topicDocs[0]._id}/articles`)
            .send({ "title": "test", "body": "Test" })
            .then(res => {
                expect(res.body._id).to.equal(res.body._id)
            })
    });

    it('FAILS /POST /api/topics/:topic_id/articles', () => {
        return request
            .post(`/api/topics/${topicDocs[0]._id}/articles`)
            .send({})
            .expect(400)
            .then(res => {
                expect(res.body.message).to.equal('400 bad request')
            })
    });

    it('PASSES /GET /api/articles', () => {
        return request
            .get('/api/articles')
            .then(res => {
                expect(res.body.length).to.equal(5)
                expect(res.body[0].title).to.equal('Living in the shadow of a great man')
            })
    });

    it('PASSES /GET /api/articles/article_id', () => {
        return request
            .get(`/api/articles/${articleDocs[0]._id}`)
            .then(res => {
                expect(res.body.title).to.equal('Living in the shadow of a great man')
            })
    });

    it('FAILS /GET /api/articles/article_id/comments', () => {
        return request
            .get(`/api/articles/fail/comments`)
            .expect(400)
            .then(res => {
                expect(res.body.message).to.equal('400 bad request')
            })
    });

    it('PASSES /POST /api/articles/:article_id/comments', () => {
        return request
            .post(`/api/articles/${articleDocs[0]._id}/comments`)
            .send({ "body": "Test" })
            .then(res => {
                expect(res.body.belongs_to).to.equal(articleDocs[0]._id.toString())
                expect(res.body.body).to.equal('Test')
            })
    });

    it('FAILS /POST /api/articles/:article_id/comments', () => {
        return request
            .post(`/api/articles/${articleDocs[0]._id}/comments`)
            .send({ })
            .expect(400)
            .then(res => {
                expect(res.body.message).to.equal('400 bad request')
            })
    });

    it('/PUT /api/articles/:article_id?vote=up', () => {
        return request
            .put(`/api/articles/${articleDocs[0]._id}?vote=up`)
            .then(res => {
                expect(res.body.votes).to.equal(1)
            })
    });

    it('/PUT /api/articles/:article_id?vote=down', () => {
        return request
            .put(`/api/articles/${articleDocs[0]._id}?vote=down`)
            .then(res => {
                expect(res.body.votes).to.equal(0)
            })
    });

    it('/PUT /api/comment/:comment_id?vote=up', () => {
        return request
            .put(`/api/comments/${commentDocs[0]._id}?vote=up`)
            .then(res => {
                expect(res.body.votes).to.equal(8)
            })
    });

    it('/PUT /api/comment/:comment_id?vote=down', () => {
        return request
            .put(`/api/comments/${commentDocs[0]._id}?vote=down`)
            .then(res => {
                expect(res.body.votes).to.equal(7)
            })
    });

    it('/DELETE /api/comment/:comment_id', () => {
        return request
            .delete(`/api/comments/${commentDocs[0]._id}`)
            .then(res => {
                expect(res.body).to.eql({})
                expect(commentDocs.length).to.equal(8)
            })
    });

    it('PASSES /GET /api/users/:username', () => {
        return request
            .get(`/api/users/${userDocs[0].username}`)
            .then(res => {
                expect(res.body[0].username).to.equal(userDocs[0].username)
            })
    });

    it('FAILS /GET /api/users/:username', () => {
        return request
            .get(`/api/users/fail`)
            .expect(404)
            .then(res => {
                expect(res.body.message).to.equal('404 user not found')
            })
    });

})

