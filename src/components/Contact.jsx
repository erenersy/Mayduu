import Header from './Header';
import Footer from './Footer';
import { Descriptions, Typography, Row, Col } from 'antd';


const { Title, Paragraph } = Typography;

function Contact() {

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const user = currentUser ? currentUser.username : null;

  return (

    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header user={user}/>
       <main className="contact-wrapper">
        
          <Row>
            
        <Col>
          <Title level={2}>Bizimle İletişime Geçin</Title> 
          <Paragraph style={{ marginBottom: 24 }}>
            Aşağıdaki bilgilerden bizimle her zaman iletişime geçebilirsiniz.
          </Paragraph>

          <Descriptions
            bordered
            column={1}
            layout="vertical"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '24px', borderRadius: '8px' }}
          >
            <Descriptions.Item label="İsim">Eren Ersoy</Descriptions.Item>
            <Descriptions.Item label="Telefon">+90 555 555 55 55</Descriptions.Item>
            <Descriptions.Item label="E-posta">erenersoy@example.com</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>


        </main>
<Footer />
      </div>

  )
}

export default Contact