import { useCallback, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Layout,
  Segmented,
  Dropdown,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "stores/actions/session";
import { setSetting } from "stores/actions/setting";
import {
  MoonOutlined,
  SunOutlined,
  TranslationOutlined,
} from "@ant-design/icons";
import { LANGUAGES } from "constants";
import { upper } from "utils";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.feedback);
  const { theme, size, lang } = useSelector((state) => state.setting);
  const [form] = Form.useForm();

  const handleSubmit = (params) => {
    dispatch(login(params));

    if (params?.remember) {
      localStorage.setItem("sk-e", params?.email || "");
      localStorage.setItem("sk-p", params?.password || "");
      localStorage.setItem("sk-c", params?.remember || false);
    } else {
      localStorage.setItem("sk-e", "");
      localStorage.setItem("sk-p", "");
      localStorage.setItem("sk-c", false);
    }
  };

  const _toggleTheme = useCallback((value) => {
    dispatch(setSetting({ theme: value }));
  }, []);

  const _handleLanguage = useCallback(
    (value) => {
      if (value?.key !== lang?.key) {
        dispatch(
          setSetting({
            lang: { key: value?.key, locale: value?.locale },
          })
        );
        Cookies.set(import.meta.env.VITE_APP_COOKIE_LANGUAGE, value?.key);
        i18n.changeLanguage(value?.key);
      }
    },
    [lang]
  );

  useEffect(() => {
    const remember = localStorage.getItem("sk-c");

    if (remember && remember === "true") {
      form.setFieldsValue({
        email: localStorage.getItem("sk-e"),
        password: localStorage.getItem("sk-p"),
        remember: true,
      });
    }
  }, []);

  return (
    <Layout className="flex flex-col">
      <div className="relative z-[1] overflow-hidden w-full h-screen">
        <div className="absolute gap-2 p-2 top-0 right-0 w-full z-[2] flex justify-end items-center">
          <Dropdown
            menu={{
              items: LANGUAGES.map((item) => ({
                ...item,
                onClick: () => _handleLanguage(item),
              })),
              selectable: true,
              defaultSelectedKeys: [lang?.key ?? "id"],
            }}
            trigger={["click"]}
          >
            <Button shape="round" icon={<TranslationOutlined />}>
              {upper(lang?.key)}
            </Button>
          </Dropdown>
          <Segmented
            shape="round"
            value={theme}
            size={size}
            options={[
              { value: "light", icon: <SunOutlined /> },
              { value: "dark", icon: <MoonOutlined /> },
            ]}
            onChange={_toggleTheme}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-[1] flex justify-center items-center">
          <div className="flex flex-col items-center w-screen">
            <h1 className="text-primary font-bold text-xl pb-4 tracking-wider animate-bounce text-center">
              {import.meta.env.VITE_APP_NAME}
            </h1>
            <span className="text-xs pb-4 text-error">
              email: john@mail.com || pass: changeme
            </span>
            <div className="bg-white dark:bg-quinary rounded-lg px-4 pt-4 shadow-sm m-0 w-11/12 md:m-auto lg:m-auto md:w-1/2 lg:w-1/4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={loading}
              >
                <Form.Item
                  label={t("common:_label.email")}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "common:Form.defaultValidateMessages.required"
                      ),
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  label={t("common:_label.password")}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: t(
                        "common:Form.defaultValidateMessages.required"
                      ),
                    },
                  ]}
                >
                  <Input.Password allowClear />
                </Form.Item>
                <div className="flex flex-row justify-between">
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="checkbox-login">
                      {t("common:_checkbox.remember")}
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="min-w-30 lg:min-w-32"
                      block
                      type="primary"
                      htmlType="submit"
                    >
                      {t("common:_button.login")}
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
