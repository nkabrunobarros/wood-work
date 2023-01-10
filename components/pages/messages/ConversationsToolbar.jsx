import { AppBar, ButtonGroup, IconButton, InputAdornment, Menu, MenuItem, OutlinedInput, Toolbar, Tooltip } from '@mui/material';
import { Edit, HelpCircle, MoreHorizontal, Plus, Search, Settings } from 'lucide-react';
import React, { useState } from 'react';
//  PropTypes
import PropTypes from 'prop-types';

const ConversationsToolbar = (props) => {
  const { windowWidth, styles, pageProps, onSearch } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <AppBar position='static' sx={styles.appBars} >
      <Toolbar sx={{ padding: '.5rem !important' }}>
        {windowWidth > 900 && <OutlinedInput
          required
          fullWidth
          placeholder='Pesquisa'
          sx={styles.writeMessageInput}
          onChange={(e) => onSearch(e.target.value)}
          endAdornment={
            <InputAdornment position={'start'}>
              <Search/>
            </InputAdornment>
          }
        />}
        <ButtonGroup>
          {windowWidth > 900 &&
              <Tooltip title='Nova Conversa'>
                <IconButton>
                  <Plus
                    strokeWidth={pageProps.globalVars.iconStrokeWidth}
                    size={pageProps.globalVars.iconSize}
                  />
                </IconButton>
              </Tooltip>
          }
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreHorizontal/>
          </IconButton>
        </ButtonGroup>
        <Menu
          anchorEl={anchorEl}
          open={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {windowWidth < 900 && <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Edit strokeWidth={pageProps.globalVars.iconStrokeWidth}
            size={pageProps.globalVars.iconSize}/>Nova conversa</MenuItem>}
          <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><HelpCircle strokeWidth={pageProps.globalVars.iconStrokeWidth}
            size={pageProps.globalVars.iconSize}/>Ajuda</MenuItem>
          <MenuItem onClose={() => setAnchorEl(null)} onClick={() => setAnchorEl(null)}><Settings strokeWidth={pageProps.globalVars.iconStrokeWidth}
            size={pageProps.globalVars.iconSize}/>Preferencias</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

ConversationsToolbar.propTypes = {
  pageProps: PropTypes.object,
  windowWidth: PropTypes.number,
  styles: PropTypes.object,
  onSearch: PropTypes.func,
};

export default ConversationsToolbar;