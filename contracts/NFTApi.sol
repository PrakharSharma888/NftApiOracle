// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTApi is Ownable{

   struct nftDetials { 
        string nameNFT;
        address token_address_nft;
        string token_uri_nft;
        address minter_address_nft;
   }
   mapping(uint => nftDetials) public nfts;
   uint256 id = 0;
  
    event getNftsEvent(
        address _user, uint id
    );

    function getNfts(address _user) public returns(uint){
        id++;
        emit getNftsEvent(
            _user,id
        );
        return id;
    }
    
    function nftStore(uint _id,string memory _nameNFT,address _token_address_nft, string memory _token_uri_nft, address _minter_address_nft ) public{
        nfts[_id] = nftDetials(_nameNFT, _token_address_nft, _token_uri_nft, _minter_address_nft);
    }

    function retriveNFTs(uint _id) view public returns(string memory, address, string memory, address){
        return (nfts[_id].nameNFT,nfts[_id].token_address_nft,nfts[_id].token_uri_nft,nfts[_id].minter_address_nft);
    }
}
