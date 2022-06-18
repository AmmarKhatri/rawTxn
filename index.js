var Web3 = require('web3');
const web3 = new Web3("HTTP://127.0.0.1:7545");

const priv_key = "<PRIVATE_KEY>";
const address = "<PUBLIC_ADDRESS>";
const recepient = "<RECEIVER_ADDRESS>";

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
        web3.eth.getTransaction(receipt.transactionHash);
        .then((txn) => {console.log("Upon seeking transaction again: ", Web3.utils.fromWei(txn.value), "ethers were received");})
        .catch((err) => {console.log("error: ", err);});
    }).catch((err) => {console.log(err)});
}

eth_transfer();
