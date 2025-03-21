import React from "react";
import { Layout, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

export default function Loader() {
  const { t } = useTranslation();

  return (
    <Layout className="flex items-center justify-center text-center w-full fixed top-0 bottom-0 left-0 z-[100000]-z-[100000] transition-all ease-in-out delay-200 duration-500">
      <div className="w-[200px] h-[100px] inline-flex flex-col justify-around">
        <Spin
          size="large"
          className="text-primary"
          indicator={<LoadingOutlined spin />}
        />
        <div className="w-[200px] h-[20px] uppercase text-center font-semibold text-xs tracking-wider text-primary">
          {t("common:_text.loader")}
        </div>
      </div>
    </Layout>
  );
}
