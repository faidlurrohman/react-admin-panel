import {
  AreaChartOutlined,
  DatabaseOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const MENUS = [
  { key: "/", icon: <AreaChartOutlined />, label: "Dashboard", path: "/" },
  {
    key: "master",
    label: "Data Master",
    type: "group",
    children: [
      {
        key: "/master",
        label: "Master",
        icon: <DatabaseOutlined />,
        children: [
          {
            key: "/master/user",
            label: "Pengguna",
            icon: <UserOutlined />,
            path: "master/user",
          },
        ],
      },
    ],
  },
];
