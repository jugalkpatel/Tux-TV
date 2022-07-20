import "./App.css";

import { Router } from "./routers/Router";
import { Header } from "./components";
import { Toast } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <Toast />
    </div>
  );
}

export default App;
