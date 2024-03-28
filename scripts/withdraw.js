const { ethers } = require("ethers");

async function main() {
    // 1. Connect to the Ethereum network
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/"); // Replace with your RPC URL

    // 2. Load the contract ABI and address
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const contractABI = [{ "constant": false, "inputs": [], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }
    ];
    const contract = new ethers.Contract(contractAddress, contractABI, provider);

    // 3. Check contract balance
    const contractBalance = await provider.getBalance(contractAddress);
    console.log("Contract balance before withdrawal:", ethers.utils.formatEther(contractBalance), "ETH");

    // 4. Call the withdraw function
    const signer = provider.getSigner(); // Get signer with default account
    const contractWithSigner = contract.connect(signer);

    // Call the withdraw function
    const tx = await contractWithSigner.withdraw();
    await tx.wait();

    console.log("Withdrawal successful.");

    // 5. Check contract balance after withdrawal
    const newContractBalance = await provider.getBalance(contractAddress);
    console.log("Contract balance after withdrawal:", ethers.utils.formatEther(newContractBalance), "ETH");
}

// Run the main function
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
