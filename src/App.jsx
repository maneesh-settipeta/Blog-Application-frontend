import "./App.css";
import RoutingComp from "./Components/RoutingComp";
import { ProjectContext } from "./Store/StoreInput";

function App() {
  return (
    <>
      <ProjectContext>
        <RoutingComp />
      </ProjectContext>
    </>
  );
}

export default App;
