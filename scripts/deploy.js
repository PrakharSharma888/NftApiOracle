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

  const transactionResponse = await _api.getNfts("0x1234567890123456789012345678901234567890")
  const transactionReceipt = await transactionResponse.wait()
  // console.log(transactionReceipt.events[0])
  // console.log(transactionReceipt.events[0].args._user)
  //const call = await _api.getNfts("0x5aAB360f4eEC9C823175711d22D7D0C920D4481a")
  //console.log(call)
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
    // const nftName = response.result[1].name
    // console.log(nftName);
   // const n = response.result[12].name
   const jsonData = response.toJSON()
    console.log("Data: ",jsonData.result[0].token_address);
    const returnValue = jsonData.result[0].token_address

    const receiptPromise = _api.nftStore(returnValue);
    receiptPromise.then((receipt) => {
      console.log({ receipt });
    });

    //console.log(n);
  } catch (e) {
    console.error(e);


}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});