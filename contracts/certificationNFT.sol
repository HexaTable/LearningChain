// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract CertificationNFT is ERC721 {
    struct Certification {
        string courseName;
        string completionDate;
        address owner;
    }

    uint256 private _totalSupply;
    mapping (uint256 => Certification) private _certifications;

    constructor() ERC721("CertificationNFT", "CERT") {}

    function issueCertification(Certification memory certification) public returns (uint256) {
        uint256 newCertificationId = _totalSupply + 1;
        _mint(msg.sender, newCertificationId);

        _certifications[newCertificationId] = certification;
        _totalSupply++;

        return newCertificationId;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function getCertification(uint256 tokenId) public view returns (Certification memory) {
        require(_exists(tokenId), "CertificationNFT: certification does not exist");
        return _certifications[tokenId];
    }
}
