/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
//  Nodes
import { Checkbox, FormControlLabel } from '@mui/material';
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
import { ChevronLeft, LogOut } from 'lucide-react';
import Image from 'next/image';
import Router from 'next/router';
import routes from '../../../navigation/routes';
import * as ClientsActions from '../../../pages/api/actions/client';
import backgroundImgTerms from '../../../public/consentimento.png';
import backgroundImgTos from '../../../public/tos.png';

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
            src={readOnly ? backgroundImgTerms : backgroundImgTos}
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
            mx: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography color={'primary'}>Portal Cliente WW4.0</Typography>
          <Typography variant='titlexxl'>
            Consentimento de Utilização
          </Typography>
          {/* <Typography
            variant='h7'
            style={{
              maxHeight: readOnly ? '68vh' : '50vh',
              overflow: 'scroll',
              overflowX: 'hidden',
            }}
          >
            Bem-vindo ao Portal de Cliente WW4.0. Estes termos e condições
            definem as regras e regulamentos para a utilização do Website do
            Portal de Cliente WW4.0. Portal de Cliente WW4.0 encontra-se
            localizada em: ww40.nka.pt. Ao aceder a este site, presumimos que
            aceita estes termos e condições na totalidade. Não continue a
            utilizar o site do Portal de Cliente WW4.0 se não aceitar todos os
            termos e serviços referidos nesta página. A terminologia seguinte
            aplica-se as estes Termos e Condições, Declaração de Privacidade e
            Aviso de Isenção de Responsabilidade, assim como a todo e qualquer
            Acordo: Cliente, Você e Seu referem-se a si, a pessoa que está a
            aceder a este site para aceitar os termos e condições da Empresa. A
            Empresa, Nós e Nosso, referem-se à nossa Empresa. Entidade,
            Entidades, ou Nós, referem-se tanto ao Cliente como a nós, ou só ao
            cliente ou a nós. Todos os termos referem-se à oferta, aceitação e
            consideração do pagamento necessário para levar a cabo o processo da
            nossa assistência ao Cliente da forma mais apropriada, seja através
            de reuniões formais de duração fixa, ou qualquer outro meio, com o
            objetivo expresso de cumprir as necessidades do Cliente no que diz
            respeito ao fornecimento dos serviços/produtos da Empresa, de acordo
            com, e sujeito à lei vigente de www.site. Qualquer uso da
            terminologia acima ou outras palavras no singular, plural, em
            maiúscula/minúscula e/ou ele/ela ou eles/elas são tomados como
            intermutáveis e, portanto, referem-se ao mesmo. Cookies Utilizamos
            cookies. Ao usar o site da WoodWork 4.0 consente a utilização de
            cookies de acordo com a política de privacidade do Portal de Cliente
            WW4.0. A maioria dos sites interativos de hoje em dia usam cookies
            que nos permitem recuperar os detalhes do utilizador para cada
            visita. As cookies são usadas em algumas áreas do nosso site para
            permitir a funcionalidade desta área e facilitar a utilização dos
            visitantes. Alguns dos nossos afiliados / parceiros publicitários
            podem também usar cookies. Licença Excetuando referência em
            contrário, a WoodWork 4.0 e/ou os seus licenciantes são
            proprietários dos direitos de propriedade intelectual para todo o
            material no Portal de Cliente WW4.0. Todos os direitos de
            propriedade intelectual são reservados. Pode visualizar e/ou
            imprimir páginas de ww40.nka.pt/ para o seu uso pessoal, sujeito
            às restrições definidas nestes termos e condições. Não deve:
            Republicar material de ww40.nka.pt. Vender, alugar ou
            sub-licenciar material de ww40.nka.pt. Reproduzir, duplicar ou
            copiar material de ww40.nka.pt. Redistribuir conteúdo de WoodWork 4.0
            (a não ser que o conteúdo seja feito especificamente para
            redistribuição). Aviso No limite máximo permitido pela lei
            aplicável, excluímos todas as representações, garantias e condições
            relacionadas com o nosso site e com a utilização deste site
            (incluindo, sem limitação, qualquer garantia implícita na lei a
            respeito de qualidade satisfatória, adequação ao propósito e/ou
            utilização de cuidado e habilidade razoável). Nada neste aviso irá:
            Limitar ou excluir a nossa ou a sua responsabilidade devido a morte
            ou lesões pessoais resultantes de negligência. Limitar ou excluir a
            nossa ou a sua responsabilidade por fraude ou declarações
            fraudulentas. Limitar qualquer responsabilidade nossa ou sua de
            qualquer forma que não seja permitida de acordo com a lei aplicável.
            Ou excluir qualquer das nossas, ou das suas, responsabilidades que
            não possam ser excluídas de acordo com a lei aplicável. As
            limitações e exclusões de responsabilidade definidas nesta Secção e
            em outros locais deste aviso: estão sujeitas ao parágrafo
            precedente; e governam todas as responsabilidades de acordo com este
            aviso ou em relação com a matéria em questão neste aviso, incluindo
            responsabilidades que surjam em contrato, responsabilidade civil
            (incluindo negligencia) e por qualquer quebra de dever estatutário.
            Na medida em que o site, a informação e os serviços no site são
            fornecidos sem qualquer custo, não seremos responsáveis por qualquer
            perda ou dano de qualquer natureza.
          </Typography> */}

          <Box style={{
            maxHeight: readOnly ? '68vh' : '50vh',
            overflow: 'scroll',
            overflowX: 'hidden',
          }}>
            <h2><span style={{ color: 'rgb(68, 68, 68)' }}>Política Privacidade</span></h2>
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
            <h3><span style={{ color: 'rgb(68, 68, 68)' }}>Compromisso do Usuário</span></h3>
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
            </ul>
            <h3><span style={{ color: 'rgb(68, 68, 68)' }}>Mais informações</span></h3>
            <p><span style={{ color: 'rgb(68, 68, 68)' }}>Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver
        algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso
        interaja com um dos recursos que você usa em nosso site.</span></p>
            <p><span style={{ color: 'rgb(68, 68, 68)' }}>Esta política é efetiva a partir de&nbsp;16 December 2022 17:38</span></p>

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
