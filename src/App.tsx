import { Route, Routes } from "react-router-dom";
import Excescises from "./pages/Excescises";
import Index from "./components/Index";

const App = () => {
  return (
    <Routes>
      <Route path="/proyecto" element={<Excescises />}></Route>
      <Route path="/" element={<Index />}></Route>
      <Route path="*" element={<Index />}></Route>
    </Routes>
  )
}

export default App