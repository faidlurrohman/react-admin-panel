import { UserOutlined } from "@ant-design/icons";
import { upper } from "./typography";

export const avatar = (data, image = false, result) => {
  result = <UserOutlined />;

  if (image && data?.image && typeof data?.image === "string") {
    result = data?.image;
  }

  if (!image && data?.username && typeof data?.username === "string") {
    result = upper(data?.username.charAt(0));
  }

  return result;
};
