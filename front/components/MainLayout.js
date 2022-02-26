import React from "react";
import ProTypes from "prop-types";
import { Layout } from "antd";
import MainHeader from "./MainHeader";
import MainView from "./MainView";

const MainLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <MainHeader />
      <MainView />
    </Layout>
  );
};

MainLayout.propTypes = {
  children: ProTypes.node.isRequired,
};

export default MainLayout;
