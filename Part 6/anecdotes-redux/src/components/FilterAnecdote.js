import React from 'react'
import { connect } from "react-redux";
import { filter } from '../reducers/filterReducer'

const FilterAnecdote = (props) => {

    const handleChange = (event) => {
event.preventDefault()
const value = event.target.value
console.log(value)
props.filter(value)
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



export default connect(
    null,
    { filter }
)(FilterAnecdote)
