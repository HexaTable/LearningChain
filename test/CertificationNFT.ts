const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HelloNFT", function () {
  it("Should mint a new token with the correct metadata", async function () {
    const [owner] = await ethers.getSigners();
    const ownerAddress = await owner.getAddress();
    const tokenURI = "https://myapi.com/tokens/1";
    
    // deploy the contract
    const HelloNFT = await ethers.getContractFactory("HelloNFT");
    const helloNFT = await HelloNFT.deploy();

    // mint a new token
    await helloNFT.connect(await ethers.getSigner(ownerAddress)).mintToken(ownerAddress, tokenURI);

    // check that the token was minted with the correct metadata
    const ownedTokens = await helloNFT.getOwnedTokens(ownerAddress);
    const tokenId = ownedTokens[0];
    const tokenMetaData = await helloNFT.getTokenMetaData(tokenId);
    expect(tokenMetaData.tokenId).to.equal(tokenId);
    expect(tokenMetaData.tokenURI).to.equal(tokenURI);
  });
});
