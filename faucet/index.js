const express = require('express');

const Common = require('@ethereumjs/common').default;
const { Transaction } = require('@ethereumjs/tx');
const { Address } = require('ethereumjs-util');
const Web3 = require('web3');
const { HttpProvider } = require('web3-core');
const cors = require('cors');

const app = express();
const port = 3000;
const common = Common.custom({ name: "energy-web-chain", chainId: 246, networkId: 246, url: "https://rpc.energyweb.org/" });

let privateKey = Buffer.from('<YOUR PRIVATE KEY HERE>', 'hex');

let web3 = new Web3(new Web3.providers.HttpProvider("https://rpc.energyweb.org/"));

app.use(cors());

app.get("/faucet/:address", async (request, response) => {
    const address = request.params.address;
    const myAddress = Address.fromPrivateKey(privateKey).toString();

    let result = await web3.eth.getBalance(address);

    if(result > 10000000000000000) {
        console.log(`This address has enough`);
        response.status(429).send("Don't be a dick");
    }
    console.log(`Sending EWT to ${address}`);

    const txParams = {
        from: myAddress,
        nonce: await web3.eth.getTransactionCount(myAddress, 'latest'),
        gasPrice: 150,
        gasLimit: 21000,
        to: address,
        value: 1000000000000000
    };

    const signedTx = Transaction.fromTxData(txParams, { common }).sign(privateKey);
    const serializedTx = signedTx.serialize().toString("hex");

    console.log(`Is valid: ${signedTx.validate()}`);

    web3.eth.sendSignedTransaction("0x" + serializedTx)
        .on('transactionHash', function (hash) {
            console.log('transactionHash');
            console.log(hash);

            response.status(200).send({transaction: hash});
        })
        .on('error', function (error) {
            response.status(500).send({error: error});
        });
});

app.listen(port, () => console.log(`Faucet app listening on port ${port}!`));