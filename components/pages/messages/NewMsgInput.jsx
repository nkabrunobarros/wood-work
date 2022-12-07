import { Box, Button, Chip, IconButton, OutlinedInput } from "@mui/material";
import { ImagePlus, Send } from "lucide-react";
import moment from "moment";
import React, { useState } from 'react';
import ConvertBase64 from "../../utils/ConvertBase64";
//  PropTypes
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

const NewMsgInput = (props) => {
    const { windowWidth, styles, pageProps, setLoadMessage, conversations, setConversations, activeRow} = props;
    const [newMessage, setNewMessage] = useState('');
    const [files, setFiles] = useState();
    const loggedUser = JSON.parse(localStorage.getItem('user'));

    async function onFileInput(e) {
        const arr = [];
    
        for (let index = 0; index < Object.keys(e.target.files).length; index++) {
          const file = e.target.files[index];
    
          await ConvertBase64(file)
            .then(result => {
              file.base64 = result;
              arr.push(file);
            })
            .catch(err => {
              console.log(err);
            });
    
        }
    
        const a = arr.filter(ele => ele.size>= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);
    
        if (arr.find(ele => ele.size>= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE)) {
          toast.error(`${Object.keys(a).length} não foram carregadas, tamanho maximo de 1 MB ( ${a.map(x => `${x.name} `)} )`);
          arr.filter(ele => ele.size <= process.env.NEXT_PUBLIC_MAX_UPLOAD_FILE_SIZE);
        }
    
        if (arr) setFiles(arr);
      }

      const handleSendMessage = (event) => {
        event.preventDefault();
    
        if (!newMessage && !files) return;
    
        setLoadMessage(new Date());
    
        const allConversations = conversations;
    
        if (files) {
          // eslint-disable-next-line array-callback-return
          files.map(file => {
            const newMessageStucture = {
              id: Math.random(),
              sentBy: loggedUser.id,
              content: file.base64,
              msg: newMessage,
              createdAt: moment(Date.now()).format(),
              type: 'file'
            };

            allConversations[activeRow].messagesContent.push(newMessageStucture);
            setConversations(allConversations);
            setNewMessage('');
          });

          setFiles();
        }
    
        if (newMessage && !files) {
          const newMessageStucture = {
            id: Math.random(),
            sentBy: loggedUser.id,
            content: newMessage,
            createdAt: moment().format(),
            type: 'text'
          };
    
          allConversations[activeRow].messagesContent.push(newMessageStucture);
          setConversations(allConversations);
          setNewMessage('');
    
        }
      };

    return (
        <Box
        component='form'
        noValidate
        onSubmit={handleSendMessage}
        sx={{ width: '100%', marginLeft: windowWidth> 900 && '2rem', marginRight: windowWidth> 900 && '2rem' }}>
        <OutlinedInput
          required
          fullWidth
          placeholder='Aa'
          autoFocus
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={styles.writeMessageInput}
          endAdornment={
            <>
              {files && <Chip label={`${files.length} anexo(s)`} onDelete={() => setFiles()}/>}
              <IconButton component='label'>
                <ImagePlus
                  strokeWidth={pageProps.globalVars.iconStrokeWidth}
                  size={pageProps.globalVars.iconSize}
               />
                <input multiple type='file' accept='image/*,.pdf' name='file' hidden onChange={(e) => onFileInput(e)}/>
              </IconButton>
              <Button position='end' type='submit'>
                {windowWidth> 900 ? 'Enviar' : <Send size={20}/>}
              </Button>
            </>
          }
       />
      </Box>
    );
};

NewMsgInput.propTypes = {
    windowWidth: PropTypes.number,
    styles: PropTypes.object,
    pageProps: PropTypes.object, 
    setLoadMessage: PropTypes.func,
    conversations: PropTypes.array,
    setConversations: PropTypes.func,
    activeRow: PropTypes.number,
};

export default NewMsgInput;