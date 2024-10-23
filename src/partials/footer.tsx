import { IconMail, IconMapPin } from '@tabler/icons-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <div className="w-full bg-slate-100 overflow-hidden">
        <div className="container mx-auto px-16 py-10 w-full flex justify-between">
          <div className="footer-info w-1/4">
            <div className="w-full grid gap-3">
              <div>
                <h1 className="text-4xl font-bold text-green-800 -ml-4">
                  Share
                  <span
                    style={{
                      color: 'salmon',
                    }}
                  >
                    2
                  </span>
                  Receive
                </h1>
              </div>
              <div className="infor-section flex">
                <div className="icon">
                  <IconMapPin size={24} />
                </div>
                <div className="infor-content pl-2 text-lg">
                  15 Đường số 6, phường 15, quận Gò Vấp, Tp.HCM
                </div>
              </div>
              <div className="infor-section flex">
                <div className="icon">
                  <IconMail size={24} />
                </div>
                <div className="infor-content pl-2 text-lg">share2recieve.support@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="footer-about w-3/4 flex justify-between text-base">
            <div className="support-section">
              <div className="sp-title mb-6">
                <h3 className="text-lg font-semibold">Hỗ trợ khách hàng</h3>
              </div>
              <ul className="sp-content font-normal text-lg space-y-2">
                <li className="sp-item">Hướng dẫn mua hàng Online</li>
                <li className="sp-item">Hình thức thanh toán</li>
                <li className="sp-item">Điều kiện cho tặng</li>
                <li className="sp-item">Quy trình xử lý quần áo</li>
              </ul>
            </div>
            <div className="support-section">
              <div className="sp-title mb-6">
                <h3 className="text-lg font-semibold">Công ty</h3>
              </div>
              <ul className="sp-content font-normal text-lg space-y-2">
                <li className="sp-item">Về chúng tôi</li>
                <li className="sp-item">Điều khoản</li>
                <li className="sp-item">Chính sách bảo mật</li>
                <li className="sp-item">Trách nhiệm cộng đồng</li>
              </ul>
            </div>
            <div className="support-section">
              <div className="sp-title mb-6">
                <h3 className="text-lg font-semibold">Câu chuyện đẹp</h3>
              </div>
              <ul className="sp-content font-normal text-lg space-y-2">
                <li className="sp-item">Túi ID</li>
                <li className="sp-item">Sứ mệnh</li>
                <li className="sp-item">Phong cách của bạn</li>
              </ul>
            </div>
            <div className="support-section">
              <div className="sp-title mb-6">
                <h3 className="text-lg font-semibold">Kết nối với chúng tôi</h3>
              </div>
              <ul className="sp-content font-normal text-lg flex space-x-4">
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
  )
}
