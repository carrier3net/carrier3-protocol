import { ethers, run } from "hardhat";

function sleep(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function main() {
  const args = [
    "ExampleToken",
    "C3ET",
    18
  ]

  const contract = await ethers.deployContract("ExampleToken", args);

  await contract.deployed();

  console.log(
    `contract deployed to ${contract.address}`
  );
  
  await sleep(20000);

  await run("verify:verify", {
    address: contract.address,
    constructorArguments: args,
    contract: "contracts/ExampleToken.sol:ExampleToken"
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
