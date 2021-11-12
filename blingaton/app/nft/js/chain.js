'use strict'

let voltaContract
let contractAddress = "0x34090Cc1df6D79aA28a7b1a50fe365b55aE4Ce45";
let hashes = [];
let ipfsAddress = 'https://gateway.pinata.cloud/ipfs/QmTChVvgzubRiwFA5W75Z3crzmnBJGHgNp8txfZazyrKKS/'

window.addEventListener('load', (event) => {

    loadWeb3();
    addVoltaNetwork();
    sendClaim();
   

   
console.log('The page has fully loaded ^ㅂ^')
});



async function retrieveTransferEvents(){
 try {
        let succesArr = await voltaContract.getPastEvents('TransferSingle', { fromBlock: 0, toBlock: 'latest' });
        console.log(succesArr);
    } catch(error){
        console.log(error.message);}}

//voltaContract = abi.at(contractAddress); 


async function loadContract(){
    let abi = [
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "uri",
                    "type": "string"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "ApprovalForAll",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "previousOwner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Paused",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "indexed": false,
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "TransferBatch",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "TransferSingle",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "value",
                    "type": "string"
                },
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "URI",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "Unpaused",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32[]",
                    "name": "hashes",
                    "type": "bytes32[]"
                }
            ],
            "name": "addClaimableCodeHashes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "codes",
                    "type": "string[]"
                }
            ],
            "name": "addClaimableCodes",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address[]",
                    "name": "accounts",
                    "type": "address[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                }
            ],
            "name": "balanceOfBatch",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "values",
                    "type": "uint256[]"
                }
            ],
            "name": "burnBatch",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "contractURI",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                }
            ],
            "name": "isApprovedForAll",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "code",
                    "type": "string[]"
                }
            ],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "nextId",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "pause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "paused",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256[]",
                    "name": "ids",
                    "type": "uint256[]"
                },
                {
                    "internalType": "uint256[]",
                    "name": "amounts",
                    "type": "uint256[]"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeBatchTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "operator",
                    "type": "address"
                },
                {
                    "internalType": "bool",
                    "name": "approved",
                    "type": "bool"
                }
            ],
            "name": "setApprovalForAll",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "unpause",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "uri",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "vouchers",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "exists",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "claimed",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ];
    
  

//  voltaContract = abi.at(contractAddress);
voltaContract = new web3.eth.Contract(abi, "0x34090Cc1df6D79aA28a7b1a50fe365b55aE4Ce45");
console.log(voltaContract.methods);
  retrieveTransferEvents();
}

function display (arr){

    for(let i = 0; i < arr.length ; i++){
         console.log(arr[i].returnValues.id) ;
    }
  

}
async function loadWeb3() {
    if (ethereum) {
      web3 = new Web3(ethereum);
      await ethereum.enable();
    } else {
      alert("MetaMask not found!");
      return;
    }

    let accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
    console.log(`Your account is ${web3.eth.defaultAccount}`);
    document.getElementById("metamask-acc").innerHTML +=` ${web3.eth.defaultAccount}`;
    
    loadContract();
   
  }

function sendClaim(){
    document.getElementById("claimForm").addEventListener('submit',function(e){
        e.preventDefault();
        let claim = document.getElementById("nft-claim").value;
        console.log(claim);
     
        clientMint(claim);
        document.getElementById("nft-claim").value = "NOice ( ͡° ͜ʖ ͡°) ";
    });

  }

  function leftFillNum(num) {
    let format = ".json";
    let paddedNum = num.toString().padStart(64, 0);
    let metadataJSON  = paddedNum.concat(format);
    console.log(metadataJSON);
    return metadataJSON;

}


 

 

  







  
  function clientMint(code) {


    voltaContract.methods.mint([code])
    .send({from: web3.eth.defaultAccount})
    .then(succes => console.log(succes))
    .catch(e => console.log(e));

  }


  function addString(code) { 
      voltaContract.methods.addClaimableCodes([code])
      .send({from: web3.eth.defaultAccount})
    .then(succes => console.log(succes))
    .catch(e => console.log(e)); }

//input format keccak 'apple' - 0x754a10e976ef61e474335eb6f2aba944473686d179ad7d337172f6efa923c0dd

    function pushToChain(hash){
        //console.log(hash);
      //  let payloadHash = web3.utils.asciiToHex(hash);
        //let payloadPad =  web3.utils.padLeft(payloadHash,64)

    //  let tempHash = hash.toString();

      //  console.log(typeof tempHash);

      let payloadHash = web3.utils.toHex(hash);
      console.log(payloadHash);
      console.log(typeof payloadHash);

      //let payloadHashBytes32 =  web3.utils.asciiToHex(payloadHash);

     // console.log(payloadHashBytes32);
      //console.log(typeof payloadHashBytes32);

      
     // let payloadPad =  web3.utils.padLeft(payloadHash,64)


       

     //   console.log(payloadPad);
        
      
        voltaContract.methods.addClaimableCodeHashes([payloadHash])
        .send({from: web3.eth.defaultAccount})
        .then(succes => console.log(succes))
        .catch(e => console.log(e));
      
      
      }


      async function addEnergyWebNetwork(){
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0xf6' }], 
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ 
                            chainId: '0xf6', 
                            chainName: "EWC",
                            nativeCurrency: {
                                name: "EWT",
                                symbol: "EWT",
                                decimals: 18,
                            },
                            rpcUrls: ["https://rpc.energyweb.org"],
                            blockExplorerUrls: ["https://explorer.energyweb.org/"],
                            iconUrls: [""],
                    
                        }],
                    });
                } catch (addError){
                    console.log('Did not add network');
                }
            }
        }
    }

    async function addVoltaNetwork(){
        try {
            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x12047' }], // 73799
                
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{ 
                            chainId: '0x12047', 
                            chainName: "VOLTA",
                            nativeCurrency: {
                                name: "VT",
                                symbol: "VT",
                                decimals: 18,
                            },
                            rpcUrls: ["https://volta-rpc.energyweb.org"],
                            blockExplorerUrls: ["https://volta-explorer.energyweb.org/"],
                            iconUrls: [""],
                    
                        }],
                    });
                } catch (addError){
                    console.log('Did not add network');
                }
            }
        }
    }

  



 




 




  function output(array){
    for(let i = 0; array.length;i++){
      document.getElementById("output").innerHTML += `<p>`+  array[i]  +  `</p> <br>`;
     }
  }
  


   







//collection 



function fetchPersonalNFT(arr){

    arr.forEach(entries => {
        if(entries.returnValues.to == web3.eth.defaultAccount){
                let temp = (entries.returnValues.id);
               // console.log(temp);
               // leftFillNum(temp);
                 fetch(ipfsAddress + leftFillNum(temp))
                .then(response => response.json())
                .then(error => console.log(error));
                console.log(data.url);
               
        }    
    }
    );


}


