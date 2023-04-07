const { ethers } = require("hardhat");

async function main() {
    const LearningChain = await ethers.getContractFactory("LearningChain");
    const learningChain = await LearningChain.deploy();
    
    await learningChain.deployed();
    
    console.log("LearningChain deployed to:", learningChain.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
