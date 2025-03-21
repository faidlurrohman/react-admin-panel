import React, { useEffect } from "react";
import { ConfigProvider, message, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "utils";
import { setInit, setConfirm, setToast } from "stores/actions/feedback";
import { Loader } from "components";
import { useTranslation } from "react-i18next";
// routers
import Routers from "routers";

export default function App() {
  const { t } = useTranslation();
  const [messageAntd, contextMessage] = message.useMessage();
  const [modalAntd, contextModal] = Modal.useModal();
  const dispatch = useDispatch();
  const { init, toast, confirm } = useSelector((state) => state?.feedback);
  const {
    direction,
    primary_color,
    theme: myTheme,
    size,
    radius,
    lang,
  } = useSelector((state) => state?.setting);

  // init
  useEffect(() => {
    if (init) {
      setTimeout(() => dispatch(setInit(false)), 1500);
    }
  }, [init]);

  // toast
  useEffect(() => {
    if (toast) {
      messageAntd[toast?.severity ?? "success"]({
        content: toast?.message ?? "Missing message",
      }).then(() => dispatch(setToast(null)));
    }
  }, [toast]);

  // confirm
  useEffect(() => {
    if (confirm) {
      modalAntd[confirm?.type ?? "confirm"]({
        title: confirm?.title ?? "Missing Title",
        content: confirm?.content ?? "Missing Content",
        okText: confirm?.okText ?? t("common:_confirm.ok"),
        cancelText: confirm?.cancelText ?? t("common:_confirm.cancel"),
        centered: true,
        onOk() {
          confirm?.onOk();
          dispatch(setConfirm(null));
        },
        onClose() {
          dispatch(setConfirm(null));
        },
      });
    }
  }, [confirm]);

  // settings - css color
  useEffect(() => {
    if (primary_color) {
      document.documentElement.style.setProperty(
        "--color-primary",
        primary_color
      );
    }
  }, [primary_color]);

  // settings - dark mode
  useEffect(() => {
    if (myTheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [myTheme]);

  return (
    <ConfigProvider
      theme={theme(
        getComputedStyle(document.documentElement, null),
        radius,
        myTheme
      )}
      locale={lang?.locale}
      direction={direction}
      componentSize={size}
    >
      {init ? (
        <Loader />
      ) : (
        <>
          {contextMessage}
          {contextModal}
          <Routers />
        </>
      )}
    </ConfigProvider>
  );
}
