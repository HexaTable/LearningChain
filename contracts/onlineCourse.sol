pragma solidity 0.8.18;

// SPDX-License-Identifier: MIT

contract OnlineCourse {
    struct Course {
        string courseId;
        address payable author;
        uint256 price;
        uint256 totalStudents;
        //mapping(address => bool) students;
    }
    
    Course public course;
    
    struct CourseProgress {
        string userId;
        uint256 progress;
        bool completed;
        address certificate;
    }
    
    mapping(address => CourseProgress) public courseProgress;
    
    event CoursePurchased(address buyer, string userId, uint256 price);
    event CourseProgressUpdated(address student, string userId, uint256 progress, bool completed);
    event CertificateIssued(address student, string courseId, address certificate);
    
    function createCourse(string memory courseId, uint256 price) public {
        require(bytes(courseId).length > 0, "Course ID cannot be empty");
        course = Course({
            courseId: courseId,
            author: payable(msg.sender),
            price: price,
            totalStudents: 0
            }
        );
    }
    
    function purchaseCourse(string memory userId) public payable {
        require(bytes(userId).length > 0, "Course ID cannot be empty");
        require(course.author != address(0), "Course does not exist");
        require(msg.value == course.price, "Incorrect payment amount");
        //require(bytes(courseProgress[msg.sender].userId).length == 0, "Course already purchased");
        
        //course.students[msg.sender] = true;
        course.totalStudents += 1;
        
        emit CoursePurchased(msg.sender, userId, msg.value);
    }
    
    function updateCourseProgress(string memory userId, uint256 progress, bool completed, address certificate) public {
        require(bytes(userId).length > 0, "Course ID cannot be empty");
        //require(bytes(courseProgress[msg.sender].userId).length > 0, "Course not purchased");
        
        courseProgress[msg.sender] = CourseProgress(userId, progress, completed, certificate);
        
        emit CourseProgressUpdated(msg.sender, userId, progress, completed);
        
        if (completed && certificate != address(0)) {
            emit CertificateIssued(msg.sender, userId, certificate);
        }
    }
    
    function withdraw() public {
        require(msg.sender == course.author, "Only course author can withdraw");
        payable(msg.sender).transfer(address(this).balance);
    }
}
