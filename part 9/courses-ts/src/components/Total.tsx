import React from 'react'

interface NumberProps {
    exercise: number[]
}

const total = (array: number[]) => {
return array.reduce((sum, num) => sum + num, 0)
}

const Total = (props: NumberProps) => {
    console.log(props)

    return (
        <div>
          <p>
       <strong>Number of exercises:{"  "}</strong>
        {total(props.exercise)}
      </p>  
        </div>
    )
}

export default Total
