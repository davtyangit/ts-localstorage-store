import { Container } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import { ShoppingCardProvider } from './context/ShoppingCardContext';
import Store from './pages/Store';

function App() {
  return (
    <ShoppingCardProvider>
      <Container className="mb-4">
        <NavBar />
        <Routes>
          <Route path="/" element={<Store />} />
        </Routes>
      </Container>
    </ShoppingCardProvider>
  );
}

export default App;
