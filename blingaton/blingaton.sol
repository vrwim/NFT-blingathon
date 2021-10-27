// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

//https://gateway.pinata.cloud/ipfs/QmVebXP3jEgjPjyJB1dy8Rv3dejyCat4LZHq3jdENm7ELx/0000000000000000000000000000000000000000000000000000000000000001.json


import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract BlingatonNFT is ERC1155,Ownable {
    
    bytes32 storedHash;
    
    constructor () ERC1155 ("https://gateway.pinata.cloud/ipfs/QmVebXP3jEgjPjyJB1dy8Rv3dejyCat4LZHq3jdENm7ELx/{id}.json" ){
        
    }
    
     //to test HashFunction use 0x6c00000000000000000000000000000000000000000000000000000000000000 for bytes32
   
    // inputs a string
    // outputs a bytes32 unique hash
    function HashFunction(string memory _password) public pure returns (bytes32 )  {
        return keccak256(abi.encodePacked(_password));
    }
    
    function HashFunctionAndStore(string memory _password) public onlyOwner{
        storedHash = HashFunction(_password);
    }
    
    function getStoredHash() public view returns (bytes32) {
        return storedHash;
    }
        
    
    
    function mint (string memory _entryCode) public onlyOwner {}
    
    memory clientHash = HashFunction(_entryCode);
    
    if(clientHash == storedHash) {
        
    }
    
}