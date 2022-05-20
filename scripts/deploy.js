const hre = require('hardhat')

async function main() {
  const MyVault = await hre.ethers.getContractFactory('MyVault')
  const myVault = await MyVault.deploy('Hello, Hardhat!')

  await myVault.deployed()

  console.log('Greeter deployed to: ', myVault.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
