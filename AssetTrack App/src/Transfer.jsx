
import { useState } from "react";
import { fetchTransfer } from "./services";
import { MESSAGES } from "./constants";

function Transfer({ setAccount, setStatus }) {
  const [mode, setMode] = useState('')
  const [asset, setAsset] = useState('');
  const [amount, setAmount] = useState('');

  function transfer(amount) {
    fetchTransfer({ asset, amount, mode })
    .then( response => {
      const userAccount = response.userAccount;
      const responseStatus = response.transferStatus
      setStatus(MESSAGES[responseStatus]);
      setAccount(userAccount);
    })
    .catch( err => {
      const errorStatus = err.error;
      setStatus(MESSAGES[errorStatus]);
    });
  }

  return (
    <div className="wallet">
     <label className="transfer">
        <input
          type="radio"
          value='Deposit'
          checked={mode === 'Deposit'}
          onChange={(e) => setMode(e.target.value)}
        />
        Deposit
      </label>
      <label className="transfer">
        <input
          type="radio"
          value='Withdraw'
          checked={mode === 'Withdraw'}
          onChange={(e) => setMode(e.target.value)}
        />
        Withdraw
      </label>

      <div>
        <label>{mode ? `${mode}: ` : ''}</label>
        <select 
          onChange={(e) => setAsset(e.target.value)}
        >
          <option value=''>Select an asset</option>
          <option value='BTC'>BTC</option>
          <option value='ETH'>ETH</option>
          <option value='USDT'>USDT</option>
          <option value='USD'>USD</option>
        </select>

        <form onSubmit={(e) => {
          e.preventDefault();

          transfer(amount)
          setAmount('')
        }}>
          <div>
            <label>To: </label>
            <input 
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter the amount you want to "
            />
          </div>

          <div className="submit">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Transfer;
