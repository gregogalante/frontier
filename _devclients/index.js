import { ethers } from "ethers"



const MAIN_PUBLIC_KEY = '0x80b5F94B64871BdFbE9b581aF4360D1D5311C6B5'
const MAIN_PRIVATE_KEY = '356d84478609ba076181ba09d5dc227dd754cee5cdb649fbc28c0dd44fbd3e44'

const ALITH_PUBLIC_KEY = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac'
const ALITH_PRIVATE_KEY = '0x5fb92d6e98884f76de468fa3f6278f8807c48bebc13595d45af5bdc4da702133'

const provider = new ethers.JsonRpcProvider("http://localhost:9945")
const mainAccount = new ethers.Wallet(MAIN_PRIVATE_KEY, provider)
const alithAccount = new ethers.Wallet(ALITH_PRIVATE_KEY, provider)

const mainBalance = await provider.getBalance(MAIN_PUBLIC_KEY)
console.log('Main Balance:', ethers.formatEther(mainBalance))

const alithBalance = await provider.getBalance(ALITH_PUBLIC_KEY)
console.log('Alith Balance:', ethers.formatEther(alithBalance))

const _ = async () => {
  if (mainBalance <= 0) {
    // send half of alith balance to main account
    const amount = alithBalance / BigInt(2)
    const tx = await alithAccount.sendTransaction({
      to: MAIN_PUBLIC_KEY,
      value: amount
    })
    console.log('Transaction balance:', tx)
  }

  while (true) {
    // make main to send to alith a transaction with a custom payload
    const tx = await mainAccount.sendTransaction({
      to: ALITH_PUBLIC_KEY,
      value: 0,
      data: '0x1234',
      gasLimit: '1000000',
      gasPrice: '1000000000'
    })
    console.log('Transaction data:', tx)

    await new Promise(resolve => setTimeout(resolve, 6000))
  }
}
_()