/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let id;
let wrongId = "653140d16f8e00089c6177a2";
suite('Functional Tests', function() {

 test('#example Test GET /api/books', function(done){
    chai.request(server).post('/api/books').send({title: "test_title example1"}).end();
    chai.request(server).post('/api/books').send({title: "test_title example2"}).end();
    chai.request(server).post('/api/books').send({title: "test_title example3"}).end();
    done();
  });
  
  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        chai.request(server)
        .post('/api/books')
        .send({
          title: "test_title"
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an Object');
          assert.property(res.body, '_id', 'Book should contain _id');
          assert.property(res.body, 'title', 'Book should contain title');
          assert.deepEqual(res.body.title, 'test_title', 'title should Equal test_title');
          id = res.body._id;
          done();
        });
      });
      
      test('Test POST /api/books with no title given', function(done) {
        //missing required field title
        chai.request(server)
        .post('/api/books')
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'missing required field title');
          done();
        });
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai.request(server)
        .get('/api/books')
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body, 'response should be an array');
          assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body[0], 'title', 'Books in array should contain title');
          assert.property(res.body[0], '_id', 'Books in array should contain _id');
          done();
        });
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai.request(server)
        .get('/api/books/' + wrongId)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'no book exists');
          done();
        });
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai.request(server)
        .get('/api/books/' + id)
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body, 'response should be an object');
          assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
          assert.property(res.body, 'title', 'Books in array should contain title');
          assert.property(res.body, '_id', 'Books in array should contain _id');
          done();
        });
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      let comment = "someText";
      test('Test POST /api/books/[id] with comment', function(done){
        chai.request(server)
            .post('/api/books/' + id)
            .send({'comment': comment})
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an Object');
              assert.property(res.body, 'commentcount', 'Books in array should contain commentcount');
              assert.isAtLeast(res.body.commentcount, 1, 'Comment Count should be at least 1');
              assert.include(res.body.comments, comment, "array should contains our new value");
              done();
            })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        chai.request(server)
        .post('/api/books/' + id)
        .send({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'missing required field comment');
          done();
        });

      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        chai.request(server)
        .post('/api/books/' + wrongId)
        .send({'comment': comment})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body, 'no book exists');
          done();
        });
        
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai.request(server)
            .delete('/api/books/' + id)
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.body, 'delete successful');
              done();
            })
      });

      test('Test DELETE /api/books/[id] with  id not in db', function(done){
        chai.request(server)
            .delete('/api/books/' + wrongId)
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.body, 'no book exists');
              done();
            })
      });

    });

    suite('DELETE /api/books => delete all book', function() {
      
      test('Test All DELETE /api/books', function(done){
        chai.request(server)
            .delete('/api/books/')
            .end(function(err, res){
              assert.equal(res.status, 200);
              assert.equal(res.body, 'complete delete successful');
              done();
            })
      });

    });

  });

});
