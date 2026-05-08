import { Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  return (

    <Row gutter={16} style={{ padding: 20 }}>

      <Col span={8}>
        <Card
          className="avurudu-card"
          onClick={() => navigate("/game1")}
        >
          Game 1
        </Card>
      </Col>

      <Col span={8}>
        <Card
          className="avurudu-card"
          onClick={() => navigate("/game2")}
        >
          Game 2
        </Card>
      </Col>

      <Col span={8}>
        <Card
          className="avurudu-card"
          onClick={() => navigate("/game3")}
        >
          Game 3
        </Card>
      </Col>

    </Row>

  );
}