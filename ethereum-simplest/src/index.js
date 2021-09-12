"use strict";

import Web3 from 'web3';

const CONTRACT = '0xE0589937867afAC17394091b936585f85226ab2C';
const ABI = [{"inputs": [],"name":"get","outputs": [{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs": [{"internalType":"uint256","name":"num","type":"uint256"}],"name":"set","outputs": [],"stateMutability":"nonpayable","type":"function"}];

let address;
let balance;
let contract;
let getValue;

function displayInfo()
{
	document.getElementById('address').innerText = address;
	document.getElementById('balance').innerText = Web3.utils.fromWei(balance.toString(), 'ether').toLocaleString() + ' ETH';
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
	const tx = await contract.methods.set(setValue).send({from: address});
	document.getElementById('info').innerHTML = `<a href="https://rinkeby.etherscan.io/tx/${tx.transactionHash}" target="_blank">${tx.transactionHash}</a>`;
}

async function main()
{
	const web3 = new Web3(window.ethereum);
	await window.ethereum.enable();

	await refreshValues(web3);
	displayInfo(web3);

	document.getElementById('set-button').addEventListener('click', setValue);
	document.getElementById('refresh-button').addEventListener('click', async ()=>{await refreshValues(web3); displayInfo();});
}
main();
