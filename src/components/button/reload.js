import React from "react";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslation } from "react-i18next";

export default function Reload({ title, onClick, loading, ...rest }) {
  const { t } = useTranslation();

  return (
    <Button
      variant="solid"
      color="primary"
      icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
      disabled={loading}
      onClick={onClick}
      {...rest}
    >
      {title ?? t("common:_button.refresh")}
    </Button>
  );
}
