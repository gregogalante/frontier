import { ethers } from "ethers"



const ACCOUNT_PUBLIC_KEY = '0x80b5F94B64871BdFbE9b581aF4360D1D5311C6B5'
const ACCOUNT_PRIVATE_KEY = '356d84478609ba076181ba09d5dc227dd754cee5cdb649fbc28c0dd44fbd3e44'

const ALITH_PUBLIC_KEY = '0xf24FF3a9CF04c71Dbc94D0b566f7A27B94566cac'

const provider = new ethers.JsonRpcProvider("http://localhost:9945")
const account = new ethers.Wallet(ACCOUNT_PRIVATE_KEY, provider)

let balance = 0
while (true) {
  balance = await provider.getBalance(ACCOUNT_PUBLIC_KEY)
  console.log('Balance:', ethers.formatEther(balance))
  // if (balance > 0) {
  //   const tx = await account.sendTransaction({
  //     to: ALITH_PUBLIC_KEY,
  //     value: ethers.parseEther('0'),
  //     data: ethers.toUtf8Bytes('Hello Alith'),
  //     gasPrice: ethers.parseUnits('200', 'gwei'),
  //     gasLimit: 21000
  //   })
  //   console.log('Transaction:', tx.hash)
  // }
  await new Promise(resolve => setTimeout(resolve, 1000))
}