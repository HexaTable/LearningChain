const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OnlineCourse", function () {
  let onlineCourse;
  let owner;
  let buyer;

  beforeEach(async function () {
    const OnlineCourse = await ethers.getContractFactory("OnlineCourse");
    onlineCourse = await OnlineCourse.deploy();
    await onlineCourse.deployed();

    [owner, buyer] = await ethers.getSigners();
  });

  it("should create a course", async function () {
    const courseId = "course1";
    const price = ethers.utils.parseEther("1");

    await onlineCourse.createCourse(courseId, price);

    const course = await onlineCourse.course();

    expect(course.courseId).to.equal(courseId);
    expect(course.price).to.equal(price);
    expect(course.author).to.equal(owner.address);
    expect(course.totalStudents).to.equal(0);
  });

  it("should buy a course", async function () {
    const userId = "user1234";
    const price = ethers.utils.parseEther("1");

    await onlineCourse.createCourse(userId, price);

    const course = await onlineCourse.course();

    expect(course.courseId).to.equal(userId);
    expect(course.price).to.equal(price);
    expect(course.author).to.equal(owner.address);
    expect(course.totalStudents).to.equal(0);

    const paymentAmount = ethers.utils.parseEther("1");
    await onlineCourse.connect(buyer).purchaseCourse(userId, { value: paymentAmount });

    const courseAfterBuy = await onlineCourse.course();

    expect(courseAfterBuy.totalStudents).to.equal(1);
  });

  it("update course progress & finishes", async function () {
    const userId = "user1234";
    const price = ethers.utils.parseEther("1");

    await onlineCourse.createCourse(userId, price);
    const paymentAmount = ethers.utils.parseEther("1");
    await onlineCourse.connect(buyer).purchaseCourse(userId, { value: paymentAmount });

    const progress = 100;
    const completed = true;
    const certificate = buyer.address;

    await onlineCourse.connect(buyer).updateCourseProgress(userId, progress, completed, certificate);

    const courseProgress = await onlineCourse.courseProgress(buyer.address);
    expect(courseProgress.userId).to.equal(userId);
    expect(courseProgress.progress).to.equal(progress);
    expect(courseProgress.completed).to.equal(completed);
    expect(courseProgress.certificate).to.equal(certificate);

    const emittedCourseProgressUpdatedEvent = (await onlineCourse.queryFilter("CourseProgressUpdated"))[0];
    expect(emittedCourseProgressUpdatedEvent.args.userId).to.equal(userId);
    expect(emittedCourseProgressUpdatedEvent.args.progress).to.equal(progress);
    expect(emittedCourseProgressUpdatedEvent.args.completed).to.equal(completed);
    expect(emittedCourseProgressUpdatedEvent.args.student).to.equal(buyer.address);

    const emittedCertificateIssuedEvent = (await onlineCourse.queryFilter("CertificateIssued"))[0];
    expect(emittedCertificateIssuedEvent.args.userId).to.equal(userId);
    expect(emittedCertificateIssuedEvent.args.certificate).to.equal(certificate);
  });

  it("should not allow purchasing a course again", async function () {
    const courseId = "course1";
    const price = ethers.utils.parseEther("1");
    const userId = "user1";

    await onlineCourse.createCourse(courseId, price);

    const course = await onlineCourse.course();
    expect(course.courseId).to.equal(courseId);
    expect(course.price).to.equal(price);
    expect(course.author).to.equal(owner.address);
    expect(course.totalStudents).to.equal(0);

    const paymentAmount = ethers.utils.parseEther("1");
    await onlineCourse.connect(buyer).purchaseCourse(userId, { value: paymentAmount });

    // This should revert because the user has already purchased the course
    await expect(
      onlineCourse.connect(buyer).purchaseCourse(userId, { value: paymentAmount })
    ).to.be.revertedWith("Course already purchased");

    const courseAfterBuy = await onlineCourse.course();
    expect(courseAfterBuy.totalStudents).to.equal(1);
  });
});
