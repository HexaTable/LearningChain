// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract HelloNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => uint256[]) private _ownedTokens;

    struct TokenMetadata {
        uint256 tokenId;
        uint256 timeStamp;
        string tokenURI;
    }

    mapping(uint256 => TokenMetadata) private _tokenMetaData;

    constructor() ERC721("HelloNFT", "HNFT") {}

    function mintToken(address recipient, string memory tokenURI) public onlyOwner {
        require(owner() != recipient, "Recipient cannot be the owner of the contract");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(recipient, newTokenId);

        _tokenMetaData[newTokenId] = TokenMetadata(newTokenId, block.timestamp, tokenURI);
        _ownedTokens[recipient].push(newTokenId);
    }

    function getOwnedTokens(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function getTokenMetaData(uint256 tokenId) public view returns (TokenMetadata memory) {
        require(_exists(tokenId), "Token not found");
        return _tokenMetaData[tokenId];
    }
}
