// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTApi is Ownable{

    address nftToken_address;
  
    event getNftsEvent(
        address _user
    );

    function getNfts(address _user) public {
        emit getNftsEvent(
            _user
        );

    }
    
    function nftStore(address _nftToken_address) public onlyOwner returns(bool){
        nftToken_address = _nftToken_address;
        return true;
    }
}
