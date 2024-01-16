-include .env

build:; forge build

deploy-sepolia:
	forge script script/Deploy.ts --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvvv

deploy-zksync:
	forge script script/DeploySinkDrain.s.sol:DeploySinkDrain --rpc-url $(ZKSYNC_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast  -vvvvv
	