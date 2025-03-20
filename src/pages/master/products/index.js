import React, { useCallback, useEffect, useRef, useState } from "react";
import { Table } from "antd";
import { getProducts } from "services/master";
import { columns, filtersBeauty } from "utils";
import { TABLES } from "constants";
import { Clear, Reload } from "components";

export default function Products() {
  const [load, setLoad] = useState(true);
  const [records, setRecords] = useState([]);

  const filterRef = useRef(null);
  const [tables, setTables] = useState(TABLES);
  const [filters, setFilters] = useState(null);
  const [sorter, setSorter] = useState(null);

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

  const _onTableChange = (pagination, filters, sorter) => {
    setFilters(filtersBeauty(filters));
    setSorter(sorter);
    _getRecords({ ...pagination, filters, sorter });
  };

  const _reload = useCallback(() => {
    _getRecords({ ...tables, filters, sorter });
  }, [tables, filters, sorter]);

  const _clear = useCallback(() => {
    setFilters(null);
    setSorter(null);
    _getRecords(TABLES);
  }, []);

  useEffect(() => _getRecords(TABLES), []);

  return (
    <>
      <div className="flex flex-1 gap-1 pb-3 flex-col sm:flex-row lg:flex-row">
        <Reload onClick={_reload} loading={load} />
        {filters && !load ? (
          <div className="flex flex-col sm:flex-1 sm:items-end lg:flex-1 lg:items-end">
            <Clear onClick={_clear} loading={load} />
          </div>
        ) : null}
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
            ref: filterRef,
            key: "title",
            title: "Nama",
            filtering: true,
            filters,
            width: 300,
          },
          {
            ref: filterRef,
            key: "description",
            title: "Deskripsi",
            filtering: true,
            filters,
            width: 600,
          },
          {
            ref: filterRef,
            key: "price",
            title: "Harga",
            filtering: true,
            filters,
            sorting: true,
            sorter,
            type: "int",
            width: 200,
            render: (value) => <>${value}</>,
          },
        ])}
        rowKey={(record) => record?.id}
        pagination={tables}
        onChange={_onTableChange}
      />
    </>
  );
}
