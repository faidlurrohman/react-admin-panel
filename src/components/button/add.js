import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Add({ title, onClick, loading, ...rest }) {
  const { t } = useTranslation();

  return (
    <Button
      variant="solid"
      color="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
      disabled={loading}
      {...rest}
    >
      {title ?? t("common:_button.add")}
    </Button>
  );
}
