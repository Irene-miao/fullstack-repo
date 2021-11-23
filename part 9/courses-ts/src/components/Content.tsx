
import * as React from 'react'

interface Course {
 name: string,
 exerciseCount: number
}

interface ContentProps {
    course: Course[]
}

const Content = (props: ContentProps)=> {
    console.log(props.course)
    console.log(props)
    const course = props.course
    return (
        <div>
      <p><strong>{course[0].name}</strong> : {course[0].exerciseCount} exercises</p>
      <p><strong>{course[1].name}</strong> : {course[1].exerciseCount} exercises</p>
      <p><strong>{course[2].name}</strong> : {course[2].exerciseCount} exercises</p>
        </div>
    )
}

export default Content
