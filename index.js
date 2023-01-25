const Moralis = require("moralis").default;
const { EvmChain } = require('@moralisweb3/evm-utils');

const main = async () =>{
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

    console.log(response?.result[0].name);
} catch (e) {
    console.error(e);
}

}
main()