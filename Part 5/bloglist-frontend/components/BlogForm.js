import React from 'react'

const BlogForm = (props) => {
    return (
        <div>
            <h3>Create New Blog</h3>
            <form onSubmit={props.onSubmit} >
title:
<input
value={props.value}
onChange={props.onChange}
/>
author:
<input
value={props.valueA}
onChange={props.onChangeA}
/>
url:
<input
value={props.valueU}
onChange={props.onChangeU}
/>
likes:
<input
value={props.valueL}
onChange={props.onChangeL}
/>
<button type='submit'>add</button>
            </form>
        </div>
    )
}

export default BlogForm
