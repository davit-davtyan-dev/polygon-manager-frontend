import { ToastContainer } from "react-toastify";
import { PolygonProvider } from "./contexts/PolygonContext";
import PolygonManager from "./PolygonManager/PolygonManager";
import "./App.css";

function App() {
  return (
    <>
      <PolygonProvider>
        <PolygonManager />
      </PolygonProvider>
      <ToastContainer hideProgressBar />
    </>
  );
}

export default App;
