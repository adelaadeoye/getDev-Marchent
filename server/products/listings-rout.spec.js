
const request = require("supertest");

const server = require("../api/server.js");


describe('/api/listings', () => {

    describe('GET /', () => {

        test('should return status 400 Bad Request without header', () => {
            return request(server).get('/api/listings/')
                .expect(400)
        })

        test('should return status 401 Unauthorized with invalid header', () => {
            return request(server).get('/api/listings/').set('authorization', 'wrong')
                .expect(401)
        })

        })
})