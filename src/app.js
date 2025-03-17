import React, { useEffect } from "react";
import { ConfigProvider, message, Modal } from "antd";
import id_ID from "antd/lib/locale/id_ID";
import { useDispatch, useSelector } from "react-redux";
import { theme } from "utils";
import { setInit, setConfirm, setToast } from "stores/actions/feedback";
import { Loader } from "components";
// routers
import Routers from "routers";

export default function App() {
  const [messageAntd, contextMessage] = message.useMessage();
  const [modalAntd, contextModal] = Modal.useModal();
  const dispatch = useDispatch();
  const { init, toast, confirm } = useSelector((state) => state?.feedback);
  const { initial, modified } = useSelector((state) => state?.setting);

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
        okText: confirm?.okText ?? "Ya, lanjutkan",
        cancelText: confirm?.cancelText ?? "Tidak",
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

  useEffect(() => {
    if (modified?.primary) {
      document.documentElement.style.setProperty(
        "--color-primary",
        modified?.primary
      );
    }
    if (modified?.isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [modified]);

  return (
    <ConfigProvider
      theme={theme(
        getComputedStyle(document.documentElement, null),
        modified?.isDarkMode
      )}
      locale={id_ID}
      direction={modified?.direction ?? initial?.direction}
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
