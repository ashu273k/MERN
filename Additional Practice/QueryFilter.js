// GET /posts?author=Alice → return only posts by Alice.

app.get('/posts', async(req, res) => {
    const author = req.query.author
    const posts = await Post.find(author ?  { author } : {});
    res.json(posts);
})

// GET /stats → returns { "Alice":2,"Bob":1 } using Mongo aggregate.

app.get('/stats', async (req, res) => {
    const stats = await Post.aggregate([
        {$group: {_id: '$author', count: { $sum: 1 } } },
    ])
    const result = Object.fromEntries(data.map(d => [d._id, d.count]))
    res.json(result)
})