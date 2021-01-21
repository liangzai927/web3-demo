<template>
  <div class="hello">
    <div>getCurrentNumbers: {{ currentNumber }}</div>
    <div>getCurrentPlayers: {{ currentPlayers }}</div>
    <div>getPeriod: {{ period }}</div>
    <div>getTotalMoney: {{ totalMoney }}</div>
    <div>
      getWinnerAddresses: {{ winnerAddress.winnerAddress }} 、
      {{ winnerAddress.winnerNum }}
    </div>
    <div>numOfPlayers: {{ numOfPlayers }}</div>
    <input type="text" v-model="num" />
    <button @click="start">下注</button>

  </div>
</template>

<script>
import Web3 from "web3";
import abi from "../ABI/abi.json";
import BigNumber from "bignumber.js";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      web3: null,
      address: "",
      currentNumber: 0,
      currentPlayers: 0,
      period: 0,
      totalMoney: 0,
      winnerAddress: 0,
      numOfPlayers: 0,
      num: "",
      metacoin: "",
    };
  },
  methods: {
    async init() {
      // let web3 = new Web3()
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
      this.web3 = new Web3(web3Provider);

      this.address = await this.web3.eth.getAccounts();

      this.getData();

      // let infoContract = new this.web3.eth.Contract(abi); //创建一个合约实例
      // let info = infoContract.at("0x8140D2653910a6Fb36170144Bb131db41471736f");
      // console.log(info);
    },
    async getData() {
      let ethAddress = "0x8140D2653910a6Fb36170144Bb131db41471736f";

      this.web3.eth.defaultAccount = this.address[0];
      console.log(this.address);
      // console.log(this.web3.eth.defaultAccount);
      this.metacoin = new this.web3.eth.Contract(abi, ethAddress, {
        from: this.address[0],
        // gasPrice, //每次交易量 wei 字符串
        // gas, //交易最大量 wei Number
      });

      //根据接口获取数据 并展示
      this.currentNumber = await this.metacoin.methods
        .getCurrentNumbers()
        .call();
      this.currentPlayers = await this.metacoin.methods
        .getCurrentPlayers()
        .call();
      this.period = await this.metacoin.methods.getPeriod().call();
      this.totalMoney = await this.metacoin.methods.getTotalMoney().call();
      this.winnerAddress = await this.metacoin.methods
        .getWinnerAddresses()
        .call();
      this.numOfPlayers = await this.metacoin.methods.numOfPlayers().call();
    },
    async lisen() {
      //监听账户变换
      window.ethereum.on("accountsChanged", (accounts) => {
        this.address = accounts;
        this.num = "";
        this.getData();
      });

      // 监听网络切换
      window.ethereum.on("networkChanged", function (networkIDstring) {
        console.log(networkIDstring);
      });
    },
    async start() {
      let gas = await this.web3.eth.getBalance(this.address[0]);
      console.log(gas);
      let eth = this.web3.utils.toWei(gas); //ETH转wei
      // let eth = this.web3.utils.fromWei(gas); //wei转ETH
      // let gasPrice = new BigNumber(100000000000000000);
      // let gas = new BigNumber(1000000000000000000);
      if (eth > 1 && this.num)
        this.metacoin.methods.startGame(this.num).send({
          gasPrice: "2000000000", //该交易的gas价格
          gas: 100000000, //该交易的gas上线
          value: 200, //交易金额
        });
      else alert("用户余额不足或没有输入下注数字");
      // console.log(this.num);
    },
  },
  mounted() {
    this.init();
    this.lisen();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
