import { Card } from "antd";

interface CourseInfoProps {
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    price: number;
    image: string;
  };
}

const CourseInfo = ({ course }: CourseInfoProps) => {
  return (
    <div className="w-1/4 px-4 mb-8">
      <a href={`/dashboard/courses/${course.id}`}>
        <Card
          hoverable
          cover={
            <img
              alt={course.title}
              src={course.image}
              className="w-200 h-100"
            />
          }
        >
          <Card.Meta title={course.title} description={course.description} />
          <div className="mt-4 flex justify-between items-center">
            <span>{course.category}</span>
            <span>{course.price}</span>
          </div>
        </Card>
      </a>
    </div>
  );
};

export default CourseInfo;
