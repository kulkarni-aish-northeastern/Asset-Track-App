
import { useState } from "react";
import { fetchSend } from "./services";
import { MESSAGES } from "./constants";

function Send({ setAccount, setStatus }) {
  const [asset, setAsset] = useState('');
  const [amount, setAmount] = useState('');
  const [receiver, setReceiver] = useState('');

  return (
    <div className="send">
      <span>Send: </span>
      <select 
        onChange={(e) => setAsset(e.target.value)}
      >
        <option>Select an asset</option>
        <option value='BTC'>BTC</option>
        <option value='ETH'>ETH</option>
        <option value='USDT'>USDT</option>
        <option value='USD'>USD</option>
      </select>

      <form onSubmit={(e) => {
        e.preventDefault();

        fetchSend({ asset, amount, receiver })
        .then( response => {
          const userAccount = response.userAccount;
          const reponseStatus = response.sendStatus
          setStatus(MESSAGES[reponseStatus]);
          setAccount(userAccount);
        })
        .catch( err => {
          const errorStatus = err.error;
          setStatus(MESSAGES[errorStatus]);
        })

        setAmount('');
        setReceiver('');
      }}
      >
        <div>
          <label>
            <span>Amount: </span>
            <input 
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter the amousnt"
            />
          </label>
        </div>
        
        
        <div>
          <label>
            <span>To: </span>
            <input
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="Please enter the wallet you want to send"
            />
          </label>
        </div>
        
        <div className="submit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Send;
