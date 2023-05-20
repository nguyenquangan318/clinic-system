import "bootstrap/dist/css/bootstrap.css";
import buildClient from "../api/buildClient";
import "./style.css";
import Header from "../components/Header";
import { ChatContextProvider } from "../context/ChatContext";
import { AuthContextProvider } from "../context/AuthContext";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <AuthContextProvider currentUser={currentUser}>
        <ChatContextProvider>
          <Header currentUser={currentUser}></Header>
          <Component {...pageProps} />
        </ChatContextProvider>
      </AuthContextProvider>
    </>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/user/currentUser");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
