const jsonserver = require("json-server");
const server     = jsonserver.create();
const router     = jsonserver.router("./test/mock/mock.json");
const middle     = jsonserver.defaults();

server.use(middle);
server.use(router);

process.title = "apigateway-server-test-mock";

server.listen(53000, () => {
  console.log("> > > > Mock server is runnning . . .");
});

