import { useContext } from "react";

import { AccountContext } from "../../context/AccountProvider";

import { Dialog, Box, styled } from "@mui/material";

import Menu from "./menu/Menu";
import EmptyChat from "./Chat-message/EmptyChat";
import ChatBox from "./Chat-message/ChatBox";

const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 73%;
  height: 100%;
  min-width: 300px;
`;

const dilogstyle = {
  height: "95%",
  width: "100%",
  margin: "20px",
  borderRadius: 0,
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  overflow: "hidden",
};

const ChatDiaolog = () => {
  const { person } = useContext(AccountContext);

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dilogstyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <Component>
        <LeftComponent>
          <Menu />
        </LeftComponent>
        <RightComponent>
          {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
        </RightComponent>
      </Component>
    </Dialog>
  );
};

export default ChatDiaolog;
