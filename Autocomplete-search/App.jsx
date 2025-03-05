import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [input, setInput] = useState("");
  const [cache, setCache] = useState({}); // key value pair
  const [focus, setFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const fetchRecipes = async () => {
    console.log("API called", input);
    if (cache[input]) {
      console.log("Returned fro cache : ", input);
      setRecipes(cache[input]);
      return;
    }

    const response = await fetch(
      "https://dummyjson.com/recipes/search?q=" + input
    );
    const data = await response.json();
    setRecipes(data.recipes);

    // Adding input to cache
    setCache((prev) => ({ ...prev, [input]: data.recipes }));
    console.log(data.recipes);
  };

  const handleKeyDown = (e) => {
    if (!focus || recipes.length === 0) return;

    if (e.key == "ArrowDown") {
      setSelectedIndex((prev) => (prev < recipes.length - 1 ? prev + 1 : prev));
    } else if (e.key == "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key == "Enter" && selectedIndex !== -1) {
      setInput(recipes[selectedIndex].name);
      setSelectedIndex(-1);
    }
  };

  useEffect(() => {
    // Adding Debouncing
    const timerId = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => clearTimeout(timerId);
  }, [input]);

  return (
    <div className="App">
      <h1>Autocomplete search</h1>
      <div>
        <input
          type="text"
          name="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{ width: "300px", padding: "5px" }}
          onKeyDown={handleKeyDown}
        />

        {focus && (
          <div
            style={{
              width: "300px",
              border: "1px solid black",
              borderTop: "0px",
              maxHeight: "400px",
              margin: "auto",
              overflowY: "scroll",
              textAlign: "left",
              padding: "5px",
            }}
          >
            {recipes?.map((item, index) => (
              <div
                key={index}
                className={`recipe ${index == selectedIndex ? "selected" : ""}`}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseDown={() => {
                  setInput(item.name);
                  setFocus(false);
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
