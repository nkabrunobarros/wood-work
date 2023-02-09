/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
//  Nodes
import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import * as authActions from '../../../pages/api/actions/auth';
import styles from '../../../styles/SignIn.module.css';
import Footer from '../../layout/footer/footer';

//  Navigation
import { ChevronDown, ChevronLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import Router from 'next/router';
import routes from '../../../navigation/routes';
import * as ClientsActions from '../../../pages/api/actions/client';
import backgroundImg from '../../../public/Log_In.jpg';

const Terms = ({ ...props }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const data = new FormData(event.currentTarget);
    const user = JSON.parse(localStorage.getItem('user'));

    const newUser = [{
      id: user.id,
      type: user.type,
      tos: { type: 'Property', value: 'True' },
      '@context': [
        'https://raw.githubusercontent.com/More-Collaborative-Laboratory/ww4zero/main/ww4zero.context.normalized.jsonld',
        'https://uri.etsi.org/ngsi-ld/v1/ngsi-ld-core-context.jsonld'
      ]
    }];

    try {
      await ClientsActions.updateClient(newUser).then(() => {
        Router.push(routes.private.projects);
      });
    } catch (err) { console.log(err); }
  };

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
            Termos e Condições
          </Typography>

          <Box style={{
            maxHeight: readOnly ? '68vh' : '50vh',
            overflow: 'scroll',
            overflowX: 'hidden',
          }}>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
                <Typography>1. Termos</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <p><span style={{ color: 'rgb(68, 68, 68)' }}>Ao acessar ao site <a href="http://ww40.nka.pt/">WoodWork4.0</a>, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas leis de direitos autorais e marcas comerciais aplicáveis.</span></p>
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} >
              <AccordionSummary aria-controls="panel2d-content" id="panel2d-header" expandIcon={<ChevronDown />}>
                <Typography>2. Uso de Licença</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site WoodWork4.0 , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título e, sob esta licença, você não pode:&nbsp;</span></p><ol><li><span style={{ color: 'rgb(68, 68, 68)' }}>modificar ou copiar os materiais;&nbsp;</span></li><li><span style={{ color: 'rgb(68, 68, 68)' }}>usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não comercial);&nbsp;</span></li><li><span style={{ color: 'rgb(68, 68, 68)' }}>tentar descompilar ou fazer engenharia reversa de qualquer software contido no site WoodWork4.0;&nbsp;</span></li><li><span style={{ color: 'rgb(68, 68, 68)' }}>remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou&nbsp;</span></li><li><span style={{ color: 'rgb(68, 68, 68)' }}>transferir os materiais para outra pessoa ou 'espelhe' os materiais em qualquer outro servidor.</span></li></ol><p><span style={{ color: 'rgb(68, 68, 68)' }}>Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida por WoodWork4.0 a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.</span></p>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} >
              <AccordionSummary aria-controls="panel3d-content" id="panel3d-header" expandIcon={<ChevronDown />}>
                <Typography>3. Isenção de responsabilidade</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <ol><li><span style={{ color: 'rgb(68, 68, 68)' }}>Os materiais no site da WoodWork4.0 são fornecidos 'como estão'. WoodWork4.0 não oferece garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo, sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não violação de propriedade intelectual ou outra violação de direitos.</span></li><li><span style={{ color: 'rgb(68, 68, 68)' }}>Além disso, o WoodWork4.0 não garante ou faz qualquer representação relativa à precisão, aos resultados prováveis ​​ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses materiais ou em sites vinculados a este site.</span></li></ol>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} >
              <AccordionSummary aria-controls="panel4d-content" id="panel4d-header" expandIcon={<ChevronDown />}>
                <Typography>4. Limitações</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>Em nenhum caso o WoodWork4.0 ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em WoodWork4.0, mesmo que WoodWork4.0 ou um representante autorizado da WoodWork4.0 tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos conseqüentes ou incidentais, essas limitações podem não se aplicar a você.</span></p>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} >
              <AccordionSummary aria-controls="panel5d-content" id="panel5d-header" expandIcon={<ChevronDown />}>
                <Typography>5. Precisão dos materiais</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>Os materiais exibidos no site da WoodWork4.0 podem incluir erros técnicos, tipográficos ou fotográficos. WoodWork4.0 não garante que qualquer material em seu site seja preciso, completo ou atual. WoodWork4.0 pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto, WoodWork4.0 não se compromete a atualizar os materiais.</span></p>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} >
              <AccordionSummary aria-controls="panel6d-content" id="panel6d-header" expandIcon={<ChevronDown />}>
                <Typography>6. Links</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>O WoodWork4.0 não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de nenhum site vinculado. A inclusão de qualquer link não implica endosso por WoodWork4.0 do site. O uso de qualquer site vinculado é por conta e risco do usuário.</span></p><p><br /></p>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} >
              <AccordionSummary aria-controls="panel7d-content" id="panel7d-header" expandIcon={<ChevronDown />}>
                <Typography>Modificações</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>O WoodWork4.0 pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar este site, você concorda em ficar vinculado à versão atual desses termos de serviço.</span></p>
              </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')} >
              <AccordionSummary aria-controls="panel8d-content" id="panel8d-header" expandIcon={<ChevronDown />}>
                <Typography>Lei aplicável</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <p><span style={{ color: 'rgb(68, 68, 68)' }}>Estes termos e condições são regidos e interpretados de acordo com as leis do WoodWork4.0 e você se submete irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.</span></p>
              </AccordionDetails>
            </Accordion>
          </Box>
          {readOnly
            ? null
            : (
              <Box
                component='form'
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, width: '100%' }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      name='TOS'
                      value={acceptedTerms}
                      color='primary'
                      onClick={() => setAcceptedTerms(!acceptedTerms)}
                    />
                  }
                  label='Li e aceito os Termos de Utilização'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  disabled={!acceptedTerms}
                  sx={{ mt: 3, mb: 1 }}
                >
                Aceitar
                </Button>
                <Button
                  type='submit'
                  fullWidth
                  onClick={() => {
                    authActions.logout();
                  }}
                >
                  <LogOut strokeWidth='1' size={20} />Cancelar
                </Button>
              </Box>
            )}
        </Box>
        <Footer />
      </Grid>
    </Grid>
  );
};

export default Terms;
