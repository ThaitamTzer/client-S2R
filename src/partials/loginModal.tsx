"use client";
import { Modal, Input } from "@mantine/core";
import { useLoginModal } from "@/zustand/loginModal";
import Image from "next/image";
import Link from "next/link";

const LoginModal = () => {
  const { isOpen, closeModal } = useLoginModal();

  return (
    <Modal.Root opened={isOpen} onClose={closeModal} centered size="lg">
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header className="py-0">
          <Modal.Title></Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Header className="w-full block">
          <Modal.Title>
            <div className="text-3xl w-full font-semibold text-green-900 flex flex-col justify-center items-center">
              <Image
                src={"/images/lock.svg"}
                alt="Lock"
                width={80}
                height={80}
                loading="lazy"
              />
              <h1 className="uppercase">Tham gia cùng Share2Recive</h1>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col justify-center items-center">
            <div className="login-with-google">
              <Link href="/login">
                <button className="w-fit bg-white border px-6 py-4 rounded-md flex items-center justify-center">
                  <Image
                    src={"/images/gmail-icon.png"}
                    alt="Google"
                    width={30}
                    height={30}
                    loading="lazy"
                  />
                  <span className="ml-3">Đăng nhập với Google</span>
                </button>
              </Link>
            </div>
            <div className="flex items-center mt-2 w-1/2">
              <div className="border-t border border-gray-400 flex-grow"></div>
              <div className="px-3 text-gray-800 font-bold">Hoặc</div>
              <div className="border-t border border-gray-400 flex-grow"></div>
            </div>
            <p>Đăng nhập với email</p>
            <div className="login-with-email container px-32 mb-8">
              <form autoComplete="off">
                <div className="grid gap-4">
                  <Input.Wrapper label="Email">
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Mật khẩu">
                    <Input
                      id="password"
                      type="password"
                      placeholder="Mật khẩu"
                      required
                    />
                  </Input.Wrapper>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="bg-green-500 text-white font-semibold px-4 py-2 rounded-md">
                    Đăng nhập
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default LoginModal;
