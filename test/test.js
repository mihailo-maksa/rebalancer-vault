const hre = require('hardhat')
const { expect } = require('chai')

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
})
