/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
//  Nodes
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import styles from '../../../styles/SignIn.module.css';
import Footer from '../../layout/footer/footer';

//  Navigation
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Router from 'next/router';
import backgroundImg from '../../../public/Log_In.jpg';

const Terms = ({ ...props }) => {
  const [windowWidth, setWindowHeight] = useState();
  // eslint-disable-next-line react/prop-types
  const { readOnly } = props;

  if (typeof window !== 'undefined') {
    useEffect(() => {
      setWindowHeight(window.innerWidth);
    }, [window.innerWidth]);
  }

  const listenToResize = () => {
    setWindowHeight(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', listenToResize);

    return () => window.removeEventListener('resize', listenToResize);
  }, []);

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container component='main' sx={{ height: '100%', width: '100%' }}>
      <CssBaseline />
      {windowWidth > 600 && <Grid item xs={0} sm={6} md={7}>
        <div
          style={{
            position: 'absolute',
            zIndex: -1,
            overflow: 'hidden',
            width: '100%',
            height: '100%',
          }}
        >
          <Image
            src={backgroundImg}
            alt='Background Image'
            layout='fill'
            placeholder="blur"
            priority
          />
        </div>
        <Box
          className={styles.logo}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <div className={styles.logoImg}>
            <div
              style={{
                width: '300px',
                height: '300px',
                position: 'absolute',
              }}
            ></div>
          </div>
        </Box>
      </Grid> }
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={24} square>
        {readOnly && (
          <div >
            <Button
              onClick={() => Router.back()}
              style={{ textTransform: 'none', color: 'inherit' }}
            >
              <ChevronLeft />
              <a>Voltar</a>
            </Button>
          </div>
        )}
        <Box
          sx={{
            mx: '10%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography color={'primary'}>Portal Cliente WW4.0</Typography>
          <Typography variant='titlexxl'>
            Politica de Privacidade
          </Typography>

          <Box style={{
            maxHeight: readOnly ? '68vh' : '50vh',
            overflow: 'scroll',
            overflowX: 'hidden',
          }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
                <Typography>1. Privacidade</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>A sua privacidade é importante para nós. É política do Wood Work 4.0 respeitar
        a sua privacidade em relação a qualquer informação sua que possamos coletar no site <a
                    href="http://ww40.nka.pt/">Wood Work 4.0</a>, e outros sites que possuímos e operamos.</span></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>Solicitamos informações pessoais apenas quando realmente precisamos delas para
        lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também
        informamos por que estamos coletando e como será usado.</span></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>Apenas retemos as informações coletadas pelo tempo necessário para fornecer o
        serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar
        perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.</span></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>Não compartilhamos informações de identificação pessoal publicamente ou com
        terceiros, exceto quando exigido por lei.</span></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>O nosso site pode ter links para sites externos que não são operados por nós.
        Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar
        responsabilidade por suas respectivas&nbsp;</span><a href="https://politicaprivacidade.com/"
                    style={{ backgroundColor: 'transparent', color: 'rgb(68, 68, 68)' }}>políticas de privacidade</a><span
                    style={{ color: 'rgb(68, 68, 68)' }}>.</span></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>Você é livre para recusar a nossa solicitação de informações pessoais,
        entendendo que talvez não possamos fornecer alguns dos serviços desejados.</span></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>O uso continuado de nosso site será considerado como aceitação de nossas
        práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com
        dados do usuário e informações pessoais, entre em contacto connosco.</span></p>
                  <p></p>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>
                    <ul>
                      <li><span style={{ color: 'rgb(68, 68, 68)' }}>O serviço Google AdSense que usamos para veicular publicidade usa
                    um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de
                    vezes que um determinado anúncio é exibido para você.</span></li>
                      <li><span style={{ color: 'rgb(68, 68, 68)' }}>Para mais informações sobre o Google AdSense, consulte as FAQs
                    oficiais sobre privacidade do Google AdSense.</span></li>
                      <li><span style={{ color: 'rgb(68, 68, 68)' }}>Utilizamos anúncios para compensar os custos de funcionamento
                    deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade
                    comportamental usados ​​por este site foram projetados para garantir que você forneça os anúncios
                    mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas
                    semelhantes que possam ser do seu interesse.</span></li>
                      <li><span style={{ color: 'rgb(68, 68, 68)' }}>Vários parceiros anunciam em nosso nome e os cookies de
                    rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através
                    de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando
                    aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo
                    para fazer uma compra.</span></li>
                    </ul>
                    <p><br></br></p>
                  </span></p>

                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ChevronDown />}>
                <Typography>2. Compromisso do Usuário</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>O usuário se compromete a fazer uso adequado dos conteúdos e da informação que
        o Wood Work 4.0 oferece no site e com caráter enunciativo, mas não limitativo:</span></p>
                <ul>
                  <li><span style={{ color: 'rgb(68, 68, 68)' }}>A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé
            a à ordem pública;</span></li>
                  <li><span style={{ color: 'rgb(68, 68, 68)' }}>B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica,
                  </span><span style={{ color: 'rgb(33, 37, 41)' }}><a href='https://apostasonline.guru/betano-apostas/' rel="nofollow noreferrer"
                    target='_BLANK'
                    style={{ color: 'inherit !important', textDecoration: 'none !important', fontSize: 'inherit !important' }}>betano</a></span><span
                    style={{ color: 'rgb(68, 68, 68)' }}> ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou
            contra os direitos humanos;</span></li>
                  <li><span style={{ color: 'rgb(68, 68, 68)' }}>C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares)
            do Wood Work 4.0, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou
            quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente
            mencionados.</span></li>
                </ul>              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ChevronDown />}>
                <Typography>Mais informações</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver
                  algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso
                  interaja com um dos recursos que você usa em nosso site.</span></p>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>Esta política é efetiva a partir de&nbsp;16 dezembro 2022 17:38</span></p>              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Terms;
