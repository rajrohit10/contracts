import * as dotenv from "dotenv";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-foundry";
// import "@matterlabs/hardhat-zksync-deploy";
// import "@matterlabs/hardhat-zksync-solc";
// import "@matterlabs/hardhat-zksync-verify";

dotenv.config();


module.exports ={
    defaultNetwork: "zksync",
    networks: {
        hardhat: {
        },
        sepolia: {
            url: `https://eth-sepolia.g.alchemy.com/v2/wJ4MOyRL_MQ9a3jJiFVpBGrfZf9jmVKL`,
            accounts: [`${process.env.PRIVATE_KEY_DEPLOY}`]
        },
        zksync: {
            url: `https://sepolia.era.zksync.dev`,
            ethNetwork: "sepolia", 
            zksync: true,
            accounts: [`${process.env.PRIVATE_KEY_DEPLOY}`],
            verifyURL: 'https://explorer.sepolia.era.zksync.dev/contract_verification'

        }
    },
    solidity: {
        compilers: [
            {
              version: "0.8.19",
            },
            {
              version: "0.8.20",
              settings: {},
            },
            {
                version: "0.8.0",
                settings: {},
              }
          ],
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    zksolc: { // need to reference zksolc compiler
        compilerSource: 'binary',
        version: "1.3.22",
        settings: {
            libraries: {
                  "contracts/art/Trig.sol:Trig": {
                    "Trig": "0xDfE367B10EBE44721ABd4698D3a600551ecBc0f7"
                  },
                  "contracts/art/PerlinNoise.sol:PerlinNoise": {
                    "PerlinNoise": "0x1fb34d433CE1D007C5C9C19b021AA896F8Cb18B1"
                  },
                  "contracts/libraries/DelegationLogicLibrary.sol:DelegationLogicLibrary": {
                    "DelegationLogicLibrary": "0xB14Cb52f8ff6b9A14b1FDCb1ED3c05f2eaD52029"
                  },
                  "contracts/libraries/BalanceLogicLibrary.sol:BalanceLogicLibrary": {
                    "BalanceLogicLibrary": "0xB6D3049FbC7849F3f990Fbb63e8D0Cf75CEC3490"
                  },
                  "contracts/art/PerlinNoise.sol": {
                    "PerlinNoise": "0xB30c4307270Dec94d254c414a2284A45255e47C0"
                  },
                  "contracts/art/Trig.sol": {
                    "Trig": "0xa0c97479A27a30FC5786DCDb8b6a568AD0a9a30c"
                  },
                  "contracts/libraries/BalanceLogicLibrary.sol": {
                    "BalanceLogicLibrary": "0xAc36bDE2f3e13e01371bbEfeFA313D4FE51d473c"
                  },
                  "contracts/libraries/DelegationLogicLibrary.sol": {
                    "DelegationLogicLibrary": "0xb32ef5B29C7ba7297ee6e1491D0ED0eF14391a04"
                  }
                },
      },
    }
}