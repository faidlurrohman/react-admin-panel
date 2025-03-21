import React, { useCallback, useState } from "react";
import {
  Avatar,
  Button,
  ColorPicker,
  Divider,
  Dropdown,
  Form,
  InputNumber,
  Layout,
  Modal,
  Radio,
  Segmented,
} from "antd";
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SettingOutlined,
  SunOutlined,
  TranslationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { avatar } from "utils";
import { logout } from "stores/actions/session";
import { setConfirm } from "stores/actions/feedback";
import { setSetting } from "stores/actions/setting";
import { LANGUAGES } from "constants";

const { Header: HeaderAntd } = Layout;

function SettingsModal({
  form,
  dispatch,
  direction,
  primary_color,
  size,
  radius,
  isOpen,
  handleModal,
}) {
  const _formChange = useCallback((event) => {
    const { radius, target, metaColor } = event;

    if (metaColor) {
      dispatch(setSetting({ primary_color: metaColor?.toHexString() }));
    }

    if (target?.name === "direction") {
      dispatch(setSetting({ direction: target?.value }));
    }

    if (target?.name === "size") {
      dispatch(setSetting({ size: target?.value }));
    }

    if (![null, undefined].includes(radius)) {
      dispatch(setSetting({ radius: radius }));
    }
  }, []);

  return (
    <Modal
      centered
      open={isOpen}
      title="Pengaturan"
      onCancel={() => handleModal(false)}
      footer={[
        <Button key="back" onClick={() => handleModal(false)}>
          Kembali
        </Button>,
      ]}
    >
      <Divider />
      <Form
        form={form}
        labelCol={{ span: 8 }}
        initialValues={{
          direction: direction,
          size: size,
          primary: primary_color,
          radius: radius,
        }}
      >
        <Form.Item name="direction" label="Tampilan">
          <Radio.Group name="direction" onChange={_formChange}>
            <Radio.Button key="ltr" value="ltr">
              LTR
            </Radio.Button>
            <Radio.Button key="rtl" value="rtl">
              RTL
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="size" label="Ukuran">
          <Radio.Group name="size" onChange={_formChange}>
            <Radio.Button key="small" value="small">
              Kecil
            </Radio.Button>
            <Radio.Button key="middle" value="middle">
              Sedang
            </Radio.Button>
            <Radio.Button key="large" value="large">
              Besar
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="primary" label="Warna">
          <ColorPicker showText onChangeComplete={_formChange} />
        </Form.Item>
        <Form.Item name="radius" label="Border Radius">
          <InputNumber
            min={0}
            max={100}
            onChange={(e) => _formChange({ radius: e })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default function Header({ collapsed, setCollapsed, handleDrawer }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.session);
  const { direction, primary_color, size, radius, theme } = useSelector(
    (state) => state.setting
  );
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const [form] = Form.useForm();

  const _handleSettingModal = useCallback((set) => {
    setSettingModalOpen(set);

    if (set) {
      form.resetFields();
    }
  }, []);

  const _confirmLogout = useCallback(() => {
    dispatch(
      setConfirm({
        title: "Keluar Aplikasi",
        content: "Apakah anda yakin untuk melanjutkan ?",
        onOk() {
          dispatch(logout());
        },
      })
    );
  }, []);

  const _toggleTheme = useCallback((value) => {
    dispatch(setSetting({ theme: value }));
  }, []);

  return (
    <HeaderAntd className="px-2.5 sticky top-0 w-full mt-2 z-[10]">
      <div className="flex justify-between h-full bg-white dark:bg-quinary shadow-sm rounded-md px-4">
        <div className="hidden relative items-center lg:grid">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={setCollapsed}
          />
        </div>
        <div className="relative block items-center lg:hidden">
          <Button
            type="text"
            shape="circle"
            icon={<MenuOutlined />}
            onClick={() => handleDrawer(true)}
          />
        </div>
        <div className="flex justify-center items-center text-end gap-2">
          <Dropdown
            menu={{
              items: LANGUAGES.map((item) => ({
                ...item,
                onClick: () => dispatch(setSetting({ language: item?.key })),
              })),
              selectable: true,
              // defaultSelectedKeys: [modified?.language ?? original?.language],
            }}
            trigger={["click"]}
          >
            <Button shape="round" icon={<TranslationOutlined />}>
              {/* {upper(modified?.language ?? original?.language)} */}
              ...
            </Button>
          </Dropdown>
          <Segmented
            shape="round"
            value={theme ?? "light"}
            size={size}
            options={[
              { value: "light", icon: <SunOutlined /> },
              { value: "dark", icon: <MoonOutlined /> },
            ]}
            onChange={_toggleTheme}
          />
          <Dropdown
            className="cursor-pointer"
            placement="bottomLeft"
            menu={{
              items: [
                {
                  key: "avatar_with_username",
                  label: (
                    <span className="dark:text-white">
                      Hi,{" "}
                      <span className="font-bold underline">
                        {user?.username ?? "Your username"}
                      </span>
                      !
                    </span>
                  ),
                  icon: (
                    <Avatar
                      size="small"
                      src={avatar(user, true)}
                      shape="circle"
                    >
                      {avatar(user)}
                    </Avatar>
                  ),
                  className: "gap-1 h-10 min-w-[12rem] text-black",
                  disabled: true,
                },
                { type: "divider" },
                {
                  key: "profile",
                  label: "Profil",
                  icon: <UserOutlined />,
                  className: "min-w-[12rem]",
                },
                {
                  key: "setting",
                  label: "Pengaturan",
                  icon: <SettingOutlined />,
                  className: "min-w-[12rem]",
                  onClick: () => _handleSettingModal(true),
                },
                { type: "divider" },
                {
                  key: "logout",
                  label: "Keluar",
                  icon: <LogoutOutlined className="text-error" />,
                  className: "text-error min-w-[12rem]",
                  onClick: _confirmLogout,
                },
              ],
            }}
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
          >
            <Avatar src={avatar(user, true)} shape="circle">
              {avatar(user)}
            </Avatar>
          </Dropdown>
        </div>
      </div>
      <SettingsModal
        form={form}
        isOpen={settingModalOpen}
        handleModal={_handleSettingModal}
        dispatch={dispatch}
        direction={direction}
        primary_color={primary_color}
        size={size}
        radius={radius}
      />
    </HeaderAntd>
  );
}
