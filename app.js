const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const db = require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
  const links = await db.getAllLinks();
  res.render('index', { links });
});

app.post('/add-link', async (req, res) => {
  const { productName, imageUrl, linkUrl } = req.body;
  await db.addLink(productName, imageUrl, linkUrl);
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
