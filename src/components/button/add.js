import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Add({ title = "Tambah", onClick, loading }) {
  return (
    <Button
      variant="solid"
      color="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
      disabled={loading}
    >
      {title}
    </Button>
  );
}
