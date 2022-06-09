//  Nodes
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import styles from '../../../styles/SignIn.module.css';
import { Checkbox, FormControlLabel } from '@mui/material';
import Footer from '../../layout/footer/footer';

//  Navigation
import Router from 'next/router';
import routes from '../../../navigation/routes';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import backgroundImgTos from '../../../public/tos.png';
import backgroundImgTerms from '../../../public/Consentimento.png';

const Terms = ({ ...props }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { readOnly } = props;
  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
  };

  return (
    <Grid container component='main' sx={{ height: '100%', width: '100%' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
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
              styles={{
                width: '300px',
                height: '300px',
                position: 'absolute',
              }}
            ></div>
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={24} square>
        {readOnly ? (
          <div
            style={{
              position: 'absolute',
              marginTop: '2rem',
              marginLeft: '2rem',
            }}
          >
            <Button
              color='default'
              onClick={() => Router.back()}
              style={{ textTransform: 'none' }}
            >
              <ChevronLeft />
              <a>Voltar</a>
            </Button>
          </div>
        ) : null}
        <Box
          sx={{
            my: '10%',
            mx: '15%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Typography color={'primary'}>Portal Interno WW4.0</Typography>
          <Typography component='h2' variant='h3'>
            Consentimento de Utilização
          </Typography>
          <Typography
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
            localizada em: www.site.pt. Ao aceder a este site, presumimos que
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
            cookies. Ao usar o site da (Nome da Loja) consente a utilização de
            cookies de acordo com a política de privacidade do Portal de Cliente
            WW4.0. A maioria dos sites interativos de hoje em dia usam cookies
            que nos permitem recuperar os detalhes do utilizador para cada
            visita. As cookies são usadas em algumas áreas do nosso site para
            permitir a funcionalidade desta área e facilitar a utilização dos
            visitantes. Alguns dos nossos afiliados / parceiros publicitários
            podem também usar cookies. Licença Excetuando referência em
            contrário, a (Nome da Loja) e/ou os seus licenciantes são
            proprietários dos direitos de propriedade intelectual para todo o
            material no Portal de Cliente WW4.0. Todos os direitos de
            propriedade intelectual são reservados. Pode visualizar e/ou
            imprimir páginas de (Adicionar URL) para o seu uso pessoal, sujeito
            às restrições definidas nestes termos e condições. Não deve:
            Republicar material de (Adicionar URL). Vender, alugar ou
            sub-licenciar material de (Adicionar URL). Reproduzir, duplicar ou
            copiar material de (Adicionar URL). Redistribuir conteúdo de (Nome
            da Loja) (a não ser que o conteúdo seja feito especificamente para
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
          </Typography>
          {readOnly ? null : (
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
                sx={{ mt: 3, mb: 2 }}
                onClick={() => Router.push(routes.private.orders)}
              >
                Entrar
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
