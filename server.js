/*eslint-disable */
const path = require('path');
const server = require('express');
/* eslint-enable */

const app = server();
const port = process.env.PORT || 3000;

// app.use('*', (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.use(server.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.get('/registration', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.get('/chats', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.get('/account', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.get('/accountChangePassword', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.get('/accountEdit', (req, res) => {
  res.status(200).sendFile(`${__dirname}/dist/index.html`);
});

app.get('/error', (req, res) => {
  res.status(404).sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
