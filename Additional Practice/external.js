// Create async function fetchData() that returns { data:"ok" } after 1s. GET /fetch → await result and send it.

const fetchData = async () => {
    return new Promise(r => setTimeout(() => r({ data: 'ok' }), 1000))
}

app.get('/fetch', async (req, res) => {
    const result = await fetchData();
    res.json(result)
})

