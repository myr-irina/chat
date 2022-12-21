import React, { useEffect, useState, useRef } from 'react';

import {
  Container,
  Paper,
  Box,
  Typography,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  FormControl,
  TextField,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { MessageData } from '../model';
import './chat.css';
import Auth from '../auth';
import Bar from '../bar';

function Chat() {
  const [user, setUser] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function handleUserChange(evt) {
    setUser(evt.target.value);
  }

  function handleUserSubmit() {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    }
    setIsOpen(true);
  }

  const [chatMessages, setChatMessages] = useState([]);

  const messageList = chatMessages.map((chatItem, index) => (
    <ListItem key={index}>
      <ListItemText primary={`${chatItem.user}: ${chatItem.message}`} />
    </ListItem>
  ));

  const [message, setMessage] = useState('');

  const ENTER_KEY_CODE = 13;
  const scrollToBottom = useRef(null);

  function handleMessageChange(evt) {
    setMessage(evt.target.value);
  }

  function sendMessage() {
    if (user && message) {
      localStorage.setItem(
        'chatMessages',
        JSON.stringify([...chatMessages, new MessageData(user, message)])
      );

      if (scrollToBottom.current) {
        scrollToBottom.current.scrollIntoView({ behavior: 'smooth' });
      }
      setMessage('');
    }
  }

  function handleEnterKey(evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      sendMessage();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const localStorageItems = JSON.parse(
        localStorage.getItem('chatMessages')
      );

      if (localStorageItems) {
        setChatMessages(localStorageItems);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Bar />
      <Container>
        <Paper elevation={5}>
          <Box p={3}>
            {!isOpen ? (
              <Auth
                user={user}
                handleUserSubmit={handleUserSubmit}
                handleUserChange={handleUserChange}
              />
            ) : (
              <>
                <Typography p={2} variant="h6" gutterBottom>
                  Welcome to our chat!
                </Typography>
                <Divider />
                <Grid container spacing={1} alignItems="center">
                  <Grid id="chat-window" xs={12} item>
                    <List id="chat-window-messages">
                      {messageList}
                      <ListItem ref={scrollToBottom}></ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      value={user}
                      InputProps={{
                        readOnly: true,
                      }}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <FormControl fullWidth>
                      <TextField
                        onChange={handleMessageChange}
                        onKeyDown={handleEnterKey}
                        value={message}
                        label="Type your message..."
                        variant="outlined"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      aria-label="send"
                      color="primary"
                      onClick={sendMessage}
                    >
                      <SendIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Chat;
