
import { Descriptions, Typography, Row, Col } from 'antd';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';


const { Title, Paragraph } = Typography;

function Contact() {

   const { theme } = useContext(ThemeContext);




  return (

 

       <main className="contact-wrapper">
        
          <Row>
            
        <Col>
          <Title style={{ color: theme === 'dark' ? '#fff' : '#000' }}   level={2}>Bizimle İletişime Geçin</Title> 
          <Paragraph  style={{ marginBottom: 24, color: theme === 'dark' ? '#fff' : '#000' }}>
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



  )
}

export default Contact