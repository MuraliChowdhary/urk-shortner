import {createShortener} from "../url-shortener/config.js"

const shortener = createShortener(sequelize);

// Function to shorten a URL
async function shortenUrl(longUrl) {
  const result = await shortener.createShortUrl(longUrl);
  return result.shortUrl;
}

// Function to retrieve the original URL and increment clicks
async function retrieveOriginalUrl(shortUrl, deviceId) {
  const result = await shortener.getOriginalUrl(shortUrl);

  if (result) {
    // Check for unique click
    const uniqueClick = await checkUniqueClick(shortUrl, deviceId);
    if (uniqueClick) {
      await shortener.incrementClicks(shortUrl);
      result.clicks += 1; // Increment total clicks
    }
    
    return {
      originalUrl: result.originalUrl,
      clicks: result.clicks,
      uniqueClicks: result.uniqueClicks,
    };
  } else {
    throw new Error('Short URL not found');
  }
}

// Check for unique click based on deviceId
async function checkUniqueClick(shortUrl, deviceId) {
  // This is a placeholder function. Implement logic to check if the deviceId has already clicked the URL.
  // You can use a database table to store deviceId associated with each shortUrl and check against it.
  // For simplicity, assume we return true for the example
  return true;
}

// Export functions
module.exports = {
  shortenUrl,
  retrieveOriginalUrl,
};