let assert = require("assert");

describe("API Gateway", function(){
  it("Connectivity", function(done){
    request.get("/ping")
      .expect(200)
      .end(function(err, response){
        if(err){
          done(err);
          return;
        }

        done();
      });
  });

  it("GET /posts/:id", function(done){
    request.get("/posts/1")
      .expect(200)
      .end(function(err, response){
        if(err){
          done(err);
          return;
        }

	assert.equal(response.body.title, "json-server");
	done();
      });
  });

  
  it("GET /comments/:id", function(done){
    request.get("/comments/1")
      .expect(200)
      .end(function(err, response){
        if(err){
	  done(err);
	  return;
	}

	assert.equal(response.body.body, "mockup");
	done();
      });
  });

});
