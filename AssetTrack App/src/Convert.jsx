
import { useState } from "react";
import { fetchConvert } from "./services";
import { MESSAGES } from "./constants";

function Convert({ setAccount, setStatus }) {
  const [fromAsset, setFromAsset] = useState('');
  const [toAsset, setToAsset] = useState('');
  const [amount, setAmount] = useState('');

  const exchangeRateToUSD = {
    BTC: 64836,
    ETH: 3153,
    USDT: 1,
    USD: 1
  }

  return (
    <div>
      <div className="exchange-rate-container">
        Exchange rate:
        <div className="exchange-rate">
          {Object.keys(exchangeRateToUSD).map((asset, index) => (
            <div key={index} className="asset">1 {asset} = {exchangeRateToUSD[asset]} USD</div>
          ))}
        </div>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();

        fetchConvert({ fromAsset, toAsset, amount, exchangeRateToUSD })
        .then( response => {
          const userAccount = response.userAccount;
          const convertStatus = response.convertStatus;
          setAccount(userAccount);
          setStatus(MESSAGES[convertStatus]);
        })
        .catch( err => {
          const errorStatus = err.error;
          setStatus(MESSAGES[errorStatus]);
        });

        setAmount('');
      }}
      >
        <div>
          <span>Convert: </span>
          <select 
            onChange={(e) => setFromAsset(e.target.value)}
          >
            <option>Select an asset</option>
            <option value='BTC'>BTC</option>
            <option value='ETH'>ETH</option>
            <option value='USDT'>USDT</option>
            <option value='USD'>USD</option>
          </select>
        </div>
        
        <span>Amount: </span>
        <input
          type="number"
          min={0}
          placeholder="Please enter the amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        
        <div>
          <span>To: </span>
          <select 
            onChange={(e) => setToAsset(e.target.value)}
          >
            <option>Select an asset</option>
            <option value='BTC'>BTC</option>
            <option value='ETH'>ETH</option>
            <option value='USDT'>USDT</option>
            <option value='USD'>USD</option>
          </select>
        </div>
        <div className="submit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Convert;
