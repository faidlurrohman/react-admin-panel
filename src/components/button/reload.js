import React from "react";
import { LoadingOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Reload({ title = "Perbarui Data", onClick, loading }) {
  return (
    <Button
      variant="solid"
      color="primary"
      icon={loading ? <LoadingOutlined /> : <ReloadOutlined />}
      disabled={loading}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}
