// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 
//ERC1155 
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC1155/ERC1155.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract NFTcontract is ERC1155, Ownable {
   
    uint256 public constant ARTWORK = 0;
    uint256 public constant PHOTO = 1;
    
    constructor() ERC1155("https://nft-tut.web.app/{id}.json") {
        _mint(msg.sender, ARTWORK, 1,"");
    
    }
    
    //the possibility to mine more
    
    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount,"");
    }
    
    function burn(address account, uint256 id, uint256 amount) public {
        require(msg.sender == account);
        _burn(account, id , amount);
        
    }
}