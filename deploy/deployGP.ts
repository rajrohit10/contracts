import { Wallet,Contract,Provider } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import deployedContracts from "../script/constants/output/VelodromeV2Output.json";
import jsonConstants from "../script/constants/Optimism.json";




// load env file
import dotenv from "dotenv";
dotenv.config();

// load wallet private key from env file
const PRIVATE_KEY = "0x69a0a908f3a6c7a26124b6566f973a8c5fc7a89fea1c112126dc5319db4b9ac6";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {

  console.log(`Running deploy script for the  contract`);
  const provider = new Provider("https://sepolia.era.zksync.dev");


  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);
  const owner = new Wallet(PRIVATE_KEY, provider);


  const poolFactoryArtifact = await hre.artifacts.readArtifact("PoolFactory");
    const voterArtifact = await hre.artifacts.readArtifact("Voter");

    const poolFactory= new Contract(deployedContracts.poolFactory, poolFactoryArtifact.abi, owner);
    const voter= new Contract(deployedContracts.voter, voterArtifact.abi, owner);
    //whitelisting tokens:
    // const whitelistedTokens = jsonConstants.whitelistTokens;
    // for (var i = 0; i < whitelistedTokens.length; i++) {
    //   await voter.whitelistToken(whitelistedTokens[i], { gasLimit: 50000000 });
    // }


// Deploy non-VELO pools and gauges
  for (var i = 0; i < jsonConstants.poolsV2.length; i++) {
    const { stable, tokenA, tokenB } = jsonConstants.poolsV2[i];
    //if stable is true , then make stable 1 else make it 0
    let stable1 = 0;
    if(stable){
      stable1 = 1;
    }
    await poolFactory.functions["createPool(address,address,uint24)"](
      tokenA,
      tokenB,
      stable1,
      { gasLimit: 5000000 }
    );
    let pool = await poolFactory.functions["getPool(address,address,bool)"](
      tokenA,
      tokenB,
      stable,
      {
        gasLimit: 5000000,
      }
    );
    console.log("pool non Velo  ",pool);
    let gauge= await voter.functions["createGauge(address,address)"](
      deployedContracts.poolFactory, // PoolFactory (v2)
      pool[0],
      { gasLimit: 5000000 }
    );

    // await voter.createGauge(
    //   deployedContracts.poolFactory, // PoolFactory (v2)
    //   pool[0],
    //   { gasLimit: 5000000 }
    // );
    // console.log("gauge",gauge);
  }

  // Deploy VELO pools and gauges
  for (var i = 0; i < jsonConstants.poolsVeloV2.length; i++) {
    const [stable, token] = Object.values(jsonConstants.poolsVeloV2[i]);
    await poolFactory.functions["createPool(address,address,bool)"](
      deployedContracts.VELO,
      token,
      stable,
      {
        gasLimit: 5000000,
      }
    );
    let pool = await poolFactory.functions["getPool(address,address,bool)"](
      deployedContracts.VELO,
      token,
      stable,
      {
        gasLimit: 5000000,
      }
    );
    console.log("pool   ",pool);

    let gauge= await voter.functions["createGauge(address,address)"](
      deployedContracts.poolFactory, // PoolFactory (v2)
      pool[0],
      { gasLimit: 5000000, }
    );

  }




}