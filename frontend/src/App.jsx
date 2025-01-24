import Header from "./components/Header";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Main from "./pages/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/create" element={<Create />} />
          <Route path="/movie/:id" element={<Detail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
