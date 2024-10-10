import { IconMail, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="px-20 w-full mt-20 h-[400px] bg-slate-100">
        <div className="container mx-auto px-32 pt-10 w-full flex">
          <div className="footer-info w-1/4 mr-6">
            <div className="w-full grid gap-3">
              <div>
                <h1 className="text-4xl font-bold text-green-800">
                  Share2Receive
                </h1>
              </div>
              <div className="infor-section flex flex-row">
                <div className="icon h-full">
                  <IconMapPin size={24} />
                </div>
                <div className="infor-content pl-2 text-lg">
                  15 Đường số 6, phường 15, quận Gò Vấp, Tp.HCM
                </div>
              </div>
              <div className="infor-section flex flex-row">
                <div className="icon h-full">
                  <IconMapPin size={24} />
                </div>
                <div className="infor-content pl-2 text-lg font-bold italic">
                  Kho xử lý - 234/6 Tô Ngọc Vân, P. Linh Đông, Thủ Đức, Tp HCM
                </div>
              </div>
              <div className="infor-section flex flex-row">
                <div className="icon h-full">
                  <IconMail size={24} />
                </div>
                <div className="infor-content pl-2 text-lg">
                  nguyenleminhxuan@gmil.com
                </div>
              </div>
            </div>
          </div>
          <div className="footer-about w-full flex flex-row pt-10 text-base">
            <div className="support-section w-1/4 pr-6 ">
              <div className="sp-title mb-9">
                <h3 className="text-lg font-semibold">Hỗ trợ khách hàng</h3>
              </div>
              <ul className="sp-content font-normal text-lg grid gap-2">
                <li className="sp-item">Hướng dẫn mua hàng Online</li>
                <li className="sp-item">Hình thức thanh toán</li>
                <li className="sp-item">Điều kiện cho tặng</li>
                <li className="sp-item">Quy trình xử lý quần áo</li>
              </ul>
            </div>
            <div className="support-section w-1/4 pr-6 ">
              <div className="sp-title mb-9">
                <h3 className="text-lg font-semibold">Công ty</h3>
              </div>
              <ul className="sp-content font-normal text-lg grid gap-2">
                <li className="sp-item">Về chúng tôi</li>
                <li className="sp-item">Điều khoản</li>
                <li className="sp-item">Chính sách bảo mật</li>
                <li className="sp-item">Trách nhiệm cộng đồng</li>
              </ul>
            </div>
            <div className="support-section w-1/4 pr-6 ">
              <div className="sp-title mb-9">
                <h3 className="text-lg font-semibold">
                  Câu chuyện đẹp cùng Share2Receive
                </h3>
              </div>
              <ul className="sp-content font-normal text-lg grid gap-2">
                <li className="sp-item">Túi ID</li>
                <li className="sp-item">Sứ mệnh</li>
                <li className="sp-item">Phong cách của bạn</li>
              </ul>
            </div>
            <div className="support-section w-1/4 pr-6 ">
              <div className="sp-title mb-9">
                <h3 className="text-lg font-semibold">Kết nối với chúng tôi</h3>
              </div>
              <ul className="sp-content font-normal text-lg grid grid-cols-4 gap-4">
                <li className="sp-item">
                  <Image
                    src="/images/facebook-footer.png"
                    alt="facebook"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </li>
                <li className="sp-item">
                  <Image
                    src="/images/instagram-footer.png"
                    alt="instagram"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </li>
                <li className="sp-item">
                  <Image
                    src="/images/tiktok-footer.png"
                    alt="tiktok"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </li>
                <li className="sp-item">
                  <Image
                    src="/images/youtube-footer.png"
                    alt="youtube"
                    width={40}
                    height={40}
                    loading="lazy"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
