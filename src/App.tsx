import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dungeons from "./Components/DungeonsData/Dungeons";
import Dictionary from "./Components/Dictionary/Dictionary";
import Cart from "./Components/Dictionary/Cart";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dungeons />} />
        <Route path="/dictionary" element={<Dictionary />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
