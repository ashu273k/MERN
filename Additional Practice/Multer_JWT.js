// Configure multer to accept single file upload at /upload and return file name.

const multer = require('multer')
const upload = multer({ dest: 'uploads/'})
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ filename: req.file.filename})
})

// Implement /login → returns JWT if username=admin. GET /verify → verifies JWT.

const jwt = require('jsonwebtoken')
const SECRET = 'abc123'
app.post('/login', (req, res) => {
    if (req.body.username !== 'admin')
        return res.status(401).json({ message: 'Unauthorized' })

    const token = jwt.sign({ user: 'admin'}, SECRET)
    res.json({ token })
})

app.get('/verify', (req, res) => {
    try {
        const data = jwt.verify(req.headers.authorization, SECRET)
        res.json(data)
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized'})
    }
})