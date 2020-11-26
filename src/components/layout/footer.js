import React from "react";
import { Layout } from "antd";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer
      style={{
        position: "absolute",
        bottom: "0",
        width: "100%",
        textAlign: "center",
      }}
    >
      Design by Le Cong Phuong Nam
    </Footer>
  );
};

export default Footer;
