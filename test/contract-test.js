require('dotenv').config({ path: '../.env' })
const { expect } = require('chai')
const { ethers } = require('hardhat')
const Big = require('big.js')
const Chance = require('chance')

// Instantiate Chance so it can be used
const chance = new Chance()

const { WEI } = require('../helper')

const contractAddr = process.env.CONTRACT_ADDR
const tokenAddr = process.env.TOKEN_ADDR

let token
let contract

describe('Contract', function () {
  beforeEach(async function () {
    const Contract = await ethers.getContractFactory('Contract')
    contract = await Contract.attach(contractAddr)
  })

  it('Should set token correctly', async function () {
    const tx = await contract.setToken(tokenAddr)
    await tx.wait()

    const token = await contract.token()
    expect(token.addr).to.equal(tokenAddr)
  })
})
