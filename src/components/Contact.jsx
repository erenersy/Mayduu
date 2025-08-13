
import { Descriptions, Typography, Row, Col } from 'antd';
import { ThemeContext } from '../contexts/ThemeContext';
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import translations from './Translations';


const { Title, Paragraph } = Typography;

function Contact() {

    const { language } = useContext(LanguageContext);
    const t = translations[language].contactinfo;


   const { theme } = useContext(ThemeContext);




  return (

 

       <main className="contact-wrapper">
        
          <Row>
            
        <Col>
          <Title style={{ color: theme === 'dark' ? '#fff' : '#000' }}   level={2}> {t.header}</Title> 
          <Paragraph  style={{ marginBottom: 24, color: theme === 'dark' ? '#fff' : '#000' }}>
             {t.description}
          </Paragraph>

          <Descriptions
            bordered
            column={1}
            layout="vertical"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '24px', borderRadius: '8px' }}
          >
            <Descriptions.Item label={t.name}>Eren Ersoy</Descriptions.Item>
            <Descriptions.Item label={t.phone}>+90 555 555 55 55</Descriptions.Item>
            <Descriptions.Item label={t.email}>erenersoy@example.com</Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>


        </main>



  )
}

export default Contact