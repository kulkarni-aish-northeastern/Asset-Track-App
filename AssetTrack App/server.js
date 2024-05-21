const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const sessions = require('./sessions');
const userInfo = require('./userInfo');
const userAccount = require('./userAccount');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !userInfo.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if (!userInfo.isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const userData = userInfo.getUserData(username);

  if (!userData) {
    userInfo.addUserData(username, userAccount.makeAccount());
  }

  res.cookie('sid', sid);
  res.json({ username });
});

app.get('/api/account', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !userInfo.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const userAccount = userInfo.getUserData(username).getAccount();

  res.cookie('sid', sid);
  res.json({ userAccount });
});


app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    // delete the session
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

app.patch('/api/transfer', (req, res) => {
  const { asset, amount, mode } = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !userInfo.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if (!mode) {
    res.status(400).json({ error: 'invalid-transfer' });
    return;
  }

  if (!asset) {
    res.status(400).json({ error: 'invalid-asset' });
    return;
  }

  if (!amount || amount === '0') {
    res.status(400).json({ error: 'invalid-amount' });
    return;
  }

  const parsedAmount = parseFloat(amount);
  const transferStatus = userInfo.getUserData(username).transfer(asset, parsedAmount, mode);
  if (transferStatus === 'insufficient-funds') {
    res.status(400).json({ error: transferStatus});
    return;
  }

  const userAccount = userInfo.getUserData(username).getAccount();
  res.json({ userAccount, transferStatus });
});

app.patch('/api/send', (req, res) => {
  const { asset, amount, receiver } = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !userInfo.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if (!asset) {
    res.status(400).json({ error: 'invalid-asset' });
    return;
  }

  if (!amount || amount === '0') {
    res.status(400).json({ error: 'invalid-amount' });
    return;
  }

  if (username === receiver) {
    res.status(400).json({ error: 'invalid-receiver' });
    return;
  }

  const parsedAmount = parseFloat(amount);
  const sendStatus = userInfo.getUserData(username).send(asset, parsedAmount);
  if (sendStatus === 'Insufficient funds') {
    res.status(400).json({ error: 'insufficient-funds'});
    return;
  }

  if (!userInfo.getUserData(receiver)) {
    res.status(400).json({ error: 'receiver-not-found'});
    return;
  }

  userInfo.getUserData(receiver).receive(asset, parsedAmount);

  const userAccount = userInfo.getUserData(username).getAccount();
  res.json({ userAccount, sendStatus });
});

app.patch('/api/convert', (req, res) => {
  const { fromAsset, toAsset, amount, exchangeRateToUSD } = req.body;
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (!sid || !userInfo.isValidUsername(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  if (!fromAsset || !toAsset || fromAsset === toAsset) {
    res.status(400).json({ error: 'invalid-asset' });
    return;
  }

  if (!amount || amount === '0') {
    res.status(400).json({ error: 'invalid-amount' });
    return;
  }

  const parsedAmount = parseFloat(amount);
  const convertStatus = userInfo.getUserData(username).convert({ fromAsset, toAsset, parsedAmount, exchangeRateToUSD });
  if (convertStatus !== 'convert-success') {
    res.status(400).json({ error: convertStatus});
    return;
  }

  const userAccount = userInfo.getUserData(username).getAccount();
  res.json({ userAccount, convertStatus });
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));