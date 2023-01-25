const hre = require("hardhat");
const Moralis = require("moralis").default;
const { EvmChain } = require('@moralisweb3/evm-utils');

async function main() {


  const api = await hre.ethers.getContractFactory("NFTApi");
  const _api = await api.deploy();

  await _api.deployed();

  console.log(
    "Address :", _api.address
  );

  const call = await _api.getNfts("0x5aAB360f4eEC9C823175711d22D7D0C920D4481a")
  console.log(call)
  try {
    const address = '0x1234567890123456789012345678901234567890';

    const chain = EvmChain.ETHEREUM;

    Moralis.start({
        apiKey: 'IwGrsP6BGVVlWrbNvxGQIGYwG4rLfwPAlVBsBipKPDgIeJxX2A3W9Khr9lPKfpn9',
        // ...and any other configuration
    })

    const response = await Moralis.EvmApi.nft.getWalletNFTs({
        address,
        chain,
    });
    const nftName = response.result[0].name
    console.log(nftName);
  } catch (e) {
    console.error(e);
}
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
