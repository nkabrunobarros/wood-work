/* eslint-disable react/prop-types */
//  Nodes
import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline'

import Grid from '@mui/material/Grid'
import CustomBreadcrumbs from '../../breadcrumbs'
import Content from '../../content/content'
import PrimaryBtn from '../../buttons/primaryBtn'
import { MessageSquare, Package } from 'lucide-react'

import CustomTable from '../../table/table'

import styles from '../../../styles/Messages.module.css'
import { Avatar, Button, OutlinedInput } from '@mui/material'
import { Box } from '@mui/system'

import PropTypes from 'prop-types'
import moment from 'moment'
import scrollToBottom from '../../utils/ScrollToBottom'

const Messages = ({ ...props }) => {
  const { dummy, breadcrumbsPath } = props
  const [history, setHistory] = useState(dummy)
  const [newMessage, setNewMessage] = useState('')
  const [activeRow, setActiveRow] = useState(0)
  const [loadMessage, setLoadMessage] = useState(new Date())

  useEffect(() => {
    const scroll = () => {
      scrollToBottom('messagesContainer')
    }
    scroll()
  }, [loadMessage])
  const handleSendMessage = (event) => {
    setLoadMessage(new Date())
    event.preventDefault()

    const allMsg = history
    const newMessageStucture = {
      id: Math.random(),
      sentBy: 'me',
      content: newMessage,
      createdAt: moment().format('DD/MM/YYYY H:mm')
    }
    allMsg.push(newMessageStucture)
    setHistory(allMsg)
    setNewMessage('')
  }

  const MessageRow = ({ num }) => {
    let style = {}
    if (activeRow === num) {
      style = {
        backgroundColor: 'var(--primary-light-opacity)',
        borderColor: 'var(--primary)'
      }
    }
    return (
      <tr
        className={styles.messageRow}
        style={style}
        onClick={() => setActiveRow(num)}
      >
        <td data-label='Mensagem' className={styles.messageRowContent}>
          <div className={styles.avatarContainer}>
            <Avatar className={styles.avatar}>N</Avatar>
          </div>
          <div style={{ paddingLeft: '1rem' }}>
            <div className={styles.sender}> Encomenda Nº 17212</div>
            <div>
              Hey man this is a dummy text just to see how far this goes and how
              it goes and still goes futher than this omg what the hell
            </div>
          </div>
        </td>
        <td data-label='Data'>
          <a>11/02/2022</a>
        </td>
        <td>{activeRow === num ? <div className='dot'></div> : null}</td>
      </tr>
    )
  }

  const ConversationRow = ({ message }) => {
    ConversationRow.propTypes = {
      message: PropTypes.object
    }
    if (message.sentBy === 'me') {
      return (
        <div className={styles.conversation}>
          <a
            className={styles.conversationContentMe}
            style={{ marginLeft: 'auto' }}
          >
            {message.content}
            <br></br>
            <a className={styles.messageDate}> {message.createdAt}</a>
          </a>
          <Avatar className={styles.avatar}>B</Avatar>
        </div>
      )
    } else {
      return (
        <div className={styles.conversation}>
          <Avatar className={styles.avatar}>N</Avatar>
          <div className={styles.conversationContent}>
            {message.content}
            <br></br>
            <a className={styles.messageDate}> {message.createdAt}</a>
          </div>
        </div>
      )
    }
  }

  return (
    <Grid component='main'>
      <CssBaseline />
      <CustomBreadcrumbs path={breadcrumbsPath} />
      <Content>
        <div
          id='pad'
          style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid var(--grayTexts)'
          }}
        >
          <div>
            <a className='headerTitleXl'>Mensagens</a>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <PrimaryBtn icon={<MessageSquare />} text={'Criar Nova'} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.messagesContainer}>
            <div className={styles.scrollableZone}>
              <CustomTable
                columns={['Mensagem', 'Data', '']}
                style={{ overflow: 'scroll' }}
              >
                {[...Array(10)].map((x, i) => (
                  <MessageRow key={i} num={i} />
                ))}
              </CustomTable>
            </div>
          </div>
          <div className={styles.chatContainer}>
            <div className={styles.chatTitleContainer}>
              <span>
                <Package />
              </span>
              <a>Encomenda Nº 17212</a>
            </div>
            <div
              id='messagesContainer'
              className={styles.scrollableZone}
            >
              {history.map((message) => (
                <ConversationRow key={message.id} message={message} />
              ))}
            </div>
            <Box
              component='form'
              noValidate
              onSubmit={handleSendMessage}
              sx={{
                mt: 1,
                width: '100%',
                height: 'fit-content',
                position: 'relative',
                bottom: 0
              }}
            >
              <OutlinedInput
                margin='normal'
                required
                fullWidth
                id='message'
                name='message'
                placeholder='Escrever mensagem...'
                autoFocus
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className={styles.writeMessageInput}
                endAdornment={
                  <Button position='end' type='submit'>
                    Enviar
                  </Button>
                }
              />
            </Box>
          </div>
        </div>
      </Content>
    </Grid>
  )
}
export default Messages
