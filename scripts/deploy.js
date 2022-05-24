const hre = require('hardhat')

async function main() {
  await hre.run('compile')

  const MyVault = await hre.ethers.getContractFactory('MyVault')
  const myVault = await MyVault.deploy()
  await myVault.deployed()

  console.log(`Deployed MyVault at ${myVault.address}`)

  await hre.run('verify:verify', {
    address: myVault.address,
  })
}

main()
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
