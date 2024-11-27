import { Box, styled } from "@mui/material";

import { useContext, useState, useEffect, useRef } from "react";

import { AccountContext } from "../../../context/AccountProvider";

import { getMessage, newMessage } from "../../../services/api";

//component
import Footer from "./Footer";
import Message from "./Message";


const Container = styled(Box)`
padding: 1px 80px;
`;

const Wrapper = styled(Box)`
  background-image: url(${"https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png"});
  background-size: 50%;
`;

const Component = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const ChatMessages = ({ person, conversation }) => {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState("");
  
  const [file, setFile] = useState();
const [image, setImage] = useState();
const [incomingMessage, setIncomingMessage] = useState(null); 

const scrollRef = useRef();

  const { account, socket, newMessageFlag, setNewMessageFlag} = useContext(AccountContext);

  useEffect(() => {
socket.current.on('getMessgae', data => {
setIncomingMessage({
  ...data,
  createdAt: Date.now()
})
})
  },[])

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessage(conversation._id);
      setMessages(data);
    };
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newMessageFlag]);



useEffect(() => {
scrollRef.current?.scrollIntoView({transition: 'smooth'})
},[messages])


useEffect(() => {
incomingMessage && conversation?.members?.includes(incomingMessage.senderId) &&
setMessages(prev => [...prev, incomingMessage])
},[incomingMessage, conversation] )



  const sendText = async (e) => {
    const code = e.keyCode || e.which;

    if (code === 13) {
let message = {};
      if(!file){

      message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: "text",
        text: value,
      }
    }
    else {
      if(image == null){
        message = {
          senderId: account.sub,
          receiverId: person.sub,
          conversationId: conversation._id,
          type: "file",
          text: image,
        }
      }
      else {
       message = {
        senderId: account.sub,
        receiverId: person.sub,
        conversationId: conversation._id,
        type: "file",
        text: image.imageUrl,
      }
    }
    }

    socket.current.emit('sendMessage', message)
      await newMessage(message);

      setValue('');
      setFile('');
      setImage('');
      setNewMessageFlag(prev => !prev)
    }
  };

  return (
    <Wrapper>
      <Component>
        {messages && messages.map((message) => 
        <Container ref={scrollRef}>
        <Message message={message} />
        </Container>
        )}
      </Component>
      <Footer sendText={sendText} setValue={setValue} value={value} file={file} setFile={setFile} setImage={setImage} />
    </Wrapper>
  );
};

export default ChatMessages;








// import { Box, styled } from "@mui/material";
// import { useContext, useState, useEffect } from "react";
// import { AccountContext } from "../../../context/AccountProvider";
// import { getMessage, newMessage } from "../../../services/api";
// import Footer from "./Footer";
// import Message from "./Message";

// const Container = styled(Box)`
//   padding: 1px 80px;
// `;

// const Wrapper = styled(Box)`
//   background-image: url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png");
//   background-size: 50%;
// `;

// const Component = styled(Box)`
//   height: 80vh;
//   overflow-y: scroll;
// `;

// const ChatMessages = ({ person, conversation }) => {
//   const [value, setValue] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [newMessageFlag, setNewMessageFlag] = useState(false);
//   const [file, setFile] = useState(null); // Changed to null for better handling
//   const [image, setImage] = useState(null); // Changed to null for better handling

//   const { account } = useContext(AccountContext);

//   useEffect(() => {
//     const getMessageDetails = async () => {
//       if (conversation._id) {
//         let data = await getMessage(conversation._id);
//         setMessages(data);
//       }
//     };
//     getMessageDetails();
//   }, [person._id, conversation._id, newMessageFlag]);

//   const sendText = async (e) => {
//     const code = e.keyCode || e.which;

//     if (code === 13) {
//       let message = {
//         senderId: account.sub,
//         receiverId: person.sub,
//         conversationId: conversation._id,
//       };

//       if (file) {
//         // If a file is attached, set message type as 'file' and attach file content
//         message.type = "file";
//         console.log(image);
//         message.text = image.imageUrl; // Assuming image state holds the file content
//       } else {
//         // If no file attached, set message type as 'text' and attach text content
//         message.type = "text";
//         message.text = value;
//       }

//       // Make the API call to send the message
//       await newMessage(message);

//       // Reset states after sending message
//       setValue("");
//       setFile(null);
//       setImage(null);
//       setNewMessageFlag((prev) => !prev);
//     }
//   };

//   return (
//     <Wrapper>
//       <Component>
//         {messages.map((message, index) => (
//           <Container key={index}>
//             <Message message={message} />
//           </Container>
//         ))}
//       </Component>
//       <Footer
//         sendText={sendText}
//         setValue={setValue}
//         value={value}
//         file={file}
//         setFile={setFile}
//         setImage={setImage}
//       />
//     </Wrapper>
//   );
// };

// export default ChatMessages;
