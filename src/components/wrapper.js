import React, { useCallback, useEffect, useState } from "react";
import { Drawer, Layout, Menu } from "antd";
import Header from "./header";
import Footer from "./footer";
import { IMAGE } from "constants";
import { MENUS } from "constants";
import { useLocation, useNavigate } from "react-router";
import { CloseOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

export default function Wrapper({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(null);
  const [openKeys, setOpenKeys] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const _onOpenChange = useCallback((keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (MENUS.map(({ key }) => key).indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  }, []);

  const _onClickMenu = useCallback(
    (menu) => {
      // not trigger if currenly same menu
      if (activeMenu === menu?.key) {
        return;
      }

      // trigger from location react router
      if (menu?.pathname) {
        let split_path = menu?.pathname.split("/");

        // for level 1
        if (split_path?.length === 3) {
          _onOpenChange([`/${split_path[1]}`]);
        } else {
          _onOpenChange([]);
        }

        setActiveMenu(menu?.pathname);
      }
      // trigger from on click menu
      else {
        setActiveMenu(menu?.keyPath);
        navigate(menu?.key);
      }
    },
    [activeMenu]
  );

  const _handleDrawer = useCallback((value) => {
    setIsDrawerOpen(value);
  }, []);

  useEffect(() => {
    _onClickMenu(location);
  }, [location]);

  return (
    <Layout className="h-screen">
      <Sider
        theme="light"
        width={280}
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="hidden lg:z-[1] lg:block lg:shadow-sm lg:overflow-auto lg:h-screen lg:top-0 lg:left-0 lg:sticky"
      >
        <div className="h-10 m-4 flex justify-center items-center">
          <img src={IMAGE.LogoHere} alt="Not found" className="w-36" />
        </div>
        <Menu
          mode="inline"
          className="sider-menu border-r-0 p-2"
          items={MENUS}
          selectedKeys={activeMenu}
          onClick={_onClickMenu}
          openKeys={openKeys}
          onOpenChange={_onOpenChange}
        />
      </Sider>
      <Drawer
        title={
          <div className="h-10 flex justify-center items-center">
            <img src={IMAGE.LogoHere} alt="Not found" className="w-36" />
          </div>
        }
        closeIcon={<CloseOutlined />}
        placement="left"
        onClose={() => _handleDrawer(false)}
        open={isDrawerOpen}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          className="sider-menu border-r-0 p-2"
          items={MENUS}
          selectedKeys={activeMenu}
          onClick={_onClickMenu}
          openKeys={openKeys}
          onOpenChange={_onOpenChange}
        />
      </Drawer>
      <Layout>
        <Header
          collapsed={collapsed}
          setCollapsed={() => setCollapsed(!collapsed)}
          handleDrawer={_handleDrawer}
        />
        <Content className="bg-white dark:bg-quinary p-2.5 m-2.5 rounded-md shadow-sm">
          {children}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
}
