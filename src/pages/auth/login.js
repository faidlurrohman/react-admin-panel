import { useCallback, useEffect } from "react";
import { Form, Input, Button, Checkbox, Layout, Segmented } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "stores/actions/session";
import { setSetting } from "stores/actions/setting";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

export default function Login() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state?.feedback);
  const { modified } = useSelector((state) => state.setting);
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
    dispatch(setSetting({ isDarkMode: value === "dark" }));
  }, []);

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
        <div className="absolute p-2 top-0 right-0 w-full z-[2] flex justify-end items-center">
          <Segmented
            shape="round"
            value={modified?.isDarkMode ? "dark" : "light"}
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
              email: john@mail.com || password: changeme
            </span>
            <div className="bg-white dark:bg-quinary rounded-lg px-4 pt-4 shadow-sm m-0 w-11/12 md:m-auto lg:m-auto md:w-1/2 lg:w-1/4">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                disabled={loading}
              >
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Email tidak boleh kosong",
                    },
                  ]}
                >
                  <Input allowClear />
                </Form.Item>
                <Form.Item
                  label="Kata Sandi"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Kata Sandi tidak boleh kosong",
                    },
                  ]}
                >
                  <Input.Password allowClear />
                </Form.Item>
                <div className="flex flex-row justify-between">
                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox className="checkbox-login">
                      Pengingat Saya
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      className="min-w-30 lg:min-w-32"
                      block
                      type="primary"
                      htmlType="submit"
                    >
                      Masuk
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
