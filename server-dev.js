const https = require('https');
const fs = require('fs');
const { parse } = require('url');
const next = require('next')
const port =  8080;
const IP =  '127.65.43.21';
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handler = app.getRequestHandler()// Our Redirection Script
const options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt'),
  ca: [fs.readFileSync('RootCA.crt')],
};

app.prepare().then(() => {
  https.createServer(options, (req, res) => {
    handler(req, res)
}).listen(port, IP, err => {
    if (err) throw err
    console.log(`> Ready on ${IP}:${port}`)
  })
})