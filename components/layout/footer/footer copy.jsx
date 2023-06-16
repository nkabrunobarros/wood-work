/* eslint-disable react/prop-types */
// Node modules
import { Container } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import logosFooter from '../../../public/Fundos-Europeus.png';

// Pages without layout (sidebar + navbar + footer)

const Footer = (props) => {
  const isPublicPage = !!props.isPublicPage;

  const footerStyle = {
    marginTop: 'auto', // Pushes the footer to the bottom of the page

  };

  return (
    <footer className={footerStyle}>
      <Container maxWidth="xl" sx={{ border: '1px solid blue' }}>
        <a
          target='#'
          href={'http://mofreita.com/wp-content/uploads/2022/08/72593_ww4.0_modelo_pag_web_0_norte2020_v2.pdf'} style={{ display: !isPublicPage && 'none' }}>
          <Image
            alt='Footer Logo'
            placeholder='blur'
            priority
            src={logosFooter}
          />
        </a>
      </Container>
    </footer>
  );
};

export default Footer;
