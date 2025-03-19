import {
  AreaChartOutlined,
  DatabaseOutlined,
  ProductOutlined,
} from "@ant-design/icons";

export const MENUS = [
  { key: "/", icon: <AreaChartOutlined />, label: "Dashboard", path: "/" },
  {
    key: "/master",
    label: "Data Master",
    icon: <DatabaseOutlined />,
    children: [
      {
        key: "/master/product",
        label: "Produk",
        icon: <ProductOutlined />,
        path: "master/product",
      },
    ],
  },
];
