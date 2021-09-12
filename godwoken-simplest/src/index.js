"use strict";

import Web3 from 'web3';
import {PolyjuiceHttpProvider} from '@polyjuice-provider/web3';

const WEB3_PROVIDER_URL = 'https://godwoken-testnet-web3-rpc.ckbapp.dev';
const CONTRACT = '0x7252D904e04C1b5b10bF4Fb5A0b5c2863044871A';
const ABI = [{"inputs": [],"name":"get","outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs": [{"internalType":"uint256","name":"num","type":"uint256"}],"name":"set","outputs": [],"stateMutability":"nonpayable","type":"function"}];
const DEFAULT_SEND_OPTIONS = {gas: 6000000};

let address;
let balance;
let contract;
let getValue;

function displayInfo()
{
	document.getElementById('address').innerText = address;
	document.getElementById('balance').innerText = (balance/100000000n).toLocaleString() + ' CKB';
	document.getElementById('contract').innerText = CONTRACT;
	document.getElementById('get').innerText = getValue;
}

async function refreshValues(web3)
{
	address = window.ethereum.selectedAddress;
	balance = BigInt(await web3.eth.getBalance(address));
	contract = new web3.eth.Contract(ABI, CONTRACT);
	getValue = await contract.methods.get().call();
}

async function setValue()
{
	document.getElementById('info').innerHTML = 'Sending and confirming TX...';
	const setValue = BigInt(document.getElementById('set').value);
	const sendOptions =
	{
		...DEFAULT_SEND_OPTIONS,
		from: address
	};
	const tx = await contract.methods.set(setValue).send(sendOptions);
	document.getElementById('info').innerHTML = `${tx.transactionHash}`;
}

async function main()
{
	const provider = new PolyjuiceHttpProvider(WEB3_PROVIDER_URL, {web3Url: WEB3_PROVIDER_URL});
	const web3 = new Web3(provider);
	await window.ethereum.enable();

	await refreshValues(web3);
	displayInfo();

	document.getElementById('set-button').addEventListener('click', setValue);
	document.getElementById('refresh-button').addEventListener('click', async ()=>{await refreshValues(web3); displayInfo();});
}
main();
