import storeItems from '../data/Items.json';
import { Row, Col } from 'react-bootstrap';
import { StoreItem } from '../components/StoreItem';

function Store() {
  return (
    <Row md={2} xs={1} lg={3} className="g-3">
      {storeItems.map((item) => {
        return (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        );
      })}
    </Row>
  );
}

export default Store;
