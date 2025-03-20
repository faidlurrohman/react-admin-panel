import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import { getCategories } from "services/master";
import { columns } from "utils";
import { TABLES } from "constants";
import { Reload } from "components";

export default function Categories() {
  const [load, setLoad] = useState(true);
  const [records, setRecords] = useState([]);

  const _getRecords = () => {
    setLoad(true);
    getCategories()
      .then((response) => {
        if (response?.status === 200) {
          setRecords(response?.data);
        }
      })
      .finally(() => setLoad(false));
  };

  const _reload = useCallback(() => {
    _getRecords(TABLES);
  }, []);

  useEffect(() => _getRecords(TABLES), []);

  return (
    <>
      <div className="flex flex-1 gap-1 pb-3 flex-col sm:flex-row lg:flex-row">
        <Reload onClick={_reload} loading={load} />
      </div>
      <Table
        bordered
        scroll={{
          scrollToFirstRowOnChange: true,
          x: "100%",
        }}
        loading={load}
        size="middle"
        dataSource={records}
        columns={columns([
          {
            key: "name",
            title: "Nama",
          },
          {
            key: "slug",
            title: "Slug",
          },
        ])}
        rowKey={(record) => record?.id}
      />
    </>
  );
}
