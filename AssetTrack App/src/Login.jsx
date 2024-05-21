
import { useState } from "react";
import { fetchLogin } from "./services";
import { MESSAGES } from "./constants";

function Login({ setUserState, onLogin }) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="login">
      <form onSubmit={(e) => {
        e.preventDefault();

        fetchLogin(inputValue)
        .then( response => {
          onLogin(response.username);
          return;
        })
        .catch( err => {
          setUserState({
            username: '',
            isLoggedIn: false,
            error: MESSAGES[err.error]
          })
        })

        setInputValue('')
      }}>                  
      <img className="profile" alt="default profile image" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-photo-183042379.jpg"/>
        <input
          className="login-input"
          value={inputValue}
          onInput={(e) => setInputValue(e.target.value)}
          placeholder="Please enter your name to login"
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  );
}

export default Login;
