import React from 'react'
import { useDispatch } from "react-redux";
import { filter } from '../reducers/filterReducer'

const FilterAnecdote = () => {
    const dispatch = useDispatch();

    const handleChange = (event) => {
event.preventDefault()
const value = event.target.value
console.log(value)
dispatch(filter(value))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
          filter <input onChange={handleChange}/>  
        </div>
    )
}

export default FilterAnecdote
