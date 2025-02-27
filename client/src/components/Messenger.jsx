
import { useContext } from 'react';

import {AppBar, Toolbar, styled, Box} from "@mui/material"

import { AccountContext } from '../context/AccountProvider';
//components
import LoginDialog from './Accounts/LoginDialog'

// import ChatDiaolog from './chat/ChatDiaolog';
// import chatDiaolog from './chat/ChatDiaolog';
  
import ChatDiaolog from './chat/ChatDialog'




const Header = styled(AppBar)`
  height: 125px;
  background-color: #00a884;
  box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
  height: 220px;
  background-color: #00bfa5;
  box-shadow: none;
`;

const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Messenger = () => {

const {account} = useContext(AccountContext);

  return (
    <Component>
      {
        account? 
      <>
    <Header>
      <Toolbar></Toolbar>
    </Header>
    <ChatDiaolog/>
    </>
    :
    <>
    <LoginHeader>
      <Toolbar></Toolbar>
    </LoginHeader>
    <LoginDialog/>
    </>


}
    </Component>
  )
}

export default Messenger