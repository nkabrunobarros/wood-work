/* eslint-disable array-callback-return */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/jsx-props-no-spreading */
//  PropTypes
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Paper, Table, TableBody, TableContainer, TableHead, Tooltip, Typography } from '@mui/material';
import { ChevronDown, FileText } from 'lucide-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Notification from '../../../dialogs/Notification';

const Docs = (props) => {
  const [sectionExpanded, setSectionExpanded] = useState(true);
  const folders = props.folders;
  const [expandedGroups, setExpandedGroups] = useState([]);

  console.log(props.folders);

  const toggleValueInArray = (value, array) => {
    const index = array.indexOf(value);

    if (index === -1) {
      return [...array, value];
    }

    return [...array.slice(0, index), ...array.slice(index + 1)];
  };

  const handleChange = (expandedGroups, setExpandedGroups) => (panel) => {
    setExpandedGroups((prevExpandedGroups) =>
      toggleValueInArray(panel, prevExpandedGroups)
    );
  };

  const handlePanelChange = handleChange(expandedGroups, setExpandedGroups);

  const {
    open,
  } = props;

  async function handleFileClick (file) {
    fetch(file.file)
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = `${file.file_name}${file.file_type}`; // Change this to the desired file name if needed
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 0);
      });
  }

  function renderAccordionFolders (folders, parentId = null) {
    return folders?.filter((folder) => folder.parent === parentId)
      .map((folder) => {
        // check if this is the root folder
        if (parentId === null && folder.parent === null) {
          // skip the root folder and only render its children
          return renderAccordionFolders(folders, folder.id);
        }

        return (
          <Accordion expanded={expandedGroups.includes(folder.id)}
            onChange={() => handlePanelChange(folder.id)} key={folder.id}
            sx={{ padding: 0, paddingLeft: '2rem', margin: 0, boxShadow: 'none', border: '0.5px solid', borderColor: 'divider' }}>
            <AccordionSummary sx={{ height: '20px', backgroundColor: 'white' }} >
              <Grid container bgcolor={'default.main'} >
                <Grid container md={12} sm={12} xs={12} alignItems='center'>
                  <Box id='align' color='primary.main' >
                    {expandedGroups.includes(folder.id)
                      ? (
                        <ArrowDropDown strokeWidth='1' style={{ marginRight: '1rem' }} />
                      )
                      : (
                        <ArrowRight strokeWidth='1' style={{ marginRight: '1rem' }} />
                      )}
                  </Box>
                  <Typography variant="subtitle2">{folder.name} </Typography>
                </Grid>
              </Grid>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: 0, backgroundColor: '#F4F4F4', borderRadius: '8px' }} >
              {folder.files.length === 0 && folders.find(fold => fold.parent === folder.id) === undefined ? <Typography variant='subtitle2' sx={{ paddingLeft: '3rem' }}>Vazia</Typography> : null}
              {folder.files.filter(file => typeof file !== 'undefined').sort((a, b) => a.file_name - b.file_name).map((file) => (
                <Grid container md={12} sm={12} xs={12} sx={{ paddingLeft: '3rem' }} key={file?.id} alignItems={'center'} p={1}>
                  <Grid container md={9} sm={9} xs={9} sx={{ }} >
                    <FileText
                      strokeWidth='1'
                      style={{ marginRight: '1rem' }}
                    />
                    <Tooltip title='Clique para descarregar este ficheiro.'>
                      <Typography sx={{ cursor: 'pointer' }} onClick={() => handleFileClick(file)}>{file?.file_name + file?.file_type}</Typography>
                    </Tooltip>
                  </Grid>
                  <Grid container md={3} sm={3} xs={3} sx={{ }} >
                    <Typography variant="subtitle2">{moment(file.created).format('DD/MM/YYYY HH:MM')} </Typography>
                  </Grid>

                </Grid>
              ))}
              <Box bgcolor='lightGray.secondary'>
                {renderAccordionFolders(folders, folder.id)}
              </Box>
            </AccordionDetails>
          </Accordion>
        );
      });
  }

  return open && <>
    <Notification />
    <Accordion expanded={sectionExpanded} onChange={() => setSectionExpanded(!sectionExpanded)} sx={{ width: '100%' }} >
      <AccordionSummary sx={{ background: 'lightGray.main', paddingLeft: '24px' }} bgcolor={'lightGray.main'} aria-controls="panel1d-content" id="panel1d-header" expandIcon={<ChevronDown />}>
        <Typography variant='title'>Documentos</Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: 0 }}>
        <TableContainer component={Paper}>
          <Table aria-label='collapsible table'>
            <TableHead aria-label='sticky table'>
              <Grid container p={2} bgcolor='lightgray.main'>
                <Grid container md={6} sm={6} xs={6}>Nome</Grid>
                <Grid container md={6} sm={6} xs={6} justifyContent='center'>Data</Grid>
              </Grid>
            </TableHead>
            <TableBody >
              <Box sx={{ maxHeight: '350px', overflowY: 'scroll' }}>
                {renderAccordionFolders(folders)}
              </Box>
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  </>;
};

Docs.propTypes = {
  pageProps: PropTypes.any,
  budget: PropTypes.any,
  styles: PropTypes.object,
  folders: PropTypes.array,
  open: PropTypes.bool,
  activeFolder: PropTypes.number,
  onImagesUpload: PropTypes.func,

};

export default Docs;
