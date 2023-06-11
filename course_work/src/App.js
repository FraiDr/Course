import MainPage from "./pages/main-page/MainPage";
import DoublyLinkedList from "./logic/DoublyLinkedList";
import ConnectedComponents from "./logic/ConnectedComponents";
import Footer from "./layouts/footer/Footer";
import Header from "./layouts/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/doubly-linked-list" element={<DoublyLinkedList />} />
          <Route path="/Connected-components" element={<ConnectedComponents />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
