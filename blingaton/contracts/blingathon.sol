// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.9;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";



contract BLINGhack is ERC1155, Ownable, Pausable, ERC1155Burnable {
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

        function addClaimableCodes(string[] memory codes) public onlyOwner {
        for(uint i = 0; i < codes.length; i++) {
            vouchers[keccak256(abi.encodePacked(codes[i]))] = NFTVoucher(true, false);
        }
    }
    
   /* function uri(uint256 _tokenId) override public view returns(string memory){
        return string(abi.encodePacked("https://gateway.pinata.cloud/ipfs/QmTChVvgzubRiwFA5W75Z3crzmnBJGHgNp8txfZazyrKKS/",
        Strings.toString(_tokenId),".json"
        )
        
        );
    }*/
    
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
    
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
    
    function burn(address account, uint256 tokenId) public onlyOwner {
        _burn(account,tokenId,1);
        
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