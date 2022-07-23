// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
require('dotenv').config({ path: '../.env' })
const Big = require('big.js')
const { ethers, upgrades } = require('hardhat')

const { WEI } = require('../helper')

const tokenAddr = process.env.TOKEN_ADDR

async function main() {
  if (!tokenAddr) return

  const [deployer] = await ethers.getSigners()
  console.log("Deploying contracts with the account:", deployer.address)

  const deployerBalance = (await deployer.getBalance()).toString()
  console.log("Account balance:", deployerBalance)

  if (deployerBalance === '0') return // deployment will fail

  const Contract = await ethers.getContractFactory('ContractTest')
  const contract = await upgrades.deployProxy(Contract, [
    tokenAddr,
  ])
  await contract.deployed()

  console.log('ContractTest deployed to:', contract.address)
  console.log('ContractTest details:', contract)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
