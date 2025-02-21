import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  // fetch data
  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/recipes/search?q=");
    const json = await data.json();
    console.log(json);
    setResults(json?.recipes);
  };

  useEffect(() => {
    fetchData();
  }, [input]);

  return (
    <div className="App">
      <h1>Autocomplete Search Bar</h1>
      <div>
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>
        <div>
          {results.map((item) => (
            <span key={item.id}>{item.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
