process.env.NODE_ENV = 'test';

const app = require('../app')
const request = require('supertest')(app)
const {expect} = require('chai');
const seed = require('../seed/seed');
const {articlesData, commentsData, topicsData, usersData} = require('../seed/testData')
const mongoose = require('mongoose')

describe('API endpoints',() => {
    let commentDocs, articleDocs, topicDocs, userDocs;
    before(()=>{
        return seed(articlesData, commentsData, topicsData, usersData).then((docs) =>{
            [commentDocs, articleDocs, topicDocs, userDocs] = docs
        })
    })

    after(() => {
        mongoose.disconnect()
    })

    it('/GET /api/topics', () => {
       return request
       .get('/api/topics')
       .then(res => {
           expect(res.body.length).to.equal(2)
           expect(res.body[0].title).to.equal('Mitch')
       }) 
    });

    it('/GET /api/topics/:topic_id/articles', () => {
       return request
       .get(`/api/topics/${topicDocs[0]._id}/articles`)
       .then(res => {
           expect(res.body.length).to.equal(2)
           expect(res.body[0].title).to.equal('Living in the shadow of a great man')
       })
    });

    it('/POST /api/topics/:topic_id/articles', () => {
        return request
        .post(`/api/topics/${topicDocs[0]._id}/articles`)
        .send({"title":"test", "body":"Test"})
        .then(res =>{
            expect(res.body._id).to.equal(res.body._id)
        })
    });

    it('/GET /api/articles', ()=> {
        return request
        .get('/api/articles')
        .then(res => {
            expect(res.body.length).to.equal(5)
            expect(res.body[0].title).to.equal('Living in the shadow of a great man')
        }) 
    });

    it('/GET /api/articles/article_id', ()=> {
        return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .then(res => {
            expect(res.body.title).to.equal('Living in the shadow of a great man')
        }) 
    });
})