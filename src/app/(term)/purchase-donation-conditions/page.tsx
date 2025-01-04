export default function PurchaseDonationConditions() {
  return (
    <div className="flex flex-1 flex-col items-start justify-center gap-5 container">
      <h1 className="text-2xl font-semibold">Điều khoản góp đồ thời trang</h1>
      <p className="text-lg font-semibold">1. Đối tượng áp dụng:</p>
      <p className="text-lg whitespace-pre-wrap">{`- Tất cả người dùng đã đăng ký tài khoản trên nền tảng Share2Receive.
- Đồ thời trang được góp phải thuộc quyền sở hữu hợp pháp của người gửi.`}</p>
      <p className="text-lg font-semibold">2. Điều kiện đồ thời trang được góp:</p>
      <p className="text-lg whitespace-pre-wrap">{`- Đồ thời trang phải sạch sẽ, không rách, và còn sử dụng được.
- Không chấp nhận đồ bị mốc, có mùi hôi, hoặc bị hư hỏng nặng.
- Phải mô tả đúng tình trạng món đồ (kích thước, màu sắc, mức độ mới, và khuyết điểm nếu có).`}</p>
      <p className="text-lg font-semibold">3. Quy trình góp đồ:</p>
      <p className="text-lg whitespace-pre-wrap">
        {`- Người gửi đăng nhập tài khoản và thực hiện đăng ký góp đồ trên nền tảng.
- Điền đầy đủ thông tin món đồ, bao gồm hình ảnh, mô tả, và lựa chọn hình thức giao nhận.
- Gửi đồ qua các đơn vị vận chuyển hoặc mang trực tiếp đến điểm nhận do nền tảng chỉ định.`}
      </p>
      <p className="text-lg font-semibold">4. Phí và giao nhận đồ:</p>
      <p className="text-lg whitespace-pre-wrap">
        {`- Nền tảng không thu phí góp đồ.
- Người gửi tự thanh toán phí vận chuyển (nếu có).
- Nền tảng chỉ hỗ trợ tính phí ship, không cung cấp dịch vụ vận chuyển.`}
      </p>
      <p className="text-lg font-semibold">5. Quyền và trách nhiệm của người góp đồ</p>
      <p className="text-lg whitespace-pre-wrap">
        {`- Đảm bảo đồ thời trang hợp pháp và đáp ứng các điều kiện nêu trên.
- Không được gửi đồ vi phạm pháp luật hoặc quy định của nền tảng.
- Chịu trách nhiệm về tính chính xác của thông tin món đồ.`}
      </p>
      <p className="text-lg font-semibold">6. Quyền và trách nhiệm của nền tảng</p>
      <p className="text-lg whitespace-pre-wrap">
        {`- Có quyền từ chối nhận món đồ không đạt tiêu chuẩn.
- Đảm bảo minh bạch trong việc phân phối hoặc tái sử dụng món đồ đã góp.
- Không chịu trách nhiệm với các tranh chấp liên quan đến món đồ giữa người gửi và người nhận.`}
      </p>
      <p className="text-lg font-semibold">7. Cam kết và miễn trừ trách nhiệm</p>
      <p className="text-lg whitespace-pre-wrap">
        {`- Người gửi đồng ý rằng đồ thời trang sau khi được chấp nhận sẽ thuộc quyền sở hữu của nền tảng hoặc đối tác thụ hưởng.
- Nền tảng không chịu trách nhiệm về việc hoàn trả món đồ sau khi đã nhận.`}
      </p>
    </div>
  )
}
