import path from 'path';

import server from 'express';

const app = server();
const port = process.env.PORT || 3000;

// app.use('*', (req, res) => res.sendFile(__dirname + "/dist/index.html"));

app.use(server.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/login.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/registration.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/chat.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/account.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/account_change_password.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/account_edit.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/error500.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/error.html', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
