import "./App.css";
import RoutingComp from "./Components/RoutingComp";
import { ProjectContext } from "./Store/StoreInput";
import React from "react";
function App() {
  return (

    <ProjectContext>
      <RoutingComp />
    </ProjectContext>
  );
}

export default App;
