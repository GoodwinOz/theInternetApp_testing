const { expect } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('supertest')

const app = require('../server')
const should = chai.should()

//Assert syle
chai.should()

chai.use(chaiHttp)

const testLoginUser = {
    email: 'url@gmail.com',
    password: 'qwerty123'
}

const newIngetrationUser = {
    login: "IntNum6",
    nameAndSurname: "Integration Testing",
    password: "qwerty123",
    mobileNumber: "3800001",
    gender: "male",
    email: "intNum6@gmail.com",
    status: "admin"
}
const failedUser = {
    login: "IntNum0",
    nameAndSurname: "E2E Test",
    password: "qwerty123",
    mobileNumber: "3800001",
    gender: "male",
    email: "intNum0@gmail.com",
    status: "admin"
}

const newTestIntPost = {
    userID: '1',
    title: 'Integration test post',
    text: 'Integration test post text'
}

describe('Crud api integration tests', () =>  {
    describe('Creating a user', () => {
        it('should create a user', async() => {
            const newUser = await request(app).post('/api/users/register').send(newIngetrationUser)
            expect(newUser.statusCode).eq(200)
            expect(newUser.body).should.be.a('object')
            expect(newUser.body).to.have.property('login')
            expect(newUser.body).to.have.property('nameAndSurname')
            expect(newUser.body).to.have.property('mobileNumber')
            expect(newUser.body).to.have.property('gender')
            expect(newUser.body).to.have.property('email')
        })
        it('should not create a user because of same login', async() => {
            const creationFail = await request(app).post('/api/users/register').send(failedUser)
            expect(creationFail.statusCode).eq(400)
        })
    })
    
    describe('Postitive tests for functions requires token (POST/GET posts)', () => {
        it.skip('should execute a process of testing token required methods', async() => {

            //Login method
            const userLogin = await request(app).post('/api/users/login').send(testLoginUser)
            let token = userLogin.body.token
            expect(userLogin.statusCode).eq(200)
            expect(userLogin.body).to.have.property('token')

            //Creating a post
            const createPost = await request(app).post('/api/posts').set('Authorization', token).send(newTestIntPost)
            expect(createPost.statusCode).eq(200)
            expect(createPost.body).to.have.property('userID')
            expect(createPost.body).to.have.property('title')
            expect(createPost.body).to.have.property('text')

            //Getting posts
            const getPosts = await request(app).get('/api/posts').set('Authorization', token)
            expect(getPosts.statusCode).eq(200)
            expect(getPosts.body).to.be.a('array')

            //Getting post by ID
            const getPostById = await request(app).get('/api/posts/15').set('Authorization', token)
            expect(getPostById.statusCode).eq(200)
            expect(getPostById.body).to.have.property('id')
            expect(getPostById.body).to.have.property('userID')
            expect(getPostById.body).to.have.property('title')
            expect(getPostById.body).to.have.property('text')

            //Put method
            const putToPost = await request(app).put('/api/posts/15').set('Authorization', token).send({
                userID: '1',
                title: 'Updated integration testing post',
                text: 'Updated integration testing text'
            })
            expect(putToPost.statusCode).eq(200)
            expect(putToPost.body).to.have.property('id')
            expect(putToPost.body).to.have.property('userID')
            expect(putToPost.body).to.have.property('title')
            expect(putToPost.body).to.have.property('text')

            //Delete scenario
            const deletePost = await request(app).del('/api/posts/35').set('Authorization', token)
            expect(deletePost.statusCode).eq(204)
        })
    })

    //Negative scenatios
    describe('GET /api/posts, GET all posts', () => {
        it('should return 401 because of not authorised', async() => {
            const resGetPosts = await request(app).get('/api/posts')
            expect(resGetPosts.statusCode).eq(401)
            expect(resGetPosts).not.to.have.property('token')
        })
    })
    describe('GETting a post (/posts) by ID', () => {
        it('should return 401 in process of getting post by id because of not authorised', async() => {
            let postId =15
            const resGetPostById = await request(app).get('/api/posts/' + postId)
            expect(resGetPostById.statusCode).eq(401)
            expect(resGetPostById).not.to.have.property('token')
        })
    })
    describe('PUT method', () => {
        it('should fail a put mehtod because of no token', async() => {
            const failedPut = await request(app).put('/api/posts/15').send({
                userID: '1',
                title: 'Updated integration testing post',
                text: 'Updated integration testing text'
            })
            expect(failedPut.statusCode).eq(401)
        })
    })
})





