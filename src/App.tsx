import React, { useCallback } from "react";
import "./App.css";
import Explorer from "./components/Explorer";
import { inputData as data } from "./inputData";
import { FileExplorer } from "./interface";

const inputData: FileExplorer = data;

function App() {
  const handleLeftFileClick = useCallback((name: string) => {
    console.log(name);
  }, []);

  const handleRightMouseClick = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(e);
    console.log("right mouse click");
  }, []);

  return (
    <div className="App">
      <Explorer
        explorer={inputData}
        handleLeftFileClick={handleLeftFileClick}
        handleRightMouseClick={handleRightMouseClick}
      />
    </div>
  );
}

export default App;
