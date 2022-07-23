// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config({ path: '../.env' })
const { ethers, upgrades } = require('hardhat')

const contractAddr = process.env.CONTRACT_TEST_ADDR

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  const deployerBalance = (await deployer.getBalance()).toString()
  console.log("Account balance:", deployerBalance)

  if (deployerBalance === '0') return // deployment will fail

  const Contract = await ethers.getContractFactory('ContractTest')
  const upgradedContract = await upgrades.upgradeProxy(
    contractAddr,
    Contract,
  )

  console.log('contract upgraded addr:', upgradedContract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
