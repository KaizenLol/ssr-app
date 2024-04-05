const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SSR App</title>
      <link rel="stylesheet" href="styles/styles.css">
    </head>
    <body>
      <h1>Hello, Server-Side Rendering!</h1>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${port}`);
});

