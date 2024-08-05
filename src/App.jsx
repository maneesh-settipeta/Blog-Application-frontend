import "./App.css";
import RoutingComp from "./Components/RoutingComp";
import { ProjectContext } from "./Store/StoreInput";

function App() {
  console.log(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID);
  console.log(import.meta.env.VITE_FIREBASE_API_KEY);
  console.log(import.meta.env.VITE_FIREBASE_AUTHDOMAIN);
  console.log(import.meta.env.VITE_FIREBASE_PROJECT_ID);
  return (
    <>
      <ProjectContext>
        <RoutingComp />
      </ProjectContext>
    </>
  );
}

export default App;
