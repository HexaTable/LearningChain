// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract OnlineCourse {
    struct Course {
        address payable author;
        uint256 price;
        uint256 totalStudents;
    }
    
    mapping(string => Course) public courses;
    
    struct CourseProgress {
        address student;
        uint256 progress;
        address certificate;
    }

    mapping(address => CourseProgress) public courseProgress;
    
    event CoursePurchased(address student, uint256 price);
    event CourseProgressUpdated(address student, uint256 progress);
    event CertificateIssued(address student, address certificate);
    
    function createCourse(string memory courseId, uint256 price) public {
        require(bytes(courseId).length > 0, "Course ID cannot be empty");
        Course memory course = Course({
            author: payable(msg.sender),
            price: price,
            totalStudents: 0
        });
        courses[courseId] = course;
    }
    
    function purchaseCourse(string memory courseId) public payable {
        require(bytes(courseId).length > 0, "Course ID cannot be empty");
        require(courses[courseId].author != address(0), "Course does not exist");
        require(msg.value == courses[courseId].price, "Incorrect payment amount");
        require(courseProgress[msg.sender].student == address(0), "Course already purchased");
        
        courses[courseId].totalStudents += 1;
        courseProgress[msg.sender] = CourseProgress(msg.sender, 0, msg.sender);
        
        courses[courseId].author.transfer(msg.value);
        emit CoursePurchased(msg.sender, msg.value);
    }
    
    function updateCourseProgress(uint256 progress, address certificate) public {
        require(courseProgress[msg.sender].student != address(0), "Course already purchased");
        require(progress <= 100, "Progress cannot be greater than 100");
        require(progress > courseProgress[msg.sender].progress, "Progress cannot be less than previous progress");
        
        courseProgress[msg.sender] = CourseProgress(msg.sender, progress, certificate);
        
        emit CourseProgressUpdated(msg.sender, progress);
        
        if (progress == 100 && certificate != address(0)) {
            emit CertificateIssued(msg.sender, certificate);
        }
    }
}
