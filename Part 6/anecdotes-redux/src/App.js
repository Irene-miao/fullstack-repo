import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList"

const App = () => {
 
  
return (
    <div>
      <div>
        <AnecdoteList />
      </div>
      <div>
        <AnecdoteForm />
      </div>
    </div>
  );
};

export default App;
