/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require("chai");
const { ethers } = require("hardhat");
/* eslint-enable @typescript-eslint/no-var-requires */

describe("OnlineCourse", function () {
  let learningChain;
  let owner;
  let buyer;
  let author;
  let id;
  let name;
  let price;

  beforeEach(async function () {
    const LearningChain = await ethers.getContractFactory("LearningChain");
    learningChain = await LearningChain.deploy();
    await learningChain.deployed();

    [owner, buyer, author] = await ethers.getSigners();

    id = "1234";
    name = "Course 1";
    price = ethers.utils.parseEther("1");

    await learningChain.connect(author).createCourse(id, name, price);
  });

  describe("Deployment", function () {
    it("sets the name", async function () {
      expect(await learningChain.name()).to.equal("LearningChain");
    });

    it("sets the symbol", async function () {
      expect(await learningChain.symbol()).to.equal("LC");
    });

    it("should set the right owner", async function () {
      expect(await learningChain.owner()).to.equal(owner.address);
    });
  });

  describe("Creating Courses", function () {
    it("should create a course", async function () {
      const course = await learningChain.courses(id);

      expect(course.name).to.equal(name);
      expect(course.id).to.equal(id);
      expect(course.price).to.equal(price);
      expect(course.author).to.equal(author.address);
    });

    it("returns Course details", async function () {
      const course = await learningChain.getCourse(id);

      expect(course.name).to.equal(name);
      expect(course.id).to.equal(id);
      expect(course.price).to.equal(price);
      expect(course.author).to.equal(author.address);
    });
  });

  describe("Purchasing Courses", function () {
    beforeEach(async function () {
      await learningChain.connect(buyer).buyCourse(id, { value: price });
    });

    it("should purchase a course", async function () {
      const buyers = await learningChain.buyers(buyer.address);
      expect(buyers).to.equal(true);
    });

    it("should emit a 'Course does not exist' error", async function () {
      await expect(
        learningChain.connect(buyer).buyCourse("12345", { value: price })
      ).to.be.revertedWith("Course does not exist");
    });
  });

  describe("Get Courses", function () {
    it("should return the right course", async function () {
      const course = await learningChain.getCourse(id);
      expect(course).to.not.be.empty;
      expect(course.name).to.equal(name);
      expect(course.id).to.equal(id);
      expect(course.price).to.equal(price);
      expect(course.author).to.equal(author.address);
    });
  });

  describe("Mint certificate", function () {
    it("should mint a certificate", async function () {
      const prevCounter = await learningChain.tokenCounter();
      await learningChain.connect(buyer).buyCourse(id, { value: price });

      await learningChain.mint(id, buyer.address);
      const currCounter = await learningChain.tokenCounter();
      expect(currCounter).to.equal(prevCounter.add(1));
    });

    it("should emit a 'You must buy this course first' error", async function () {
      await expect(learningChain.mint(id, buyer.address)).to.be.revertedWith(
        "You must buy this course first"
      );
    });
  });
});
