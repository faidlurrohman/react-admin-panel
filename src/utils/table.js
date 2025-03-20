import { SearchOutlined } from "@ant-design/icons";
import { Input, InputNumber, Tooltip, Typography } from "antd";
import { lower } from "./typography";

export const columns = (data, results = []) => {
  data?.map((item) => results.push(generateColumn(item)));

  return results;
};

const generateColumn = ({
  ref,
  key,
  title,
  filters,
  filtering = false,
  type = "string",
  sorter,
  sorting = false,
  render = () => null,
  ...rest
}) => ({
  key,
  title: title,
  dataIndex: key,
  ellipsis: true,
  render: (value) => {
    return (
      <Tooltip placement="topLeft" title={render(value) ?? value}>
        {render(value) ?? value}
      </Tooltip>
    );
  },
  // SORTING
  ...(sorting && {
    sorter: sorting,
    sortOrder: sorter?.columnKey === key ? sorter?.order : null,
  }),
  // FILTER
  ...(filtering && {
    filterDropdown: (props) => filterInput({ ref, title, type, ...props }),
    filterIcon: (filtered) => (
      <SearchOutlined className={`${filtered ? "text-primary" : undefined}`} />
    ),
    filteredValue: filters?.[key] || null,
    filterDropdownProps: {
      onOpenChange: (open) => {
        if (open) {
          setTimeout(() => ref.current?.focus(), 50);
        }
      },
    },
  }),
  ...rest,
});

const filterInput = ({
  type = "string",
  ref,
  title,
  selectedKeys,
  setSelectedKeys,
  confirm,
}) => {
  switch (type) {
    case "string":
      return (
        <div className="p-2 min-w-40 flex flex-row gap-1">
          <Input
            ref={ref}
            className="min-w-40 max-w-56"
            placeholder={`Cari ${lower(title)}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e?.target?.value ? [e?.target?.value] : [])
            }
            onPressEnter={() => confirm()}
          />
        </div>
      );
    case "int":
      return (
        <div className="p-2 min-w-40 flex flex-row gap-1">
          <InputNumber
            ref={ref}
            className="min-w-40 max-w-56"
            placeholder={`Cari ${lower(title)}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e ? [e] : [])}
            onPressEnter={() => confirm()}
          />
        </div>
      );
    default:
      return (
        <div className="p-2 gap">
          <Typography>
            Type filter not supported yet, or you can create a new custom :)
          </Typography>
        </div>
      );
  }
};

export const filtersBeauty = (value, result = null) => {
  Object.keys(value).map((key) => {
    if (value?.[key] && result) {
      result = { ...result, [key]: value?.[key] };
    } else if (value?.[key] && !result) {
      result = { [key]: value?.[key] };
    }
  });

  return result;
};
