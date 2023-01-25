import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Graph from "./Components/Graph/Graph";
import Labels from "./Components/Labels/Labels";
import Form from "./Components/Form/Form";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
        <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded ">
          EXPENSE TRACKER
        </h1>
        {/* grid column*/}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Chart*/}
          <Graph />
          {/*Form*/}
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
