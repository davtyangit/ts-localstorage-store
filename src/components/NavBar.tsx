import { Container, Nav, Navbar as NavbarBs, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShoppingCard } from '../context/ShoppingCardContext';

function NavBar() {
  const { openCard, closeCard, cardQuantity } = useShoppingCard();

  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to={'/'} as={NavLink}>
            Store
          </Nav.Link>
        </Nav>
        {cardQuantity > 0 && (
          <Button
            onClick={openCard}
            style={{ width: '3rem', height: '3rem', position: 'relative' }}
            variant="outline-primary"
            className="rounded-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M10 19.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5zm3.5-1.5c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm1.336-5l1.977-7h-16.813l2.938 7h11.898zm4.969-10l-3.432 12h-12.597l.839 2h13.239l3.474-12h1.929l.743-2h-4.195z" />
            </svg>
            <div
              className="rounded-circle bg-danger d-flex justify-content-center alignt-items-center"
              style={{
                color: 'white',
                width: '1.5rem',
                height: '1.5rem',
                position: 'absolute',
                bottom: '0',
                right: '0',
                transform: 'translate(25%, 25%)',
              }}>
              {cardQuantity}
            </div>
          </Button>
        )}
      </Container>
    </NavbarBs>
  );
}

export default NavBar;
