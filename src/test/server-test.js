
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

  it("GET /posts/:id", function(){
    request.get("/posts/1")
      .expect(200)
      .end(function(err, response){
        if(err){
          done(err);
          return;
        }

        response.body.title.should.equal("json-server");
        done();
      });
  });

  
  it("GET /comments/:id", function(){
    request.get("/comments/1")
      .expect(200)
      .end(function(err, response){
        if(err){
	  done(err);
	  return;
	}

	response.body.body.should.equal("mockup");
	done();
      });
  });

});
