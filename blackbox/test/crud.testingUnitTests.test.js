const sinon = require('sinon')
const chai = require('chai')
const expect = require('chai').expect
const request = require('supertest')

const app = require('../server')
const Post = require('../models/post.model')
const User = require('../models/users.model')

chai.use(require('sinon-chai'));

//units(?) without mocking
describe('login', async() => {
    it('should return status 200 after login', async() => {
        const res = await request(app).post('/api/users/login').send({
            email: "url@gmail.com",
            password: "qwerty123"
        })
        expect(res.statusCode).eq(200)
        expect(res.body).to.have.property('token')
    })
})

describe('get users', () => {
    it('should return status 200 after login', async() => {
        const res = await request(app).get('/api/users')
        expect(res.statusCode).eq(200)
    })
})

//Units with mocking (sinon)
const user = {
    setNameAndSurname: function() {
        nameAndSurname = User.nameAndSurname
    }
}
describe('testing setNameAndSurname function', function() {
    it('should be called with valid name and surname', function() {
        let setNameAndSurnameSpy = sinon.spy(user, 'setNameAndSurname')

        user.setNameAndSurname('Redrick Reed')

        expect(setNameAndSurnameSpy).to.have.been.calledOnce
        expect(setNameAndSurnameSpy).to.have.been.calledWith('Redrick Reed')

        setNameAndSurnameSpy.restore()
    })
})

describe('Post routes testing', () => {
    let req = {
        body: {
            id: '1',
            userID: '1',
            title: 'Third one',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
        }
    }
    let res = {}
    let nextFunction
    let expextedResult

    describe ('Create function', () => {
        beforeEach(() => {
            res = {
                send: sinon.spy()
            }
            nextFunction = sinon.spy()
        })
        it('Should return post obj.', async () => {
            expextedResult = req.body
            sinon.stub(Post, 'create').returns(expextedResult)
            sinon.stub(Post, 'destroy')
            // await Post.create()
            // sinon.assert.calledWith(Post.create, req.body)
            // sinon.assert.calledWith(res.send, sinon.match({title: req.body.title}))
        })

        it('Should call next func with error message', async () => {
            try {
                req.body.id = 123123
                await Post.findByPk(req.body.id, nextFunction)
                sinon.assert.calledOnce(nextFunction)
            } catch (e) {
                console.log(e, `Error occured. Check the entered id ID ${req.body.id}`)
            }
        })
    })
})


describe('User routes', () => {
    let req = {
        body: {
            login: "testReed1",
            nameAndSurname: "Test Reed",
            password: "qwerty123",
            mobileNumber: "3800001",
            gender: "male",
            email: "test_url1@gmail.com",
            status: "admin"
        }
    }
    let res = {}
    let nextFunction
    let expextedResult

    //Tests for 'create' function
    describe ('Create function', () => {
        beforeEach(() => {
            res = {
                send: sinon.spy()
            }
            nextFunction = sinon.spy()
        })
        
        it('Should return user as obj.', async () => {
            expextedResult = req.body
            sinon.stub(User, 'create').returns(expextedResult)
            sinon.stub(User, 'destroy')
            await User.create()
            // sinon.assert.calledWith(User.create, req.body)
            // sinon.assert.calledWith(res.send, sinon.match({password: req.body.password}))
            // sinon.assert.calledWith(res.send, sinon.match({login: req.body.login}))
        })

        it('Should call next func with error message', async () => {
            try {
                req.body.id = 123123
                await User.findByPk(req.body.id, nextFunction)
                sinon.assert.calledOnce(nextFunction)
            } catch (e) {
                console.log(e, `Error occured. Check the ID ${req.body.id}`)
            }
        })
    })
})