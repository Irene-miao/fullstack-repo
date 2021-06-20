import React from 'react';

const PersonForm = (props) => {
    return (
        <div>
             <form onSubmit={props.onSubmit}>
        <div>
          name: 
          <input 
          value={props.value}
         onChange={props.onChange} 
         />
        </div>
        <div>
          number: 
          <input 
          value={props.valueNo}
         onChange={props.onChangeNo} 
         />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
        </div>
    )
}

export default PersonForm;
