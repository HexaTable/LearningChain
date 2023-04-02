/* eslint-disable @typescript-eslint/no-var-requires */
const { expect } = require("chai");
const { ethers } = require("hardhat");
/* eslint-enable @typescript-eslint/no-var-requires */

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

    const course = await onlineCourse.courses(courseId);

    expect(course.price).to.equal(price);
    expect(course.author).to.equal(owner.address);
    expect(course.totalStudents).to.equal(0);
  });

  it("should buy a course", async function () {
    const courseId = "course1";
    const price = ethers.utils.parseEther("1");

    await onlineCourse.createCourse(courseId, price);
    
    const initialBalance = await ethers.provider.getBalance(owner.address);

    const paymentAmount = ethers.utils.parseEther("1");
    await onlineCourse
      .connect(buyer)
      .purchaseCourse(courseId, { value: paymentAmount });

    const course = await onlineCourse.courses(courseId);
    const finalBalance = await ethers.provider.getBalance(owner.address);

    expect(course.totalStudents).to.equal(1);
    expect(initialBalance).to.lt(finalBalance);
  });

  it("update course progress & finishes", async function () {
    const courseId = "course1";
    const price = ethers.utils.parseEther("1");

    await onlineCourse.createCourse(courseId, price);
    const paymentAmount = ethers.utils.parseEther("1");
    await onlineCourse
      .connect(buyer)
      .purchaseCourse(courseId, { value: paymentAmount });

    const progress = 100;
    const certificate = buyer.address;

    await onlineCourse
      .connect(buyer)
      .updateCourseProgress(progress, certificate);

    const courseProgress = await onlineCourse.courseProgress(buyer.address);
    expect(courseProgress.progress).to.equal(progress);
    expect(courseProgress.certificate).to.equal(certificate);

    const emittedCourseProgressUpdatedEvent = (
      await onlineCourse.queryFilter("CourseProgressUpdated")
    )[0];
    expect(emittedCourseProgressUpdatedEvent.args.progress).to.equal(progress);
    expect(emittedCourseProgressUpdatedEvent.args.student).to.equal(
      buyer.address
    );

    const emittedCertificateIssuedEvent = (
      await onlineCourse.queryFilter("CertificateIssued")
    )[0];
    expect(emittedCertificateIssuedEvent.args.certificate).to.equal(
      certificate
    );
  });

  it("should not allow purchasing a course again", async function () {
    const courseId = "course1";
    const price = ethers.utils.parseEther("1");

    await onlineCourse.createCourse(courseId, price);

    const paymentAmount = ethers.utils.parseEther("1");
    await onlineCourse
      .connect(buyer)
      .purchaseCourse(courseId, { value: paymentAmount });

    await expect(
      onlineCourse.connect(buyer).purchaseCourse(courseId, { value: paymentAmount })
    ).to.be.revertedWith("Course already purchased");
  });
});
