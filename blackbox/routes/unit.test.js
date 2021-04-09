//Ui тесты для blizzard (e2e) "походить по хедеру", залогиниться, изменить что-то в опциях, вылогиниться.
//blackbox e2e тесты (flase positive) Проверить асинхронность.
//При наличии ошибки с портом - разобраться 

const jest = require('jest')
const mocha = require('mocha')
const sinon = require('sinon')
const chai = require('chai')

const should = chai.should()
const expect = chai.expect
chai.should()

const Post = require('../models/post.model')
const router = require('../routes/post.routes')

describe('Post routes', () => {
    it('should respond', function(done) {
        let postEntityMock = sinon.mock(Post)
        let expectedResult = { status: true, post: [] }
        postEntityMock.expects('findAll').yields(null, expectedResult)
        Post.findAll(function(err, result) {
            postEntityMock.verify()
            postEntityMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })

    it('should return an error', function(done) {
        let postEntityMock = sinon.mock(Post)
        let expectedResult = { status: false, error: 'Something went wrong' }
        postEntityMock.expects('findAll').yields(expectedResult, null)
        Post.findAll(function(err, result) {
            postEntityMock.verify()
            postEntityMock.restore()
            expect(err.status).not.to.be.true
            done()
        })
    })

    it('should respond', function(done) {
        let postEntityMock = sinon.mock(Post)
        let expectedResult = { status: true, post: {} }
        postEntityMock.expects('create').yields(null, expectedResult)
        Post.create(function(err, result) {
            postEntityMock.verify()
            postEntityMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })

    it('should respond', function(done) {
        let postEntityMock = sinon.mock(Post)
        let expectedResult = { status: true }
        postEntityMock.expects('destroy').yields(null, expectedResult)
        Post.destroy(function(err, result) {
            postEntityMock.verify()
            postEntityMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})

let postObj = {
    id: '1',
    userID: '1',
    title: 'test',
    text: 'test'
}
describe('create with JSON data', () => {
    it('should return JSON data', function(done) {
        let postData = sinon.mock(new Post({ postObj }))
        let post = postData.object
        let expectedResult = { postObj, status: 200 }
        postData.expects('save').yields(null, expectedResult)
        post.save(function (err, result) {
            postData.verify()
            postData.restore()
            console.log(result)
            expect(result.status).eq(200)
            done()
        })
    })
})