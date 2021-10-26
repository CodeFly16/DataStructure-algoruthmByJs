const http = require('http')
const hostname = '127.0.0.1';
const port = 8080;
http.createServer(async (req, res) => {
    if (req.url === '/upload') {
        let formData = null
        await req.on('data', data => {
            formData = data
        })
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'image/jpeg')
        res.write(formData)
        res.end()
    }
}).listen(port, hostname, () => {
    console.log('Server running at ' + hostname + '：' + port);
})
