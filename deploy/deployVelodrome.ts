import { Wallet } from "zksync-web3";
import * as ethers from "ethers";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import jsonConstants from "../script/constants/Optimism.json";
import { writeFile } from "fs/promises";
import { join } from "path";
// load env file
import dotenv from "dotenv";
dotenv.config();
interface VelodromeV2Output {
    veArtProxy: string;
    rewardsDistributor: string;
    factoryRegistry: string;
    forwarder: string;
    gaugeFactory: string;
    managedRewardsFactory: string;
    minter: string;
    poolFactory: string;
    router: string;
    VELO: string;
    voter: string;
    votingEscrow: string;
    votingRewardsFactory: string;
    }

// load wallet private key from env file
const PRIVATE_KEY = "0x69a0a908f3a6c7a26124b6566f973a8c5fc7a89fea1c112126dc5319db4b9ac6";

if (!PRIVATE_KEY)
  throw "⛔️ Private key not detected! Add it to the .env file!";

// An example of a deploy script that will deploy and call a simple contract.
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the  contract`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);
  const deployer = new Deployer(hre, wallet);

  //Deploying contract 1  - VELO
  const veloArtifact = await deployer.loadArtifact("Velo");
  const deploymentFee = await deployer.estimateDeployFee(veloArtifact, []);
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  console.log(`The deployment is estimated to cost ${parsedFee} ETH`);

  const VELO = await deployer.deploy(veloArtifact, []);
  console.log(
    "constructor args:" + VELO.interface.encodeDeploy([]),
  );
  const contractAddress = VELO.address;
  console.log(`${veloArtifact.contractName} was deployed to ${contractAddress}`);
//   jsonConstants.whitelistTokens.push(VELO.address);

  //Deploying contract 2  - POOL
  const poolArtifact = await deployer.loadArtifact("Pool");
  const poolDeploymentFee = await deployer.estimateDeployFee(poolArtifact, []);
  const poolparsedFee = ethers.utils.formatEther(poolDeploymentFee.toString());
  console.log(`The deployment is estimated to cost ${poolparsedFee} ETH`);

  const pool = await deployer.deploy(poolArtifact, []);
  console.log(
    "constructor args:" + pool.interface.encodeDeploy([]),
  );
  const poolcontractAddress = pool.address;
  console.log(`${poolArtifact.contractName} was deployed to ${poolcontractAddress}`);

   //Deploying contract 3  - POOL FACTORY
   const poolFactoryArtifact = await deployer.loadArtifact("PoolFactory");
   const poolFactoryDeploymentFee = await deployer.estimateDeployFee(poolFactoryArtifact, [poolcontractAddress]);
   const poolFactoryparsedFee = ethers.utils.formatEther(poolFactoryDeploymentFee.toString());
   console.log(`The deployment is estimated to cost ${poolFactoryparsedFee} ETH`);
 
   const poolFactory = await deployer.deploy(poolFactoryArtifact, [poolcontractAddress]);
   console.log(
     "constructor args:" + poolFactory.interface.encodeDeploy([poolcontractAddress]),
   );
   const poolFactorycontractAddress = poolFactory.address;
   console.log(`${poolFactoryArtifact.contractName} was deployed to ${poolFactorycontractAddress}`);
   await poolFactory.setFee(true, 1);
   await poolFactory.setFee(false, 1);

    //Deploying contract 4  - VotingRewardsFactory
    const votingRewardsFactoryArtifact = await deployer.loadArtifact("VotingRewardsFactory");
    const votingRewardsFactoryDeploymentFee = await deployer.estimateDeployFee(votingRewardsFactoryArtifact, []);
    const votingRewardsFactoryparsedFee = ethers.utils.formatEther(votingRewardsFactoryDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${votingRewardsFactoryparsedFee} ETH`);
    const votingRewardsFactory = await deployer.deploy(votingRewardsFactoryArtifact, []);
    console.log(
      "constructor args:" + votingRewardsFactory.interface.encodeDeploy([]),
    );
    const votingRewardsFactorycontractAddress = votingRewardsFactory.address;
    console.log(`${votingRewardsFactoryArtifact.contractName} was deployed to ${votingRewardsFactorycontractAddress}`);
    //Deploying contract 5  -  GaugeFactory
    const gaugeFactoryArtifact = await deployer.loadArtifact("GaugeFactory");
    const gaugeFactoryDeploymentFee = await deployer.estimateDeployFee(gaugeFactoryArtifact, []);
    const gaugeFactoryparsedFee = ethers.utils.formatEther(gaugeFactoryDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${gaugeFactoryparsedFee} ETH`);
    const gaugeFactory = await deployer.deploy(gaugeFactoryArtifact, []);
    console.log(
      "constructor args:" + gaugeFactory.interface.encodeDeploy([]),
    );
    const gaugeFactorycontractAddress = gaugeFactory.address;
    console.log(`${gaugeFactoryArtifact.contractName} was deployed to ${gaugeFactorycontractAddress}`);
    //Deploying contract 6  - ManagedRewardsFactory
    const managedRewardsFactoryArtifact = await deployer.loadArtifact("ManagedRewardsFactory");
    const managedRewardsFactoryDeploymentFee = await deployer.estimateDeployFee(managedRewardsFactoryArtifact, []);
    const managedRewardsFactoryparsedFee = ethers.utils.formatEther(managedRewardsFactoryDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${managedRewardsFactoryparsedFee} ETH`);
    const managedRewardsFactory = await deployer.deploy(managedRewardsFactoryArtifact, []);
    console.log(
      "constructor args:" + managedRewardsFactory.interface.encodeDeploy([]),
    );
    const managedRewardsFactorycontractAddress = managedRewardsFactory.address;
    console.log(`${managedRewardsFactoryArtifact.contractName} was deployed to ${managedRewardsFactorycontractAddress}`);
    //Deploying contract 7  - FactoryRegistry
    const factoryRegistryArtifact = await deployer.loadArtifact("FactoryRegistry");
    const factoryRegistryDeploymentFee = await deployer.estimateDeployFee(factoryRegistryArtifact, [poolFactorycontractAddress, votingRewardsFactorycontractAddress, gaugeFactorycontractAddress, managedRewardsFactorycontractAddress]);
    const factoryRegistryparsedFee = ethers.utils.formatEther(factoryRegistryDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${factoryRegistryparsedFee} ETH`);
    const factoryRegistry = await deployer.deploy(factoryRegistryArtifact, [poolFactorycontractAddress, votingRewardsFactorycontractAddress, gaugeFactorycontractAddress, managedRewardsFactorycontractAddress]);
    console.log(
      "constructor args:" + factoryRegistry.interface.encodeDeploy([poolFactorycontractAddress, votingRewardsFactorycontractAddress, gaugeFactorycontractAddress, managedRewardsFactorycontractAddress]),
    );
    const factoryRegistrycontractAddress = factoryRegistry.address;
    console.log(`${factoryRegistryArtifact.contractName} was deployed to ${factoryRegistrycontractAddress}`);
    //Deploying contract 8  - VeloForwarder
    const veloForwarderArtifact = await deployer.loadArtifact("VeloForwarder");
    const veloForwarderDeploymentFee = await deployer.estimateDeployFee(veloForwarderArtifact, []);
    const veloForwarderparsedFee = ethers.utils.formatEther(veloForwarderDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${veloForwarderparsedFee} ETH`);
    const veloForwarder = await deployer.deploy(veloForwarderArtifact, []);
    console.log(
      "constructor args:" + veloForwarder.interface.encodeDeploy([]),
    );
    const veloForwardercontractAddress = veloForwarder.address;
    console.log(`${veloForwarderArtifact.contractName} was deployed to ${veloForwardercontractAddress}`);
    
    //Deploying Libraries - BalanceLogicLibrary , DelegationLogicLibrary
    // const balanceLogicLibraryArtifact = await deployer.loadArtifact("BalanceLogicLibrary");
    // const balanceLogicLibraryDeploymentFee = await deployer.estimateDeployFee(balanceLogicLibraryArtifact, []);
    // const balanceLogicLibraryparsedFee = ethers.utils.formatEther(balanceLogicLibraryDeploymentFee.toString());
    // console.log(`The deployment is estimated to cost ${balanceLogicLibraryparsedFee} ETH`);
    // const balanceLogicLibrary = await deployer.deploy(balanceLogicLibraryArtifact, []);
    // console.log(
    //   "constructor args:" + balanceLogicLibrary.interface.encodeDeploy([]),
    // );
    // const balanceLogicLibrarycontractAddress = balanceLogicLibrary.address;
    // console.log(`${balanceLogicLibraryArtifact.contractName} was deployed to ${balanceLogicLibrarycontractAddress}`);
    // const delegationLogicLibraryArtifact = await deployer.loadArtifact("DelegationLogicLibrary");
    // const delegationLogicLibraryDeploymentFee = await deployer.estimateDeployFee(delegationLogicLibraryArtifact, []);
    // const delegationLogicLibraryparsedFee = ethers.utils.formatEther(delegationLogicLibraryDeploymentFee.toString());
    // console.log(`The deployment is estimated to cost ${delegationLogicLibraryparsedFee} ETH`);
    // const delegationLogicLibrary = await deployer.deploy(delegationLogicLibraryArtifact, []);
    // console.log(
    //   "constructor args:" + delegationLogicLibrary.interface.encodeDeploy([]),
    // );
    // const delegationLogicLibrarycontractAddress = delegationLogicLibrary.address;
    // console.log(`${delegationLogicLibraryArtifact.contractName} was deployed to ${delegationLogicLibrarycontractAddress}`);




    //Deploying contract 9  - VotingEscrow
    const votingEscrowArtifact = await deployer.loadArtifact("VotingEscrow");
    const votingEscrowDeploymentFee = await deployer.estimateDeployFee(votingEscrowArtifact, [ veloForwardercontractAddress, VELO.address, factoryRegistrycontractAddress]);
    const votingEscrowparsedFee = ethers.utils.formatEther(votingEscrowDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${votingEscrowparsedFee} ETH`);
    const votingEscrow = await deployer.deploy(votingEscrowArtifact, [ veloForwardercontractAddress, VELO.address, factoryRegistrycontractAddress]);
    console.log(
      "constructor args:" + votingEscrow.interface.encodeDeploy([veloForwardercontractAddress, VELO.address, factoryRegistrycontractAddress]),
    );
    const votingEscrowcontractAddress = votingEscrow.address;
    console.log(`${votingEscrowArtifact.contractName} was deployed to ${votingEscrowcontractAddress}`);
    //Deploying contract 10 - VeArtProxy
    const veArtProxyArtifact = await deployer.loadArtifact("VeArtProxy");
    const veArtProxyDeploymentFee = await deployer.estimateDeployFee(veArtProxyArtifact, [votingEscrowcontractAddress]);
    const veArtProxyparsedFee = ethers.utils.formatEther(veArtProxyDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${veArtProxyparsedFee} ETH`);
    const veArtProxy = await deployer.deploy(veArtProxyArtifact, [votingEscrowcontractAddress]);
    console.log(
      "constructor args:" + veArtProxy.interface.encodeDeploy([votingEscrowcontractAddress]),
    );
    const veArtProxycontractAddress = veArtProxy.address;
    console.log(`${veArtProxyArtifact.contractName} was deployed to ${veArtProxycontractAddress}`);
    //SetArtproxy - tx function call   await escrow.setArtProxy(artProxy.address);
    await votingEscrow.setArtProxy(veArtProxy.address);

    //Deploy contract 11 - RewardsDistributor
    const rewardsDistributorArtifact = await deployer.loadArtifact("RewardsDistributor");
    const rewardsDistributorDeploymentFee = await deployer.estimateDeployFee(rewardsDistributorArtifact, [votingEscrowcontractAddress]);
    const rewardsDistributorparsedFee = ethers.utils.formatEther(rewardsDistributorDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${rewardsDistributorparsedFee} ETH`);
    const rewardsDistributor = await deployer.deploy(rewardsDistributorArtifact, [votingEscrowcontractAddress]);
    console.log(
      "constructor args:" + rewardsDistributor.interface.encodeDeploy([votingEscrowcontractAddress]),
    );
    const rewardsDistributorcontractAddress = rewardsDistributor.address;
    console.log(`${rewardsDistributorArtifact.contractName} was deployed to ${rewardsDistributorcontractAddress}`);

    //Deploy contract 12 - Voter
    const voterArtifact = await deployer.loadArtifact("Voter");
    const voterDeploymentFee = await deployer.estimateDeployFee(voterArtifact, [veloForwardercontractAddress, votingEscrowcontractAddress, factoryRegistrycontractAddress, "0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746"]);
    const voterparsedFee = ethers.utils.formatEther(voterDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${voterparsedFee} ETH`);
    const voter = await deployer.deploy(voterArtifact, [veloForwardercontractAddress, votingEscrowcontractAddress, factoryRegistrycontractAddress, "0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746"]);
    console.log(
      "constructor args:" + voter.interface.encodeDeploy([veloForwardercontractAddress, votingEscrowcontractAddress, factoryRegistrycontractAddress,"0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746"]),
    );
    const votercontractAddress = voter.address;
    console.log(`${voterArtifact.contractName} was deployed to ${votercontractAddress}`);

    // await escrow.setVoterAndDistributor(voter.address, distributor.address);

    await votingEscrow.setVoterAndDistributor(voter.address, rewardsDistributor.address);

 
    //Deploy contract 13 - Router
    const routerArtifact = await deployer.loadArtifact("Router");
    const routerDeploymentFee = await deployer.estimateDeployFee(routerArtifact, [veloForwardercontractAddress, factoryRegistrycontractAddress, "0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746", poolFactorycontractAddress, votercontractAddress, jsonConstants.WETH]);
    const routerparsedFee = ethers.utils.formatEther(routerDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${routerparsedFee} ETH`);
    const router = await deployer.deploy(routerArtifact, [veloForwardercontractAddress, factoryRegistrycontractAddress, "0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746", poolFactorycontractAddress, votercontractAddress, jsonConstants.WETH]);
    console.log(
      "constructor args:" + router.interface.encodeDeploy([veloForwardercontractAddress, factoryRegistrycontractAddress, "0x25CbdDb98b35ab1FF77413456B31EC81A6B6B746", poolFactorycontractAddress, votercontractAddress, jsonConstants.WETH]),
    );
    const routercontractAddress = router.address;
    console.log(`${routerArtifact.contractName} was deployed to ${routercontractAddress}`);

    //Deploy contract 14 - Minter
    const minterArtifact = await deployer.loadArtifact("Minter");
    const minterDeploymentFee = await deployer.estimateDeployFee(minterArtifact, [votercontractAddress, votingEscrowcontractAddress, rewardsDistributorcontractAddress]);
    const minterparsedFee = ethers.utils.formatEther(minterDeploymentFee.toString());
    console.log(`The deployment is estimated to cost ${minterparsedFee} ETH`);
    const minter = await deployer.deploy(minterArtifact, [votercontractAddress, votingEscrowcontractAddress, rewardsDistributorcontractAddress]);
    console.log(
      "constructor args:" + minter.interface.encodeDeploy([votercontractAddress, votingEscrowcontractAddress, rewardsDistributorcontractAddress]),
    );
    const mintercontractAddress = minter.address;
    console.log(`${minterArtifact.contractName} was deployed to ${mintercontractAddress}`);
    await rewardsDistributor.setMinter(minter.address);
    await VELO.setMinter(minter.address);
    await voter.initialize(jsonConstants.whitelistTokens, minter.address);
    

    // ****************  Pool Factory does setSinkConverter function call - need to understand why 
    await votingEscrow.setTeam(jsonConstants.team);
    await poolFactory.setPauser(jsonConstants.team);
    await voter.setEmergencyCouncil(jsonConstants.team);
    await voter.setEpochGovernor(jsonConstants.team);
    await voter.setGovernor(jsonConstants.team);
    await factoryRegistry.transferOwnership(jsonConstants.team);
  
    await poolFactory.setFeeManager(jsonConstants.feeManager);
    await poolFactory.setVoter(voter.address);

    const outputDirectory = "script/constants/output";
    const outputFile = join(
      process.cwd(),
      outputDirectory,
      "VelodromeV2Output.json"
    );
    const output: VelodromeV2Output = {
        veArtProxy: veArtProxy.address,
        rewardsDistributor: rewardsDistributor.address,
        factoryRegistry: factoryRegistry.address,
        forwarder: veloForwarder.address,
        gaugeFactory: gaugeFactory.address,
        managedRewardsFactory: managedRewardsFactory.address,
        minter: minter.address,
        poolFactory: poolFactory.address,
        router: router.address,
        VELO: VELO.address,
        voter: voter.address,
        votingEscrow: votingEscrow.address,
        votingRewardsFactory: votingRewardsFactory.address,


      };
      try {
        await writeFile(outputFile, JSON.stringify(output, null, 2));
      } catch (err) {
        console.error(`Error writing output file: ${err}`);
      }





}