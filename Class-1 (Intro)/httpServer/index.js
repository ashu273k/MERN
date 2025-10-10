const http = require("http");

const myServer = http.createServer((req, res) => {
  console.log(req.url);

  switch (req.url) {
    case "/":
      res.end(`home page`);
      break;
    case "/about":
      res.end(`about page`);
      break;
    case "/contact":
      res.end(`contact page`);
      break;
    case "/baby":
      res.end(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Contact</title>
</head>
<body>
    <nav>
        Talk to me baby
    </nav>
</body>
</html>`);
      break;
  }
});

myServer.listen(8001, () => {
  console.log("Server Started");
});
