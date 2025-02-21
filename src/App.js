import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const [showResults, setShowResults] = useState(false);

  const [cache, setCache] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  // fetch data
  const fetchData = async () => {
    // if data is available in cache, fetch it from cache
    if (cache[input]) {
      console.log("CACHE RETURN", input);
      setResults(cache[input]);
      return;
    }

    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    console.log(json);
    setResults(json?.recipes);
    // appending the value in cache
    setCache((prev) => ({ ...prev, [input]: json.recipes }));
  };

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
          onFocus={() => setShowResults(true)}
          onBlur={() => setShowResults(false)}
        ></input>
        <div className="results-container">
          {showResults &&
            results.map((item) => (
              <span className="result" key={item.id}>
                {item.name}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
