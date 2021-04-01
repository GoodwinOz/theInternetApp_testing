const chai = require('chai')
const chaiHttp = require('chai-http')
const request = require('supertest')

const server = require('../server')
const should = chai.should()

//Assert syle
chai.should()

chai.use(chaiHttp)


    //Integration tests
describe('Crud api integration tests', () =>  {
    //Test GET route
    describe('GET /api/posts, GET all posts', () => { //Green
        it('should get all posts', () => {
            chai.request(server)
                .get('/api/posts')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                })
        })

        it('should NOT get all posts', () => {
            chai.request(server)
                .get('/api/post')
                .end((err, res) => {
                    res.should.have.status(404)
                })
        })
    })

    // Testing GET by ID
    describe('GETting a post (/posts) by ID', () => {
        it('should GET post by id', () => {
            let postId = 1
            chai.request(server)
                .get('/api/posts/' + postId)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('id')
                    res.body.should.have.property('title')
                    res.body.should.have.property('id').eq(1)
                })
        })
    })
    
    describe('Negative case', () => { //Green
        it('should NOT get post by ID', () => {
            const postId = 123 //Fake id
            chai.request(server)
                .get('/api/post/' + postId)
                .end((err, response) => {
                    response.should.have.status(404)
                })
        })
    })



//**Testing POST Route */


    describe('POST to /api/posts', () => { //Green
        // it('should post to /posts', () => {
        //     const post = {
        //         userID: '1',
        //         title: 'Test testing post',
        //         text: 'Test testing text'
        //     }
        //     chai.request(server)
        //         .post('/api/posts')
        //         .send(post)
        //         .end((err, res) => {
        //             res.should.have.status(200)
        //             res.body.should.be.a('object')
        //             res.body.should.have.property('userID')
        //             res.body.should.have.property('title')
        //             res.body.should.have.property('text')
        //             res.body.should.have.property('userID').eq('1')
        //         })
        //     })

        it('should NOT post to /posts', () => { //Green (with 404)
            const post = {
                userID: '1',
                title: 'Test testing post',
                text: 'Test testing text'
            }
            chai.request(server)
                .post('/api/post')
                .send(post)
                .end((err, res) => {
                    res.should.have.status(404)
                })
            })
        })

    //** Testing PUT method */
    describe('PUT to /api/posts', () => {
        it('should update a /posts post by id', () => { //Green 
            const postId = 4
            const post = {
                userID: '1',
                title: 'One more time Updated testing post',
                text: 'Againg Updated testing text'
            }
            chai.request(server)
                .put('/api/posts/' + postId)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('userID')
                    res.body.should.have.property('title')
                    res.body.should.have.property('text')
                    res.body.should.have.property('userID').eq(1)
                    res.body.should.have.property('title').eq('One more time Updated testing post')
                })
        })
    })


    describe('Failed PUT to /api/posts', () => {
        it('should NOT update a /posts post by id', () => { //Green
            const postId = 4
            const post = {
                userID: '1',
                title: 'Againg Updated testing post',
                text: 'Againg Updated testing text'
            }
            chai.request(server)
                .put('/api/post/' + postId)
                .send(post)
                .end((err, res) => {
                    res.should.have.status(404)
                })
            })
        })

    //**Testing DELETE method */
    // describe('DELETE post from /api/posts', () => { //Green
    //     it('should delete a /posts post by id', (done) => { 
    //         const postId = 9 //If id is not defined or post already deleted => error
    //         chai.request(server)
    //             .delete('/api/posts/' + postId)
    //             .end((err, res) => {
    //                 res.should.have.status(204)
    //             done()
    //             })
    //     })
    // })

})