const http = require('http')

const myServer = http.createServer((req, res) => {
    console.log(req.url)

    switch(req.url) {
        case '/':
            res.end(`home page`)
            break;
            case '/about':
            res.end(`about page`)
            break;
            case '/contact':
            res.end(`contact page`)
            break;

    }
})

myServer.listen(8001, () => {
    console.log('Server Started')
})