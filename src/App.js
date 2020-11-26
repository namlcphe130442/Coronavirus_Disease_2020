import { Layout } from "antd";
import "antd/dist/antd.css";
import Header from "./components/layout/header";
import Content from "./components/layout/content";
import Footer from "./components/layout/footer";

const App = () => {
  return (
    <Layout style={{ position: "relative", minHeight: "100vh" }}>
      <Header />
      <Content />
      <Footer />
    </Layout>
  );
};

export default App;
