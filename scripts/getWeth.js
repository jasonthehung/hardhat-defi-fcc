const { getNamedAccounts, ethers } = require("hardhat")

const AMOUNT = ethers.utils.parseEther("0.02")

async function getWeth() {
    // 首先, 需要一個account
    const { deployer } = await getNamedAccounts()

    // 呼叫deposit function on the weth contract
    // 需要: abi (只要interface就可以了), contract address
    // 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2 (ethereum mainnet)
    const iWeth = await ethers.getContractAt(
        "IWeth",
        "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        deployer
    )
    const tx = await iWeth.deposit({ value: AMOUNT })
    tx.wait(1)
    const wethBalance = await iWeth.balanceOf(deployer)
    console.log(`Got ${wethBalance.toString()} WETH`)
}

module.exports = { getWeth, AMOUNT }
