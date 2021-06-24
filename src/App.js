import "./App.css";
import { Router } from "./routers/Router";
import { Header } from "./components/Header/Header.jsx";
function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
