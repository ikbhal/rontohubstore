const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const flash = require('express-flash');
const session = require('express-session');
const app = express();
const db = require('./database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'muhammed', resave: false, saveUninitialized: true }));
app.use(flash());
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
  const links = await db.getAllLinks();
  res.render('index', { links, successMessage: req.flash('success') });
});

app.post('/add-link', async (req, res) => {
  const { productName, imageUrl, linkUrl } = req.body;
  await db.addLink(productName, imageUrl, linkUrl);
  req.flash('success', 'Link added successfully.');
  res.redirect('/');
});

app.delete('/delete-link/:id', async (req, res) => {
  const linkId = req.params.id;
  await db.deleteLink(linkId);
  req.flash('success', 'Link deleted successfully.');
  res.redirect('/');
});

const PORT = process.env.PORT || 3018;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
