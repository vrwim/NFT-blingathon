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
    constructor(string memory uri) ERC1155(uri) {
    }
    function addClaimableCodeHashes(bytes32[] memory hashes) public onlyOwner {
        for(uint i = 0; i < hashes.length; i++) {
            vouchers[hashes[i]] = NFTVoucher(true, false);
        }
    }
    function mint(string memory code) public {
        bytes32 hash = keccak256(abi.encodePacked(code));
        require(vouchers[hash].exists, "Hash does not exist");
        require(!vouchers[hash].claimed, "NFT has been claimed");
        _mint(msg.sender, nextId, 1, abi.encodePacked(block.number));
        vouchers[hash].claimed = true;
        nextId++;
    }
/*    function getOwnedTokens() public view returns (uint[] memory owned, uint[] memory notOwned) {
        uint[] memory owned;
        uint[] memory notOwned;
        for(uint i = 1; i < nextId; i++) {
            if(balanceOf(msg.sender, i) == 0) {
                notOwned.push(i);
            } else {
                owned.push(i);
            }
        }
    }*/
}