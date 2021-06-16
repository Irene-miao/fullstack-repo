import "./App.css";
import React, { useState} from "react";
import Anecdote from './Anecdote';

function App() {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients",
  ];

  const [selected, setSelected] = useState("");
  const [results, setResults] = useState([]);
  const [maxVote, setMaxVote] = useState({});
  

  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    const item = anecdotes[randomIndex];
    setSelected(item);
  }

  const getVote = () => {
    for (let i = 0; i < anecdotes.length; i++) {
      const anecdote = anecdotes[i];
      if (anecdote === selected) {
        setResults({...results, [selected]: (results[selected] ?? 0) + 1 });
      }
    };
    let sorted = Object.entries(results).sort((prev, next) => prev[1] - next[2]);
const max = sorted.pop();
setMaxVote(max);
  };

 console.log(results);
 
 console.log(maxVote);



  return (
    <div className="App">
      <Anecdote
      title='Anecdote of the day'
      phrase={selected}
      vote={results[selected]}
      />
      <button onClick={getVote}>vote</button>
      <button style={{ margin: "10px" }} onClick={getRandomItem}>
        random
      </button>
      <Anecdote 
        title='Anecdote with most votes'
     phrase={maxVote[0]}
     vote={maxVote[1]}
      />
    </div>
  );
}

export default App;
