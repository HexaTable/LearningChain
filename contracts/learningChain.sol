// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LearningChain is ERC721, Ownable {
    uint256 public tokenCounter;

    struct Course {
        string id;
        string name;
        address payable author;
        uint256 price;
    }

    mapping(address => bool) public buyers;
    mapping(string => Course) public courses;
    mapping(uint256 => address) public emittedCertificates;

    constructor() ERC721("LearningChain", "LC") {}

    function createCourse(
        string memory _id,
        string memory _name,
        uint256 _price
    ) public {
        require(courses[_id].author == address(0), "Course already exists");

        address payable authorPayable = payable(msg.sender);
        Course memory newCourse = Course(_id, _name, authorPayable, _price);
        courses[_id] = newCourse;
    }

    function buyCourse(string memory _id) public payable {
        require(courses[_id].author != address(0), "Course does not exist");
        require(
            msg.value >= courses[_id].price,
            "You must pay the correct amount"
        );
        require(buyers[msg.sender] == false, "You already bought this course");

        // Transfer ether from buyer to author
        courses[_id].author.transfer(msg.value);
        buyers[msg.sender] = true;
    }

    function getCourse(string memory _id) public view returns (Course memory) {
        require(courses[_id].author != address(0), "Course does not exist");

        return courses[_id];
    }

    function mint(string memory _id, address buyer) public onlyOwner {
        require(courses[_id].author != address(0), "Course does not exist");
        require(buyers[buyer] == true, "You must buy this course first");

        _mint(msg.sender, tokenCounter);
        tokenCounter++;
    }
}
