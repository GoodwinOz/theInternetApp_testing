// Create user => get token after creation => post something to "posts" with userID => get post by id => delete post by ID

const chai = require('chai')
const chaiHttp = require('chai-http')

const server = require('../server')
const should = chai.should()

//Assert syle
chai.should()
chai.use(chaiHttp)

describe('Crud API e2e tests', () =>  { //Green
    // describe('Creating user', () => {
    //     it('should create a user', () => {
    //         const user = {
    //             login: "e2e",
    //             nameAndSurname: "E2E Test",
    //             password: "qwerty123",
    //             mobileNumber: "3800001",
    //             gender: "male",
    //             email: "e2e@gmail.com",
    //             status: "admin"
    //         }
            
    //         //Registrationg user
    //         chai.request(server)
    //             .post('/api/users/register')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.should.have.status(200)
    //                 res.body.should.be.a('object')
    //                 res.body.should.have.property('login')
    //                 res.body.should.have.property('nameAndSurname')
    //                 res.body.should.have.property('modileNumber')
    //                 res.body.should.have.property('gender')
    //                 res.body.should.have.property('email')
    //                 res.body.should.have.property('login').eq('e2e')
    //             })
    //         })
    //     })
    
    describe('test token function', () => { //Green (Login as url user => get token => get posts)
        it('should get jwt token from body', () => {
            const mainUser = {
                email: 'e2e',
                password: 'qwerty123'
            }
            const testPost = {
                userID: '1',
                title: 'e2e test post',
                text: 'e2e test post text'
            }
            const user = {
                email: 'url@gmail.com',
                password: 'qwerty123'
            }

            //Login for getting JWT token
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    let token = res.body.token

                    //Getting all posts in array with sending JWT token
                    chai.request(server)
                        .get('/api/posts')
                        .set('Authorization', token)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('array')
                        })
                    //Post a test post with setting JWT token
                    // chai.request(server)
                    //     .post('/api/posts')
                    //     .set('Authorization', token)
                    //     .send(testPost)
                    //     .end((err, res) => {
                    //         res.should.have.status(200)
                    //         res.body.should.have.property('userID')
                    //         res.body.should.have.property('title')
                    //         res.body.should.have.property('text')
                    //     })

                    //Getting created post by id
                    chai.request(server)
                        .get('/api/posts/62')
                        .set('Authorization', token)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.body.should.be.a('object')
                            res.body.should.have.property('id')
                            res.body.should.have.property('userID')
                            res.body.should.have.property('title')
                            res.body.should.have.property('text')
                        })
                })
        })
    })
    describe('Delete created post', () => {
        it('should delete a created post by id', () => { 
            const postId = 58 //If id is not defined or post already deleted => error
            const user = {
                email: 'url@gmail.com',
                password: 'qwerty123'
            }
            //Login for getting JWT token
            chai.request(server)
                .post('/api/users/login')
                .send(user)
                .end((err, res) => {
                    // res.body.should.have.property('token')
                    let token = res.body.token
                    
                    //Deleting post by id with JWT token
                    chai.request(server)
                        .del('/api/posts/' + postId).set('Authorization', token)
                        .end((err, res) => {
                            res.should.have.status(204)
                        })
                    })
        })
    })
})