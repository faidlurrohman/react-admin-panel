import i18n from "translations";
import {
  AreaChartOutlined,
  DatabaseOutlined,
  OrderedListOutlined,
  ProductOutlined,
} from "@ant-design/icons";

export const menu = () => [
  {
    key: "/",
    icon: <AreaChartOutlined />,
    label: i18n.t("common:_menu.dashboard"),
    path: "/",
  },
  {
    key: "/master",
    label: i18n.t("common:_menu.master"),
    icon: <DatabaseOutlined />,
    children: [
      {
        key: "/master/products",
        label: i18n.t("common:_menu.products"),
        icon: <ProductOutlined />,
        path: "master/products",
      },
      {
        key: "/master/categories",
        label: i18n.t("common:_menu.categories"),
        icon: <OrderedListOutlined />,
        path: "master/categories",
      },
    ],
  },
];
