"use client";
import { Form, Button, Input } from "antd";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface formData {
  code: string;
  newPassword: string;
}

const ResetPage = () => {
  const [form] = Form.useForm();
  const { resetPassword, setLoading, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("resetPasswordAllowed");
    if (token) {
      Cookies.remove("resetPasswordAllowed");
    }
  }, []);

  const onFinish = (values: formData) => {
    const { code, newPassword } = values;
    setLoading(true);
    try {
      resetPassword({ code, newPassword })
        .then(() => {
          setLoading(false);
          router.push("/login");
        })
        .catch(() => {
          setLoading(false);
          form.setFields([
            {
              name: "code",
              errors: ["Code không tồn tại hoặc đã hết hạn"],
            },
          ]);
        });
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="bg-cover bg-no-repeat w-full h-screen"
        style={{
          backgroundImage: "url(/images/forest-bg.jpg)",
        }}
      >
        <div className="container mx-auto px-40 w-full h-auto flex justify-center relative top-[15%]">
          <div className="w-full max-w-[590px] p-5 backdrop-blur-sm bg-white/50 shadow-xl rounded-md">
            <div className="login-form-title text-white">
              <h1 className="text-5xl pt-2 font-semibold text-white text-center ">
                Khôi phục mật khẩu
              </h1>
            </div>
            <div className="login-form-content mt-5">
              <div className="w-[70%] mx-auto">
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="code"
                    label="Mã xác thực"
                    rules={[
                      {
                        required: true,
                        message: "Mã xác thực không được để trống",
                      },
                      {
                        min: 6,
                        message: "Mã xác thực phải có 6 ký tự",
                      },
                      {
                        max: 6,
                        message: "Mã xác thực chỉ có tối đa 6 ký tự",
                      },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập vào mã xác thực" />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="Mật khẩu mới"
                    rules={[
                      {
                        required: true,
                        message: "Mật khẩu mới không được để trống",
                      },
                      {
                        min: 6,
                        message: "Mật khẩu phải có ít nhất 6 ký tự",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Nhập vào mật khẩu mới"
                    />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Nhập lại mật khẩu mới"
                    dependencies={["newPassword"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Nhập lại mật khẩu không được để trống",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject("Mật khẩu không khớp");
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Nhập vào xác nhận mật khẩu mới"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full"
                      size="large"
                      loading={loading}
                    >
                      Thay đổi mật khẩu
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPage;
