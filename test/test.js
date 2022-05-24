const hre = require('hardhat')
const { expect, assert } = require('chai')
const { ethers } = require('hardhat')

describe('MyVault', () => {
  let myVault

  beforeEach(async () => {
    await hre.run('compile')

    const MyVault = await hre.ethers.getContractFactory('MyVault')
    myVault = await MyVault.deploy()
    await myVault.deployed()
    console.log(`Deployed MyVault at ${myVault.address}`)
  })

  it('should return the correct version', async () => {
    const version = await myVault.version()
    expect(version).to.equal('1')
    assert.equal(version, '1')
  })

  it('should return zero DAI balance', async () => {
    const daiBalance = await myVault.getDaiBalance()
    assert.equal(daiBalance, 0) // initial DAI balance must be zero
  })

  it('should rebalance the portfolio', async () => {
    const accounts = await hre.ethers.getSigners()
    const owner = accounts[0]

    console.log(
      `Transfering ETH from owner: ${owner.address} to MyVault: ${myVault.address}`,
    )
    await owner.sendTransaction({
      to: myVault.address,
      value: ethers.utils.parseEther('1'),
    })

    await myVault.wrapETH()
    await myVault.updateEthPriceUniswap()
    await myVault.rebalance()

    const daiBalance = await myVault.getDaiBalance()
    console.log(`DAI balance after rebalancing: ${daiBalance}`)

    assert.isAbove(daiBalance, 0) // there must be at least some DAI balance
  })
})
