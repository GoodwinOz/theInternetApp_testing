// Create user => get token after creation => post something to "posts" with userID => get post by id => delete post by ID

const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('supertest')

const app = require('../server')

//Assert syle
const should = chai.should()
chai.should()
chai.use(chaiHttp)

const newUser = {
    login: "e2eNum5",
    nameAndSurname: "E2E Test",
    password: "qwerty123",
    mobileNumber: "3800001",
    gender: "male",
    email: "e2eNum5@gmail.com",
    status: "admin"
}
const newUserLogin = {
    email: 'e2eNum5',
    password: 'qwerty123'
}
const newE2ePost = {
    userID: '1',
    title: 'e2e test post',
    text: 'e2e test post text'
}
const testLoginUser = {
    email: 'url@gmail.com',
    password: 'qwerty123'
}

const postId = 18


describe('Async e2e tests', () => {
    it('should run a process of async. testing', async() => {
        const resReg = await request(app).post('/api/users/register').send(newUser)
        expect(resReg.statusCode).eq(200)
        expect(resReg.body).should.be.a('object')
        expect(resReg.body).to.have.property('login')
        expect(resReg.body).to.have.property('nameAndSurname')
        expect(resReg.body).to.have.property('mobileNumber')
        expect(resReg.body).to.have.property('gender')
        expect(resReg.body).to.have.property('email')
        expect(resLogin.body).to.have.property('login').eq('e2e')

        const resLogin = await request(app).post('/api/users/login').send(testLoginUser)
        let token = resLogin.body.token
        expect(resLogin.statusCode).eq(200)
        expect(resLogin.body).to.have.property('token')

        const resGetPosts = await request(app).get('/api/posts').set('Authorization', token)
        expect(resGetPosts.statusCode).eq(200)
        expect(resGetPosts.body).to.be.a('array')

        const resNewPost = await request(app).post('/api/posts').set('Authorization', token).send(newE2ePost)
        expect(resNewPost.statusCode).eq(200)
        expect(resNewPost.body).to.have.property('userID')
        expect(resNewPost.body).to.have.property('title')
        expect(resNewPost.body).to.have.property('text')

        const resGetPostById = await request(app).get('/api/posts/73').set('Authorization', token)
        expect(resGetPostById.statusCode).eq(200)
        expect(resGetPostById.body).to.have.property('id')
        expect(resGetPostById.body).to.have.property('userID')
        expect(resGetPostById.body).to.have.property('title')
        expect(resGetPostById.body).to.have.property('text')

        const resDeletePostById = await request(app).del('/api/posts/' + postId).set('Authorization', token)
        expect(resDeletePostById.statusCode).eq(204)
    })
})