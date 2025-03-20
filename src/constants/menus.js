import {
  AreaChartOutlined,
  DatabaseOutlined,
  OrderedListOutlined,
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
        key: "/master/products",
        label: "Produk",
        icon: <ProductOutlined />,
        path: "master/products",
      },
      {
        key: "/master/categories",
        label: "Kategori",
        icon: <OrderedListOutlined />,
        path: "master/categories",
      },
    ],
  },
];
