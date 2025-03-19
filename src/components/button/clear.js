import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function Clear({ title = "Hapus Pencarian", onClick, loading }) {
  return (
    <Button
      variant="solid"
      color="danger"
      icon={<CloseOutlined />}
      onClick={onClick}
      disabled={loading}
    >
      {title}
    </Button>
  );
}
