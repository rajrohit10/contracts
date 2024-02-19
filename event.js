import * as ethers from "ethers";
const contractABI = require("./ABI_JSON");

const listenEvents = async () => {
  const contractAddress = "0x63fDdBc2501735B7A9A525803E145B5b2BB61984";
  const provider = new ethers.providers.WebSocketProvider(`wss://sepolia.era.zksync.dev/ws`);

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  // starts listening to Transfer events on contract
  contract.on("PoolCreated", (event) => {
    // optional filter parameters
    let options = {
      filter: { INDEXED_PARAMETER: VALUE }, // e.g { from: '0x48c6c0923b514db081782271355e5745c49wd60' }
      fromBlock: START_BLOCK_NUMBER, // e.g 15943000
      toBlock: END_BLOCK_NUMBER, // e.g 15943100
      data: event,
    };
    console.log(JSON.stringify(options, null, 4));
  });
};

listenEvents();
