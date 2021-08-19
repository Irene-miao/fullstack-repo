import React from 'react'

const BlogForm = (props) => {
    return (
        <div>
            <h3>Create New Blog</h3>
            <form onSubmit={props.onSubmit} >
                <div>
                title:
<input
value={props.value}
onChange={props.onChange}
/>
                </div>
<div>
author:
<input
value={props.valueA}
onChange={props.onChangeA}
/>
</div>
<div>
url:
<input
value={props.valueU}
onChange={props.onChangeU}
/>
</div>
<div>
likes:
<input
value={props.valueL}
onChange={props.onChangeL}
/>
</div>
<br></br>
<div>
<button type='submit'>create</button>
</div>

            </form>
        </div>
    )
}

export default BlogForm
