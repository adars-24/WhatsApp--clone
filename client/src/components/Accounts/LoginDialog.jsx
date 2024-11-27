

import { useContext } from "react";

import { Dialog, Box, Typography, List, ListItem, styled } from "@mui/material";

import { qrCodeImage } from "../../constants/data";
import { AccountContext } from "../../context/AccountProvider";
import { addUser } from "../../services/api";

import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const dilogstyle = {
  height: "96%",
  width: "60%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  marginTop: "12%",
  overflow: "hidden",
  backgroundColor: 'none',
};

const Component = styled(Box)`
  display: flex;
`;

const Container = styled(Box)`
  padding: 56px 0 56px 56px;
`;

const QrCode = styled("img")({
  height: 264,
  width: 264,
  margin: "50px 0 0 50px",
});

const Title = styled(Typography)`
  font-size: 25px;
  color: #525252;
  font-weight: 300;
  font-family: inherit;
  margin-bottom: 25px;
`;

const StyledList = styled(List)`
  & > li {
    padding: 0;
    margin-top: 15px;
    font-size: 18px;
    line-height: 28px;
    color: #4a4a4a;
  }
`;

const LoginDialog = () => {

const {setAccount} = useContext(AccountContext)

  const onLoginSuccess = async (res) => {
    const decoded = jwtDecode(res.credential)
    console.log(decoded);
    setAccount(decoded);
    await addUser(decoded)
  };

  const onLoginError = (res) => {
    console.log("login failed", res);
  };

  return (
    <Dialog open={true} PaperProps={{ sx: dilogstyle }} hideBackdrop={true}>
      <Component>
        <Container>
          <Title>To use WhatsApp on your computer</Title>
          <StyledList>
            <ListItem> 1.Open WhatsApp on your phone</ListItem>
            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
            <ListItem>
              3. Point your phone to this screen to capture the code
            </ListItem>
          </StyledList>
        </Container>
        <Box style={{ position: "relative" }}>
          <QrCode src={qrCodeImage} alt="qr code" />
        </Box>
        <Box style={{ position: "absolute", top: "50%" }}>
          <GoogleLogin onSuccess={onLoginSuccess} onError={onLoginError} />
        </Box>
      </Component>
    </Dialog>
  );
};

export default LoginDialog;
