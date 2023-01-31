const hre = require("hardhat");
const Moralis = require("moralis").default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');
const { json } = require("hardhat/internal/core/params/argumentTypes");

async function main() {


  const api = await hre.ethers.getContractFactory("NFTApi");
  const _api = await api.deploy();

  await _api.deployed();

  console.log(
    "Address :", _api.address
  );

  const transactionResponse = await _api.getNfts("0xd8da6bf26964af9d7eed9e03e53415d37aa96045")
  const transactionReceipt = await transactionResponse.wait()

  try {
    const address = transactionReceipt.events[0].args._user;

    const chain = EvmChain.ETHEREUM;

    Moralis.start({
        apiKey: 'XcYQc1b4QtGOUaMrHDdQUFRm1R9rF1jNfTk86YuNyDPy4WhA2fsw52X56XFaOehm',
    })

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });

   const jsonData = response.toJSON()
    console.log("Data: ",jsonData.result[20].name);
    const name = jsonData.result[20].name
    const token_address = jsonData.result[20].token_address
    const token_uri = jsonData.result[20].token_uri
    const metadata = jsonData.result[20].metadata
    const minter_address = jsonData.result[20].minter_address
    console.log(name,token_address,token_uri,metadata,minter_address)

    const receiptPromise = _api.nftStore(name,token_address,token_uri,minter_address);
    receiptPromise.then((receipt) => {
      console.log({ receipt });
      const addressNFT = _api.retriveNFTs()
      addressNFT.then((data) => {
        console.log("done")
        console.log("NFT Token Address: ",data)
      })
    });    
  } catch (e) {
    console.error(e);
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});