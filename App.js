import "./App.css";
import React, { useState } from "react";

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
  const [results, setResults] = useState({});

  function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    const item = anecdotes[randomIndex];
    setSelected(item);
  }

  const getVote = () => {
    for (let i = 0; i < anecdotes.length; i++) {
      const anecdote = anecdotes[i];
      if (anecdote === selected) {
        setResults({ ...anecdotes, [selected]: (results[selected] ?? 0) + 1 });
      }
      console.log(results);
    }
  };

  return (
    <div className="App">
      <div>{selected}</div>
      <div>
     <p>has {results[selected]} votes.</p>
      </div>
      <button onClick={getVote}>vote</button>
      <button style={{ margin: "10px" }} onClick={getRandomItem}>
        random
      </button>
    </div>
  );
}

export default App;
