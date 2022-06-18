var Web3 = require('web3');
const web3 = new Web3("HTTP://127.0.0.1:7545");

const priv_key = "d3f49d624cd5260eb38f6452f023441d81cc8db23ef9ebe55e16c11ed3abca49";
const address = "0x1174aec44F0c2c80562ACD3B2c18778e12b514A3";
const recepient = "0x49b70B4F53dF5fdD5c179da969b779F60A5A535C";

async function eth_transfer() {
    var value = web3.utils.toWei('1', 'ether');
    var SignedTransaction = await web3.eth.accounts.signTransaction({
        from: address,
        to: recepient,
        value: value,
        gas: 2000000,
    }, priv_key);
    web3.eth.sendSignedTransaction(SignedTransaction.rawTransaction).then((receipt) => {
        console.log("full txn: ", receipt);
        // after the transaction completes, check out the value of the amount sent using transaction hash
        web3.eth.getTransaction(receipt.transactionHash)
        .then((txn) => {console.log("Upon seeking transaction again: ", Web3.utils.fromWei(txn.value), "ethers were received");})
        .catch((err) => {console.log("error: ", err);});
    }).catch((err) => {console.log(err)});
}

eth_transfer();
