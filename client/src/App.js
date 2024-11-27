import { GoogleOAuthProvider } from '@react-oauth/google';
//components
import Messenger from "./components/Messenger";
import AccountProvider from './context/AccountProvider';

function App() {

  const clientId = '1041099003605-k2ari78osq5gv1erdj5kmdtds5bc4ru9.apps.googleusercontent.com'
  return (
    <GoogleOAuthProvider  clientId={clientId}>
     <AccountProvider>
     <Messenger/>
     </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
