import "./App.css";

import { Router } from "./routers/Router";
import { Header, ToastsPortal, ToastContainer } from "./components";

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
      <ToastsPortal>
        <ToastContainer />
      </ToastsPortal>
    </div>
  );
}

export default App;
