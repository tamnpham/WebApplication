import { lazy } from "react";
import IntroContent from "../content/IntroContent.json";
import Header from "../components/Header";

import Container from "../common/Container";
import ScrollToTop from "../common/ScrollToTop";
import ContentBlock from "../components/ContentBlock";
import { Styles } from "../styles/styles";

const Home = () => {
  return (
    <>
      <Styles />
      <Header />
      <Container>
        <ScrollToTop />
        <ContentBlock
          type="right"
          title={IntroContent.title}
          content={IntroContent.text}
          button={IntroContent.button}
          icon="developer.svg"
          id="intro"
        />
      </Container>
    </>
  );
};

export default Home;
