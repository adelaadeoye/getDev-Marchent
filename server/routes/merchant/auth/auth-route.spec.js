const request = require("supertest");

const server = require("../../../api/server");

const db = require("../../../database/dbConfig");
const db = require("../../../database/dbConfig");

//Here i want to test the auth endpoint
beforeEach(() => db("users").truncate());
 const username = "test";
  const password = "test";
  const email = "test";
describe("/api/auth", () => {
  //Test the register endpoint

  
  describe("Post/register", () => {
    it("should return a status code 201 ", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username, password, email })
        .expect(404);
    });
   
    it("should return json", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username, password, email })
        .then(resp => {
          expect(resp.type).toMatch(/json/i);
        });
    });
  });
    //Test for login endpoint
    
    describe("POST/ Login", () => {
     
      it("should return status 401 ", async () => {
        await db("users").insert({ username, password,email });
        return request(server)
          .post("/api/auth/login")
          .send({ username: "test", password: "test" })
          .expect(401);
      });
     
      it("should return json", async () => {
        await db("users").insert({ username, password,email });
        return request(server)
          .post("/api/auth/login")
          .send({ username, password })
          .then(resp => {
            expect(resp.type).toMatch(/json/i);
          });
      });
    });
});
