import Web3 from "web3";


var web3Provider;
if (window.ethereum) {
  web3Provider = window.ethereum;
  try {
    // 请求用户授权
    await window.ethereum.enable();
  } catch (error) {
    // 用户不授权时
    console.error("User denied account access");
  }
} else if (window.web3) {
  // 老版 MetaMask Legacy dapp browsers...
  web3Provider = window.web3.currentProvider;
} else {
  web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
}
export default web3 = new Web3(web3Provider);

