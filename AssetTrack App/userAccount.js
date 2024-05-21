function makeAccount() {
  const accountOperation = {};
  const accountInfo = {
    BTC: 0,
    ETH: 0,
    USDT: 0,
    USD: 0,
  };

  accountOperation.getAccount = function getAccount() {
    return accountInfo;
  }

  accountOperation.checkAccount = function checkAccount(asset, amount) {
    return !(accountInfo[asset] < amount);
  }

  accountOperation.transfer = function transfer(asset, amount, mode) {
    if (mode === 'Deposit') {
      accountInfo[asset] += amount;
      return 'deposit-success'
    } else if (mode === 'Withdraw') {
      if (!this.checkAccount(asset, amount)) {
        return 'insufficient-funds'
      } else {
        accountInfo[asset] -= amount;
        return 'withdraw-success';
      }
    }
  }

  accountOperation.send = function send(asset, amount) {
    if (!this.checkAccount(asset, amount)) {
      return 'insufficient-funds';
    }

    const mode = 'Withdraw';
    this.transfer(asset, amount, mode);
    return 'send-success';
  }

  accountOperation.receive = function receive(asset, amount) {
    const mode = 'Deposit';
    this.transfer(asset, amount, mode);
  }

  accountOperation.convert = function convert({ fromAsset, toAsset, parsedAmount, exchangeRateToUSD }) {
    if (fromAsset === toAsset) return 'alternative-pair';

    if (!this.checkAccount(fromAsset, parsedAmount)) {
      return 'insufficient-funds';
    }

    const amount = parsedAmount;
    const amountInUSD = amount * exchangeRateToUSD[fromAsset];
    const amountOut = amountInUSD / exchangeRateToUSD[toAsset];
    this.receive(toAsset, amountOut);
    this.send(fromAsset, amount);
    return 'convert-success';
  }

  return accountOperation;
}

module.exports = {
  makeAccount,
};