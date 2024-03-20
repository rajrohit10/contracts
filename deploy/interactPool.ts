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
  const routerArtifact = await hre.artifacts.readArtifact("Router");

    const router= new Contract(deployedContracts.router, routerArtifact.abi, owner);

    //Interacting with pools:
    //Calling pool for function - to identify the pool address
    //Calling quote add liquidity function
    //Calling Add liquidity function
    //Finding a way for using the function - get amount out [NOTE: Route for the swap is required]-go to velodrom network tab to find out. 

  for (var i = 0; i < 1; i++) {
    const { stable, tokenA, tokenB } = jsonConstants.poolsV2[i];
    //if stable is true , then make stable 1 else make it 0
    let stable1 = 0;
    if(stable){
      stable1 = 1;

    }
    //Calling pool for function - to identify the pool address
    let poolFor= await router.functions["poolFor(address,address,bool,address)"](
      tokenA,
      tokenB,
      stable,
      deployedContracts.poolFactory,
      { gasLimit: 5000000 }


    )
    console.log("Pool For:",poolFor)
    console.log(stable,tokenA,tokenB)

    // Calling quote add liquidity function
    // let quoteAddLiquidity= await router.functions["quoteAddLiquidity(address,address,bool,address,uint256,uint256)"](
    //   tokenA,
    //   tokenB,
    //   stable,
    //   deployedContracts.poolFactory,
    //   100,
    //   250,
    //   { gasLimit: 5000000 }

    // )
    // const  {amountA,  amountB,  liquidity}= quoteAddLiquidity;
    // console.log("amountA,  amountB,  liquidity,",amountA,  amountB,  liquidity)

    let addLiquidity= await router.functions["addLiquidity(address,address,bool,uint256,uint256,uint256,uint256,address,uint256)"](
      tokenA,
      tokenB,
      stable,
      1000,
      2000,
      100,
      200,
      owner.address,
      1289464+5,
      { gasLimit: 5000000 }


    )
    console.log(addLiquidity)
    // await router.addLiquidity(tokenA,tokenB,stable,1000,2000,100,200,owner.address,1289464+5)





  }




}