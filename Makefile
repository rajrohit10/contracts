-include .env

build:; forge build

deploy-sepolia-velo:
	forge script script/DeployVelodromeV2.s.sol:DeployVelodromeV2 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvvv
	
deploy-sepolia-gauges:
	forge script script/DeployGaugesAndPoolsV2.s.sol:DeployGaugesAndPoolsV2 --rpc-url $(SEPOLIA_RPC_URL) --private-key $(PRIVATE_KEY) --broadcast --verify --etherscan-api-key $(ETHERSCAN_API_KEY) -vvvvv
	


