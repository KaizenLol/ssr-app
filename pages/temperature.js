// pages/api/temperature.js
const PAULURL = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/paul-temperature/data`;
const LUISURL = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/luis-temperature/data`;
const headers = {
  "X-AIO-Key": ADAFRUIT_IO_KEY,
};

export default async function handler(req, res) {
  try {
    const paulResponse = await fetch(PAULURL, { headers });
    const luisResponse = await fetch(LUISURL, { headers });

    if (paulResponse.ok && luisResponse.ok) {
      const paulData = await paulResponse.json();
      const luisData = await luisResponse.json();

      res.status(200).json({ paulData, luisData });
    } else {
      console.error('Error fetching data');
      res.status(500).end('Internal Server Error');
    }
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).end('Internal Server Error');
  }
}
