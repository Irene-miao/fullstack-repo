// new types


export interface CourseBase {
  name: string;
    exerciseCount: number;
    type: string;
}

export  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
    description: string;
  }
  
 export interface CoursePartOne extends CoursePartBase {
    name: "Fundamentals";
  }
  
export  interface CoursePartTwo extends CoursePartBase {
    name: "Advanced";
  }
  
export  interface CoursePartThree extends CourseBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }
  
export interface CoursePartFour extends CoursePartBase {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

export interface CoursePartFive extends CoursePartBase {
  name: "Backend development";
  requirements: string[];
}

export  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour | CoursePartFive;
  