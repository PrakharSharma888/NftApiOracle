// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTApi is Ownable{

   string nameNFT;
   address token_address_nft;
   string token_uri_nft;
   string metadata_nft;
   address minter_address_nft;
  
    event getNftsEvent(
        address _user
    );

    function getNfts(address _user) public {
        emit getNftsEvent(
            _user
        );

    }
    
    function nftStore(string memory _nameNFT,address _token_address_nft, string memory _token_uri_nft, 
        string memory _metadata_nft, address _minter_address_nft ) public onlyOwner{
        nameNFT = _nameNFT;
        token_address_nft = _token_address_nft;
        token_uri_nft = _token_uri_nft;
        metadata_nft = _metadata_nft;
        minter_address_nft = _minter_address_nft;
    }

    function retriveNFTs() view public returns(string memory, address, string memory, string memory, address){
        return (nameNFT,token_address_nft,token_uri_nft,metadata_nft,minter_address_nft);
    }
}
