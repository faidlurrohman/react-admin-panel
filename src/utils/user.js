import { UserOutlined } from "@ant-design/icons";
import { upper } from "./typography";

export const avatar = (data, avatar = false, result) => {
  result = <UserOutlined />;

  if (avatar && data?.avatar && typeof data?.avatar === "string") {
    result = data?.avatar;
  }

  if (!avatar && data?.username && typeof data?.username === "string") {
    result = upper(data?.username.charAt(0));
  }

  return result;
};
