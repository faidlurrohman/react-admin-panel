import dayjs from "dayjs";
import { DATES } from "constants";

export const format = (date, useFormat = null) => {
  if (useFormat) return dayjs(date).utc(DATES.UTC).format(useFormat);

  if (date) return dayjs(date).utc(DATES.UTC);

  return dayjs().utc(DATES.UTC);
};
