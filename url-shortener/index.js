import exoress from "express"
import bodyParser from 'body-parser'; 
import { shortenUrl, retrieveOriginalUrl } from './urlShorten.js';


const app = exoress();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint to shorten a URL
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  try {
    const shortUrl = await shortenUrl(longUrl);
    res.json({ shortUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to retrieve original URL and track clicks
app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const deviceId = req.headers['device-id']; // Example: get device ID from request header
  try {
    const result = await retrieveOriginalUrl(shortUrl, deviceId);
    res.json(result);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
