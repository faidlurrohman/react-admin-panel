import { IMAGE } from "./images";
import id_ID from "antd/lib/locale/id_ID";
import en_GB from "antd/lib/locale/en_GB";

export const LANGUAGES = [
  {
    key: "en",
    label: (
      <div className="flex gap-1 justify-center items-center">
        <img src={IMAGE.EN} alt="EN" className="w-5" />
        <span className="flex flex-1">EN</span>
      </div>
    ),
    locale: en_GB,
  },
  {
    key: "id",
    label: (
      <div className="flex gap-1 justify-center items-center">
        <img src={IMAGE.ID} alt="ID" className="w-5" />
        <span className="flex flex-1">ID</span>
      </div>
    ),
    locale: id_ID,
  },
];
