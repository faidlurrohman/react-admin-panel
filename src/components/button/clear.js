import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Clear({ title, onClick, loading, ...rest }) {
  const { t } = useTranslation();

  return (
    <Button
      variant="solid"
      color="danger"
      icon={<CloseOutlined />}
      onClick={onClick}
      disabled={loading}
      {...rest}
    >
      {title ?? t("common:_button.reset_filter")}
    </Button>
  );
}
