import * as ethers from "ethers";
const contractABI = require("./artifacts-zk/contracts/factories/PoolFactory.sol/PoolFactory.json");

const listenEvents = async () => {
  const contractAddress = "0x4626656B02521208BAD263c8232d2EbE20C7B050";
  const provider = new ethers.providers.WebSocketProvider(`wss://sepolia.era.zksync.dev/ws`);

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // Subscribe to PoolCreated events
  contract.on("PoolCreated", (event) => {
    console.log("PoolCreated event:", event);
  });

  // Handle errors
  contract.on("error", (error) => {
    console.error("Error:", error);
  });

  console.log("Listening for PoolCreated events...");

  // You may want to add a delay between event checks to avoid overwhelming the node
  // Adjust the delay time according to your needs
  const delay = 5000; // Delay in milliseconds (5 seconds in this example)

  // Run indefinitely to continuously listen for events
  while (true) {
    await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay
  }
};

listenEvents();
