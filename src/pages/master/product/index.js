import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { getProducts } from "services/master";
import { columns, filtersBeauty } from "utils";
import { TABLES } from "constants";
import { Clear, Reload } from "components";

export default function Product() {
  const [load, setLoad] = useState(true);
  const [records, setRecords] = useState([]);

  const filterRef = useRef(null);
  const [tables, setTables] = useState(TABLES);
  const [filters, setFilters] = useState(null);

  const _getRecords = (params) => {
    setLoad(true);
    Promise.all([
      getProducts(params),
      getProducts({ ...params, skip: ["limit"] }),
    ])
      .then(([filtered, nonFiltered]) => {
        if (filtered?.status === 200 && nonFiltered?.status === 200) {
          setRecords(filtered?.data);
          setTables({ ...params, total: nonFiltered?.data?.length });
        }
      })
      .finally(() => setLoad(false));
  };

  const _onTableChange = (pagination, filters) => {
    setFilters(filtersBeauty(filters));
    _getRecords({ ...pagination, filters });
  };

  const _reload = useCallback(() => {
    _getRecords({ ...pagination, filters });
  }, []);

  const _clear = useCallback(() => {
    setFilters(null);
    _getRecords(TABLES);
  }, []);

  useEffect(() => _getRecords(TABLES), []);

  return (
    <>
      <div className="flex flex-col pb-3 space-y-2 sm:space-y-0 sm:space-x-2 sm:flex-row lg:space-y-0 lg:space-x-2 lg:flex-row">
        <Reload onClick={_reload} laoding={load} />
        {filters ? <Clear onClick={_clear} laoding={load} /> : null}
      </div>
      <Table
        bordered
        scroll={{
          scrollToFirstRowOnChange: true,
          x: "100%",
        }}
        tableLayout="auto"
        loading={load}
        size="middle"
        dataSource={records}
        columns={columns([
          {
            ref: filterRef,
            key: "title",
            title: "Nama",
            filtering: true,
            filters,
          },
          {
            ref: filterRef,
            key: "price",
            title: "Harga",
            filtering: true,
            filters,
            type: "int",
          },
        ])}
        rowKey={(record) => record?.id}
        pagination={tables}
        onChange={_onTableChange}
      />
    </>
  );
}
