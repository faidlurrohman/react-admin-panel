import { LANGUAGES } from "constants";

export default {
  ...LANGUAGES.find((i) => i?.key === "en")?.locale,
  _button: {
    login: "Login",
    add: "Add",
    refresh: "Refresh",
    reset_filter: "Reset Filter",
    back: "Back",
    small: "Small",
    middle: "Middle",
    large: "Large",
    back_to_home: "Back to Homepage",
  },
  _checkbox: {
    remember: "Remember Me",
  },
  _label: {
    email: "Email",
    password: "Password",
    profile: "Profile",
    setting: "Setting",
    logout: "Logout",
    direction: "Direction",
    size: "Size",
    color: "Color",
    radius: "Radius",
  },
  _text: {
    powered_by: "Powered by",
    loader: "Loading",
    search: "Search",
  },
  _column: {
    name: "Name",
    description: "Description",
    price: "Price",
    slug: "Slug",
  },
  _menu: {
    dashboard: "Dashboard",
    master: "Master",
    products: "Products",
    categories: "Categories",
  },
  _confirm: {
    ok: "Yes, continue",
    cancel: "Cancel",
    title_logout: "Logout",
    content_logout: "Are you sure to continue ?",
  },
};
