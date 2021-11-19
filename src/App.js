import "./App.scss";
import Calculator from "./Components/Calculator/Calculator";
import Header from "./Components/Header/Header";
import Divider from "./Components/UI/Divider/Divider";
import { AppContextProvider } from "./store/AppContext";

function App() {
  return (
    <div className="App">
      <div className="Content">
        <AppContextProvider>
          <Header />
          <Divider />
          <Calculator />
        </AppContextProvider>
      </div>
    </div>
  );
}

export default App;