// Synchronous version

// describe('Crud api integration tests', () =>  {
//     //Test GET route
//     describe('GET /api/posts, GET all posts', () => { //Green
//         it('should get all posts', () => {
//             chai.request(server)
//                 .get('/api/posts')
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('array')
//                 })
//         })

//         it('should NOT get all posts', () => {
//             chai.request(server)
//                 .get('/api/post')
//                 .end((err, res) => {
//                     res.should.have.status(404)
//                 })
//         })
//     })

//     // Testing GET by ID
//     describe('GETting a post (/posts) by ID', () => {
//         it('should GET post by id', () => {
//             let postId = 1
//             chai.request(server)
//                 .get('/api/posts/' + postId)
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('object')
//                     res.body.should.have.property('id')
//                     res.body.should.have.property('title')
//                     res.body.should.have.property('id').eq(1)
//                 })
//         })
//     })

//     describe('Negative case', () => { //Green
//         it('should NOT get post by ID', () => {
//             const postId = 123 //Fake id
//             chai.request(server)
//                 .get('/api/post/' + postId)
//                 .end((err, response) => {
//                     response.should.have.status(404)
//                 })
//         })
//     })



// //**Testing POST Route */


//     describe('POST to /api/posts', () => { //Green
//         // it('should post to /posts', () => {
//         //     const post = {
//         //         userID: '1',
//         //         title: 'Test testing post',
//         //         text: 'Test testing text'
//         //     }
//         //     chai.request(server)
//         //         .post('/api/posts')
//         //         .send(post)
//         //         .end((err, res) => {
//         //             res.should.have.status(200)
//         //             res.body.should.be.a('object')
//         //             res.body.should.have.property('userID')
//         //             res.body.should.have.property('title')
//         //             res.body.should.have.property('text')
//         //             res.body.should.have.property('userID').eq('1')
//         //         })
//         //     })

//         it('should NOT post to /posts', () => { //Green (with 404)
//             const post = {
//                 userID: '1',
//                 title: 'Test testing post',
//                 text: 'Test testing text'
//             }
//             chai.request(server)
//                 .post('/api/post')
//                 .send(post)
//                 .end((err, res) => {
//                     res.should.have.status(404)
//                 })
//             })
//         })

//     //** Testing PUT method */
//     describe('PUT to /api/posts', () => {
//         it('should update a /posts post by id', () => { //Green 
//             const postId = 4
//             const post = {
//                 userID: '1',
//                 title: 'One more time Updated testing post',
//                 text: 'Againg Updated testing text'
//             }
//             chai.request(server)
//                 .put('/api/posts/' + postId)
//                 .send(post)
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('object')
//                     res.body.should.have.property('userID')
//                     res.body.should.have.property('title')
//                     res.body.should.have.property('text')
//                     res.body.should.have.property('userID').eq(1)
//                     res.body.should.have.property('title').eq('One more time Updated testing post')
//                 })
//         })
//     })


//     describe('Failed PUT to /api/posts', () => {
//         it('should NOT update a /posts post by id', () => { //Green
//             const postId = 4
//             const post = {
//                 userID: '1',
//                 title: 'Againg Updated testing post',
//                 text: 'Againg Updated testing text'
//             }
//             chai.request(server)
//                 .put('/api/post/' + postId)
//                 .send(post)
//                 .end((err, res) => {
//                     res.should.have.status(404)
//                 })
//             })
//         })

//     //**Testing DELETE method */
//     // describe('DELETE post from /api/posts', () => { //Green
//     //     it('should delete a /posts post by id', (done) => { 
//     //         const postId = 9 //If id is not defined or post already deleted => error
//     //         chai.request(server)
//     //             .delete('/api/posts/' + postId)
//     //             .end((err, res) => {
//     //                 res.should.have.status(204)
//     //             done()
//     //             })
//     //     })
//     // })

// })