
export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'network-error',
    INVALID_TRANSFER: 'invalid-transfer',
    INVALID_ASSET: 'invalid-asset',
    INVALID_AMOUNT: 'invalid-amount',
    INSUFFICIENT_FUNDS: 'insufficient-funds',
    INVALID_RECEIVER: 'invalid-receiver',
    RECEIVER_NOT_FOUND: 'receiver-not-found',
    DEPOSIT_SUCCESS: 'deposit-success',
    WITHDRAW_SUCCESS: 'withdraw-success',
    CONVERT_SUCCESS: 'convert-success'
  };
  
  export const MESSAGES = {
    [SERVER.AUTH_MISSING]: 'Error: User Not Found',
    [SERVER.AUTH_INSUFFICIENT]: 'Error: Invalid User',
    [SERVER.REQUIRED_USERNAME]: 'Error: Invalid Username',
    [CLIENT.NETWORK_ERROR]: 'Error: Network Disconnection',
    [CLIENT.INVALID_TRANSFER]: 'Error: Invalid Transfer',
    [CLIENT.INVALID_ASSET]: 'Error: Invalid Asset',
    [CLIENT.INVALID_AMOUNT]: 'Error: Invalid Amount',
    [CLIENT.INSUFFICIENT_FUNDS]: 'Error: Insufficient Funds',
    [CLIENT.INVALID_RECEIVER]: 'Error: Invalid Receiver',
    [CLIENT.RECEIVER_NOT_FOUND]: 'Error: Receiver Not Found',
    [CLIENT.DEPOSIT_SUCCESS]: 'Deposit Success!',
    [CLIENT.CONVERT_SUCCESS]: 'Convert Success!',
    [CLIENT.WITHDRAW_SUCCESS]: 'Withdraw Success!',
  };
  