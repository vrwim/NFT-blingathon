// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/contracts/access/Ownable.sol";

contract BLINGhack is ERC1155, Ownable {
    struct NFTVoucher {
        bool exists;
        bool claimed;
    }

    mapping(bytes32 => NFTVoucher) public vouchers;
    uint public nextId = 1;
    
    constructor(string memory uri) ERC1155("https://gateway.pinata.cloud/ipfs/QmTChVvgzubRiwFA5W75Z3crzmnBJGHgNp8txfZazyrKKS/{id}.json") {
        
    }
    
    function addClaimableCodeHashes(bytes32[] memory hashes) public onlyOwner {
        for(uint i = 0; i < hashes.length; i++) {
            vouchers[hashes[i]] = NFTVoucher(true, false);
        }
    }
    
    function contractURI() public view returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/QmTChVvgzubRiwFA5W75Z3crzmnBJGHgNp8txfZazyrKKS/{id}.json";
    }
    
    function mint(string[] memory code) public {
        bytes32 hash = keccak256(abi.encodePacked(code[0]));
        require(vouchers[hash].exists, "Hash does not exist");
        require(!vouchers[hash].claimed, "NFT has been claimed");
        _mint(msg.sender, nextId, 1, abi.encodePacked(block.number));
        vouchers[hash].claimed = true;
        nextId++;
    }
}