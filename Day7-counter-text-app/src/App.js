import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div className="container">
      <h2>🔢 Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Increase</button>
      <button onClick={() => setCount(count - 1)}>➖ Decrease</button>
      <button onClick={() => setCount(0)}>🔄 Reset</button>

      <hr />

      <h2>⌨️ Live Text Preview</h2>
      <input
        type="text"
        placeholder="Type here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>
        Preview: <strong>{text}</strong>
      </p>
    </div>
  );
}

export default App;
