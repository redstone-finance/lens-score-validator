import { ContractFactory, Wallet, providers } from "ethers";
import { REQUIRED_SCORE } from "../config";
import { abi, bytecode } from "../artifacts/ScoreValidator.json";

const privateKey = "";

(async () => {
  const provider = new providers.InfuraProvider(
    "goerli",
    "2b2559d7528740d69c6678aad2440b93"
  );
  const wallet = new Wallet(privateKey, provider);
  const factory = new ContractFactory(abi, bytecode, wallet);
  const contract = await factory.deploy(REQUIRED_SCORE);
  const contractDeployed = await contract.deployed();
  console.log(`Contract address: ${contractDeployed.address}`);
})();
