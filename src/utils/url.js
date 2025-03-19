export function URLParams(
  url = "",
  params = {}, // add skip property for skipping params. eg => {...params, skip: ['limit', 'order'] }
  offsetText = "offset",
  limitText = "limit",
  sortByText = "sortBy",
  orderByText = "order"
) {
  let limitOffset = "";
  let filters = [];
  let order = "";

  // limit & offset
  if (!params?.skip?.includes("limit") && params?.current && params?.pageSize) {
    let limit = params?.pageSize ?? 10;
    let offset = limit * (params?.current - 1);

    limitOffset = `${limitText}=${limit}&${offsetText}=${offset}`;
  }

  // sorter
  if (
    !params?.skip?.includes("order") &&
    params?.sorter &&
    params?.sorter?.columnKey &&
    params?.sorter?.field &&
    params?.sorter?.order &&
    ["ascend", "descend"].includes(params?.sorter?.order)
  ) {
    order = `&${sortByText}=${params?.sorter?.field}`;

    if (params?.sorter?.order === "ascend") {
      order = `${order}&${orderByText}=${params?.sorter?.order.substring(
        0,
        3
      )}`;
    } else if (params?.sorter?.order === "descend") {
      order = `${order}&${orderByText}=${params?.sorter?.order.substring(
        0,
        4
      )}`;
    }
  }

  // filters
  if (!params?.skip?.includes("filters") && params?.filters) {
    Object.keys(params?.filters).map((key) => {
      if (params?.filters?.[key]) {
        filters.push(`&${key}=${params?.filters?.[key]?.[0]}`);
      }
    });
  }

  // use url with params
  if (
    !["", undefined, null].includes(limitOffset) ||
    !["", undefined, null].includes(order) ||
    filters.length
  ) {
    return `${url}?${limitOffset}${order}${filters.join("")}`;
  }

  return url;
}
