import HeaderManualSection from '@/components/terms/userManual'

interface StepProps {
  title: string
  descriptions: { text: string; image?: string }[]
}
export default function UserManual() {
  const steps: StepProps[] = [
    {
      title: '1. Đăng ký tài khoản',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang chủ của Share2Receive' },
        { text: 'Bước 2: Chọn vào chữ Đăng nhập/đăng ký' },
        { text: 'Bước 3: Chọn vào đăng ký ngay trên form' },
        { text: 'Bước 4: Nhập Họ, Tên, Email, Mật khẩu', image: '/images/term/image001.png' },
      ],
    },
    {
      title: '2. Đăng nhập tài khoản',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang chủ của Share2Receive' },
        { text: 'Bước 2: Chọn vào chữ Đăng nhập/đăng ký' },
        { text: 'Bước 3: Chọn đăng nhập với Google', image: '/images/term/image003.png' },
      ],
    },
    {
      title: '3.	Đăng nhập qua google',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang khách hàng' },
        { text: 'Bước 2: Chọn vào chữ Đăng nhập/đăng ký' },
        { text: 'Bước 3: Chọn đăng nhập với Google' },
        {
          text: 'Bước 4: Tiếp nhập các thông tin đăng nhập và xác thực theo google yêu cầu',
          image: '/images/term/image005.png',
        },
        { text: 'Bước 5 : Sau khi hoàn thành đăng hệ thống sẽ trở về trang chủ' },
      ],
    },
    {
      title: '4.	Khảo sát',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang khách hàng' },
        { text: 'Bước 2: Chọn vào chữ Đăng nhập/đăng ký' },
        { text: 'Bước 3: Đăng ký hoặc đăng nhập (lần đầu tiên)' },
        {
          text: 'Bước 4: Chọn các thông tin trên form, có một vài trường cho phép chọn nhiều',
          image: '/images/term/image007.png',
        },
        {
          text: 'Bước 5 : Sau khi khảo sát xong chọn hoàn thành, hệ thống sẽ tính toán và gợi ý các sản phẩm ở trang chủ.',
          image: '/images/term/image009.png',
        },
      ],
    },
    {
      title: '5.	Cập nhật thông tin tài  khoản',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang khách hàng' },
        { text: 'Bước 2: Chọn vào chữ Đăng nhập/đăng ký' },
        { text: 'Bước 3: Nhấp vào ảnh đại diện ở bên phải', image: '/images/term/image011.png' },
        { text: 'Bước 4: Chọn Thông tin tài khoản' },
        {
          text: 'Bước 5: Cập nhật các trường thông tin có trên form ngoại trừ các form đang khóa Họ,Tên, số điện thoại, địa chỉ, ngày sinh, giới tính, tải ảnh đại diện,….',
          image: '/images/term/image013.png',
        },
      ],
    },
    {
      title: '6.	Cập nhật thông tin thanh toán',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang khách hàng' },
        { text: 'Bước 2: Chọn vào chữ Đăng nhập/đăng ký' },
        { text: 'Bước 3: Nhấp vào ảnh đại diện ở bên phải' },
        { text: 'Bước 4: Chọn Thông tin tài khoản' },
        {
          text: 'Bước 5: Chọn Thông tin thanh toán',
          image: '/images/term/image017.png',
        },
        { text: 'Bước 6: Chọn Cập nhật hông tin ngân hàng' },
        {
          text: 'Bước 7: Nhập các thông tin và Đồng ý ( chỉ cần nhập số tài khoản và ngân hàng hệ thống sẽ tra cứu và nhập thông tin)',
        },
      ],
    },
    {
      title: '7.	Trang chủ',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang khách hàng' },
        {
          text: 'Bước 2: Tìm vào chọn nút Trang chủ, hệ thống sẽ chuyển đến trang chủ, người dùng có thể xem gợi ý sản phẩm, xem thời trang cho nữ/nam, xem theo danh mục,…..',
          image: '/images/term/image022.png',
        },
      ],
    },
    {
      title: '8.	Xem sản phẩm',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang khách hàng' },
        {
          text: 'Bước 2: Bấm chọn Cửa hàng',
          image: '/images/term/image022.png',
        },
        {
          text: 'Bước 3: Xem kết quả hệ thống trả ra toàn bộ sản phẩm khi kéo xuống sản phẩm sẽ tự động hiện ra',
          image: '/images/term/image030.png',
        },
      ],
    },
    {
      title: '9.	Lọc sản phẩm',
      descriptions: [
        { text: 'Bước 1: Tại trang Cửa hàng' },
        {
          text: 'Bước 2: Có thể tùy chọn lọc bên trái theo: Danh mục, thương hiệu, kích thước, màu sắc, vật liệu, giá bán, tình trạng, theo loại, phong cách.',
          image: '/images/term/image028.png',
        },
        {
          text: 'Bước 3: Chọn tiêu chí bằng cách nhấn vào ô cần lọc.',
          image: '/images/term/image030.png',
        },
      ],
    },
    {
      title: '10.	Tìm kiếm sản phẩm',
      descriptions: [
        { text: 'Bước 1: Truy cập trang chủ hoặc trang cửa hàng' },
        {
          text: 'Bước 2: Nhập tên sản phẩm cần tìm vào ô tìm kiếm',
          image: '/images/term/image033.png',
        },
        {
          text: 'Bước 3: Nhấn phím enter hệ thống sẽ tính toán trả ra các sản phẩm liên quan bao gồm các sản phẩm đồng nghĩa.',
        },
      ],
    },
    {
      title: '11.	Xem chi tiết sản phẩm',
      descriptions: [
        { text: 'Bước 1: Truy cập trang Cửa hàng' },
        {
          text: 'Bước 2: Bấm vào sản phẩm cần xem chi tiết',
        },
        {
          text: 'Bước 3: Hệ thống sẽ tải giao diện chi tiết sản phẩm. Ở đây có thể khiếu nại sản phẩm này, xem đánh giá, các thông tin của sản phẩm.',
          image: '/images/term/image035.png',
        },
      ],
    },
    {
      title: '12.	Tạo yêu cầu trao đổi',
      descriptions: [
        { text: 'Bước 1: Truy cập trang Cửa hàng' },
        {
          text: 'Bước 2: Tìm và chọn một sản phẩm có tag trao đổi',
        },
        {
          text: 'Bước 3: Chọn Màu sắc, kích cỡ, số lượng.',
          image: '/images/term/image037.png',
        },
        {
          text: 'Bước 4: Bấm nút Trao đổi ngay',
        },
        {
          text: 'Bước 5: Chọn sản phẩm cần trao đổi và nhấn Tiếp tục',
          image: '/images/term/image039.png',
        },
        {
          text: 'Bước 6: Chọn Màu sắc, kích cỡ, số lượng và nhấn tiếp tục',
          image: '/images/term/image041.png',
        },
        {
          text: 'Bước 7: Ghi chú cho yêu cầu trao đổi và nhấn Tạo trao đổi',
          image: '/images/term/image043.png',
        },
      ],
    },
    {
      title: '13.	Cập nhật trạng thái trao đổi',
      descriptions: [
        {
          text: 'Bước 1: Vào thông tin tài khoản',
        },
        {
          text: 'Bước 2: Chọn Quản lý trao đổi để xem các Danh sách yêu cầu trao đổi',
          image: '/images/term/image045.png',
        },
        {
          text: 'Bước 3: Chọn vào nút Xem chi tiết ở phải mỗi yêu cầu',
          image: '/images/term/image048.png',
        },
        { text: 'Bước 4: Cập nhật trạng thái trao đổi', image: '/images/term/image051.png' },
      ],
    },
    {
      title: '14.	Thêm sản phẩm vào giỏ hàng',
      descriptions: [
        {
          text: 'Bước 1: Truy cập vào trang cửa hàng',
        },
        {
          text: 'Bước 2: Đăng nhập vào trang',
        },
        {
          text: 'Bước 3: Tìm và xem chi tiết sản phẩm cần thêm vào giỏ',
        },
        {
          text: 'Bước 4: Chọn số màu sắc, số lượng, rồi thêm sản phẩm vào giỏ.',
          image: '/images/term/image035.png',
        },
      ],
    },
    {
      title: '15.	Đặt hàng qua giỏ hàng',
      descriptions: [
        {
          text: 'Bước 1: Truy cập vào trang Cửa hàng',
        },
        {
          text: 'Bước 2: Đăng nhập vào trang',
        },
        {
          text: 'Bước 3: Tìm và chọn biểu tượng giỏ hàng',
          image: '/images/term/image057.png',
        },
        {
          text: 'Bước 4: Nhấn nút Tiến hành thanh toán và bạn sẽ được chuyển đến trang thanh toán',
          image: '/images/term/image060.png',
        },
        {
          text: '',
          image: '/images/term/image062.png',
        },
      ],
    },
    {
      title: '16.	Chỉnh sửa thông tin đặt hàng',
      descriptions: [
        {
          text: 'Bước 1: Từ bước đã đặt hàng ngay, tiến hành thanh toán ở giỏ hàng hoặc vào Đơn hàng của tôi và tiếp tục.',
        },
        {
          text: 'Bước 2: Chỉnh sửa thông tin từ sản phẩm đã thêm, địa chỉ nhận hàng, phương thức vận chuyển, ghi chú, phương thức thanh toán.',
          image: '/images/term/image067.png',
        },
        {
          text: '',
          image: '/images/term/image069.png',
        },
      ],
    },
    {
      title: '17.	Thanh toán qua cổng thanh toán điện tử momo',
      descriptions: [
        {
          text: 'Bước 1: Từ bước đã đặt hàng ngay, tiến hành thanh toán ở giỏ hàng hoặc vào Đơn hàng của tôi và tiếp tục',
        },
        {
          text: 'Bước 2: Chọn phương thức Cổng thanh toán momo',
        },
        {
          text: 'Bước 3: Xác nhận tiếp tục chuyển hướng',
          image: '/images/term/image071.png',
        },
        {
          text: 'Bước 4: Kiểm tra thông tin và chọn phương thức thánh toán',
          image: '/images/term/image073.png',
        },
        {
          text: 'Bước 5: Tùy chọn phương thức QR/ATM/VISA và thanh toán. Khi thành công tự động hệ thống trả về Đơn hàng của tôi',
          image: '/images/term/image075.png',
        },
      ],
    },
    {
      title: '18.	Xem dan sách đơn hàng đã mua',
      descriptions: [
        {
          text: 'Bước 1: Truy cập vào trang Cửa hàng',
        },
        {
          text: 'Bước 2: Đăng nhập vào trang',
        },
        {
          text: 'Bước 3: Nhấp vào hình đại diện và chọn Đơn hàng của tôi, tại đây người dùng có thể xem chi tiết đơn hàng hoặc tìm kiếm theo mã đơn, sắp xếp, xem theo trạng thái đơn.',
          image: '/images/term/image077.png',
        },
      ],
    },
    {
      title: '19.	Cập nhật trạng thái đơn hàng bán',
      descriptions: [
        {
          text: 'Bước 1: Truy cập vào trang Cửa hàng',
        },
        {
          text: 'Bước 2: Đăng nhập vào trang',
        },
        {
          text: 'Bước 3: Chọn vào biểu tượng túi trên thanh menu',
          image: '/images/term/image080.png',
        },
        {
          text: 'Bước 4: Chọn Đơn bán',
        },
        {
          text: 'Bước 5: Chọn vào nút Xem chi tiết ở phải mỗi đơn hàng',
          image: '/images/term/image082.png',
        },
        {
          text: 'Bước 6: Chọn trạng thái cần cập nhật và nhấn nút Cập nhật',
          image: '/images/term/image085.png',
        },
      ],
    },
    {
      title: '20.	Thêm sản phẩm',
      descriptions: [
        {
          text: 'Bước 1: Truy cập vào trang Cửa hàng',
        },
        {
          text: 'Bước 2: Đăng nhập vào trang',
        },
        {
          text: 'Bước 3: Nhấp vào hình đại diện bên phải, và chọn Quản lý sản phẩm',
        },
        {
          text: 'Bước 4: Chọn nút Thêm(lưu ý: chỉ tài khoản lượng đủ kim cương và cập nhật thông tin thì mới thêm sản phẩm được)',
          image: '/images/term/image088.png',
        },
        {
          text: 'Bước 5: Điền thông tin sản phẩm',
          image: '/images/term/image090.png',
        },
        {
          text: 'Bước 6: Thêm ảnh sản phẩm và đợi hết chữ upload khi đang load sản phẩm',
          image: '/images/term/image092.png',
        },

        {
          text: 'Bước 7: Theo dõi và chờ duyệt',
        },
      ],
    },
    {
      title: '21. Nhắn tin',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang người dùng' },
        { text: 'Bước 2: Đăng nhập' },
        { text: 'Bước 3: Chọn xem chi tiết một sản phẩm' },
        { text: 'Bước 4: Chọn liên hệ ngay', image: '/images/term/image098.png' },
        {
          text: 'Bước 5: Bắt đầu nhắn ở cửa sổ nhỏ (cho phép gửi hình ảnh)',
          image: '/images/term/image100.png',
        },
      ],
    },
    {
      title: '22. Khiếu nại sản phẩm',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang người dùng' },
        { text: 'Bước 2: Đăng nhập' },
        { text: 'Bước 3: Vào trang Cửa hàng trên thanh menu' },
        { text: 'Bước 4: Chọn một sản phẩm và xem chi tiết' },
        { text: 'Bước 5: Nhấp vào lá cờ ở bên phải', image: '/images/term/image103.png' },
        {
          text: 'Bước 6: Nhập thông tin khiếu nại lý do và nội dung',
          image: '/images/term/image105.png',
        },
      ],
    },
    {
      title: '23. Nạp kim cương theo gói nạp',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang người dùng' },
        { text: 'Bước 2: Nhấp vào hình đại diện Chọn Nạp kim cương' },
        {
          text: 'Bước 3: Chọn gói kim cương cần nạp và nhấn Nạp ngay, giao diện sẽ chuyển đến trang thanh toán',
          image: '/images/term/image107.png',
        },
        { text: 'Bước 4: Khi thanh toán thành công hệ thống sẽ trở lại Trang chủ' },
      ],
    },
    {
      title: '24. Điểm danh nhận quà',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang người dùng' },
        { text: 'Bước 2: Chọn vào hộp quà có trên màn hình', image: '/images/term/image110.png' },
        { text: 'Bước 3: Chọn vào hộp quà có trên màn hình' },
        { text: 'Bước 4: Chọn ngày hiện tại và nhấn chọn điểm danh', image: '/images/term/image112.png' },
      ],
    },
    {
      title: '25. Xem thống kê',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang người dùng' },
        { text: 'Bước 2: Nhấp vào hình đại diện chọn Thông tin tài khoản' },
        { text: 'Bước 3: Chọn mục Tổng quan', image: '/images/term/image114.png' },
        {
          text: 'Bước 4: Chọn thời gian muốn xem theo ví dụ: Ngày và chọn từ 1/12/2024 – 31/12/2024',
          image: '/images/term/image117.png',
        },
        { text: '', image: '/images/term/image119.png' },
      ],
    },
    {
      title: '26. Quên mật khẩu',
      descriptions: [
        { text: 'Bước 1: Truy cập vào trang người dùng' },
        { text: 'Bước 2: Chọn Đăng nhập/Đăng ký trên thanh menu bên phải' },
        { text: 'Bước 3: Chọn quên mật khẩu' },
        { text: 'Bước 4: Điền Email để nhận OTP', image: '/images/term/image121.png' },
        { text: 'Bước 5: Nhận thông tin OTP', image: '/images/term/image123.png' },
        {
          text: 'Bước 6: Điền thông tin: Mã xác thực (OTP), Mật khẩu mới, nhập lại mật khẩu mới',
          image: '/images/term/image125.png',
        },
      ],
    },
  ]
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-5 container">
      <h1 className="text-2xl font-semibold">Hướng dẫn sử dụng</h1>
      <p className="text-lg font-semibold">
        Lưu ý : Các anh chị vui lòng dùng trình duyệt Google Chrome hoặc Safari trên điện thoại để truy cập và đăng ký
        tham gia cùng Share2Receive.
      </p>
      <HeaderManualSection steps={steps} />
    </div>
  )
}
