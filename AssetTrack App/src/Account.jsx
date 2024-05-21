
import { useState, useEffect } from "react";
import Transfer from "./Transfer";
import Send from "./Send";
import Convert from "./Convert"
import { fetchGetAccount, fetchLogout } from "./services";
import { MESSAGES } from "./constants";
import BTC from './Images/btc.png';
import ETH from './Images/eth.png';
import USDT from './Images/usdt.png';
import USD from './Images/usd.png';

function Account({ user, setUserState, onLogout }) {
  const [operation, setOperation] = useState('home');
  const [account, setAccount] = useState({});
  const [status, setStatus] = useState('');

  const assetImg = {
    BTC: BTC,
    ETH: ETH,
    USDT: USDT,
    USD: USD,
  }

  function onOperation(e) {
    setOperation(e);
    setStatus('');
  }

  useEffect(
    () => {
      fetchGetAccount(user)
      .then( response => {
        const userAccount = response.userAccount;
        setAccount(userAccount);
      })
      .catch( err => {
        setUserState({
          username: user,
          isLoggedIn: true,
          error: MESSAGES[err.error]
        })
      });
    },
    [setUserState, user]
  );

  return (
    <div className="account-panel">
      <div className="opening">Welcome {user},</div>
      <div className="user-account">
        <div className="asset-title">Assets</div>
        <div className="assets">
          {
            Object.keys(account).map((asset, index) => (
              <div key={index} className="asset">
                <img src={assetImg[asset]} alt={asset} />
                <div>{asset}: {account[asset]}</div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="function">
        <button
          value='transfer'
          onClick={(e) => onOperation(e.target.value)}
        >Transfer</button>
        <button
          value='send'
          onClick={(e) => onOperation(e.target.value)}
        >Send</button>
        <button
          value='convert'
          onClick={(e) => onOperation(e.target.value)}
        >Convert</button>
      </div>

      <div className="function-display">
          {
            operation === 'home' ? ''
            : operation === 'transfer' ? <Transfer
              setAccount={setAccount}
              setStatus={setStatus}
            />
            : operation === 'send' ? <Send
              setAccount={setAccount}
              setStatus={setStatus}
            />
            : operation === 'convert' ? <Convert
              setAccount={setAccount}
              setStatus={setStatus}
            />
            : ''
          }
        </div>



      <div className="status">{status}</div>
        <button
          className="logout-button"
          onClick={() => {
          fetchLogout()
          onLogout()
        }}>Logout</button>

    </div>
  );
}

export default Account;
