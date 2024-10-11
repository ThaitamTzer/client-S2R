"use client";

import { Input, Form, Button, Select } from "antd";
import { UpdateProfile } from "@/types/users/userTypes";
import { useAuth } from "@/hooks/useAuth";
import moment from "moment";
import userService from "@/services/users/user.service";
import toast from "react-hot-toast";
import MyDatePicker from "@/components/DatePicker";

const ProfilePage = () => {
  const { user, setLoading, loading, getProfile } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

  const [form] = Form.useForm();

  const onFinish = (values: UpdateProfile) => {
    setLoading(true);
    try {
      userService
        .updateProfile(values)
        .then((res) => {
          getProfile();
          setLoading(false);
          toast.success("Cập nhật thông tin thành công!");
          if (res) {
            form.setFieldsValue({
              firstname: res.firstname,
              lastname: res.lastname,
              phone: res.phone,
              address: res.address,
              email: res.email,
              description: res.description,
              dateOfBirth: moment(res.dateOfBirth),
            });
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Cập nhật thông tin thất bại!");
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container px-10 my-20 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Thông tin tài khoản</h2>
        </div>
        <div className="profile-desc container mx-auto px-1 mt-5">
          <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
            <div className="form p-8">
              <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                initialValues={{
                  firstname: user?.firstname || "",
                  lastname: user?.lastname || "",
                  phone: user?.phone || "",
                  address: user?.address || "",
                  email: user?.email || "",
                  gender: user?.gender || "none",
                  description: user?.description || "",
                  dateOfBirth: user?.dateOfBirth
                    ? moment(user.dateOfBirth)
                    : new Date(),
                }}
              >
                <div className="w-full flex gap-3">
                  <Form.Item
                    className="w-full"
                    label="Họ"
                    name="firstname"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập họ!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    className="w-full"
                    label="Tên"
                    name="lastname"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập email!",
                      },
                    ]}
                  >
                    <Input placeholder="Nhập vào tên" />
                  </Form.Item>
                </div>
                <Form.Item
                  className="w-full"
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <Input disabled />
                </Form.Item>
                <div className="w-full flex gap-3">
                  <Form.Item
                    className="w-full"
                    label="Số điện thoại"
                    name="phone"
                  >
                    <Input placeholder="Số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    label="Ngày sinh"
                    name="dateOfBirth"
                    className="w-full"
                  >
                    <MyDatePicker
                      className="w-full"
                      placeholder="Chọn ngày sinh"
                    />
                  </Form.Item>
                </div>
                <Form.Item label="Giới tính" name="gender" className="w-1/2">
                  <Select
                    defaultValue="none"
                    className="w-full"
                    options={[
                      {
                        value: "none",
                        label: "Chọn giới tính",
                        disabled: true,
                      },
                      { value: "male", label: "Nam" },
                      { value: "female", label: "Nữ" },
                      { value: "other", label: "Khác" },
                    ]}
                  />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                  <Input placeholder="Địa chỉ" />
                </Form.Item>
                <Form.Item label="Mô tả" name="description">
                  <Input.TextArea placeholder="Mô tả" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Cập nhật
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
