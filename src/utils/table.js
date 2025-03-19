import { SearchOutlined } from "@ant-design/icons";
import { Input, InputNumber, Tooltip, Typography } from "antd";
import { lower } from "./typography";

let query;

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
  ...rest
}) => ({
  key,
  title: title,
  dataIndex: key,
  ellipsis: true,
  render: (value) => {
    let showValue = value;

    return (
      <Tooltip placement="topLeft" title={showValue}>
        {showValue}
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
        <div
          className="p-2 min-w-40 flex flex-row gap-1"
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={ref}
            className="min-w-40 max-w-56"
            placeholder={`Cari ${lower(title)}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              triggerFilterOnInput(confirm, setSelectedKeys, e.target.value)
            }
            onPressEnter={() => confirm()}
          />
        </div>
      );
    case "int":
      return (
        <div
          className="p-2 min-w-40 flex flex-row gap-1"
          onKeyDown={(e) => e.stopPropagation()}
        >
          <InputNumber
            ref={ref}
            className="min-w-40 max-w-56"
            placeholder={`Cari ${lower(title)}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              triggerFilterOnInput(confirm, setSelectedKeys, e, 0)
            }
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

const triggerFilterOnInput = (
  next,
  set,
  value,
  treshold = 2,
  debounce = 1000
) => {
  set(value ? [value] : []);

  if (query) clearTimeout(query);

  if (String(value)?.length > treshold) {
    query = setTimeout(() => {
      next();
    }, debounce);
  } else if (String(value)?.length === 0) {
    query = setTimeout(() => {
      next();
    }, debounce);
  }
};

export const filtersBeauty = (value, result = null) => {
  Object.keys(value).map((key) => {
    if (value?.[key]) {
      result = result
        ? { [key]: value?.[key] }
        : { ...result, [key]: value?.[key] };
    }
  });

  return result;
};
