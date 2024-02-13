import { Wallet } from "zksync-web3";
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
export default async function (hre: HardhatRuntimeEnvironment) {
  console.log(`Running deploy script for the  contract`);

  // Initialize the wallet.
  const wallet = new Wallet(PRIVATE_KEY);

  // Create deployer object and load the artifact of the contract you want to deploy.
  const deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("VeloGovernor");
  const deploymentFee = await deployer.estimateDeployFee(artifact, [deployedContracts.votingEscrow,deployedContracts.voter]);
  const parsedFee = ethers.utils.formatEther(deploymentFee.toString());
  const governorContract = await deployer.deploy(artifact, [deployedContracts.votingEscrow,deployedContracts.voter]);
    const contractAddress = governorContract.address;
    console.log(`${artifact.contractName} was deployed to ${contractAddress}`);
    const governorContractFullyQualifedName = "contracts/VeloGovernor.sol:VeloGovernor";
    const verificationId= await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [deployedContracts.votingEscrow,deployedContracts.voter],
        contract: governorContractFullyQualifedName,
        bytecode: artifact.bytecode,

        });
    console.log("verificationId",verificationId);

    const artifact2 = await deployer.loadArtifact("EpochGovernor");
    const deploymentFee2 = await deployer.estimateDeployFee(artifact2, [deployedContracts.forwarder,deployedContracts.votingEscrow,deployedContracts.minter,deployedContracts.voter]);
    const parsedFee2 = ethers.utils.formatEther(deploymentFee2.toString());
    const epochGovernorContract = await deployer.deploy(artifact2, [deployedContracts.forwarder,deployedContracts.votingEscrow,deployedContracts.minter,deployedContracts.voter]);
    const contractAddress2 = epochGovernorContract.address;
    console.log(`${artifact2.contractName} was deployed to ${contractAddress2}`);
    const epochGovernorContractFullyQualifedName = "contracts/EpochGovernor.sol:EpochGovernor";
    const verificationId2= await hre.run("verify:verify", {
        address: contractAddress2,
        constructorArguments: [deployedContracts.forwarder,deployedContracts.votingEscrow,deployedContracts.minter,deployedContracts.voter],
        contract: epochGovernorContractFullyQualifedName,
        bytecode: artifact2.bytecode,

        });
    console.log("verificationId2",verificationId2);




}
