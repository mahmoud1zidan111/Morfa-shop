import "./App.css";
import SimpleContainer from "../src/componants/contener";
import PrimarySearchAppBar from "../src/componants/Navbar";

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar></PrimarySearchAppBar>
      <SimpleContainer></SimpleContainer>
    </div>
  );
}

export default App;
