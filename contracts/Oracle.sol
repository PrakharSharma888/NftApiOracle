// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "./NFTApi.sol";

contract NFTOracle {
    
    NFTApi public contractB;

    constructor(address _contractB) {
        contractB = NFTApi(_contractB);
    }

    function getNFTs(address userAddress) public returns(string memory, address, string memory, address){
        contractB.getNfts(userAddress);
        return contractB.retriveNFTs();
    }
}