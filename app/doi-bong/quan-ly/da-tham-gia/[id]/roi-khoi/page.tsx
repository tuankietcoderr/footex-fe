import React from "react"
import ConfirmLeave from "./_components/confirm-leave"

const page = () => {
  return (
    <div>
      <div className="prose max-w-none">
        <p>
          Khi quyết định rời khỏi đội bóng, hãy lưu ý rằng điều này sẽ ảnh hưởng đến trải nghiệm của
          bạn cũng như của đội. Đây là một quy trình đơn giản, nhưng trước khi xác nhận, hãy đảm bảo
          bạn đã xem xét kỹ lưỡng về quyết định này.
        </p>
        <ol>
          <li>
            <p>
              <strong>Thông Báo Cho Đội: </strong>
              Trước hết, hãy thông báo cho đội bóng về quyết định rời khỏi. Điều này giúp họ có thời
              gian chuẩn bị và điều chỉnh thành viên mới (nếu cần).
            </p>
          </li>
          <li>
            <p>
              <strong>Kiểm Tra Các Trách Nhiệm Đã Giao: </strong>
              Nếu bạn đang giữ một số trách nhiệm hoặc vị trí quan trọng trong đội, hãy chắc chắn
              rằng đã có sự thay thế hoặc bạn đã chuyển giao trách nhiệm cho một thành viên khác.
            </p>
          </li>
          <li>
            <p>
              <strong>Lưu Trữ Dữ Liệu Cá Nhân (Nếu Có): </strong>
              Nếu bạn có dữ liệu cá nhân hoặc thông tin quan trọng trên trang web hoặc ứng dụng của
              đội bóng, hãy sao lưu hoặc thu thập những thông tin mà bạn muốn giữ lại.
            </p>
          </li>
          <li>
            <p>
              <strong>Cảnh Báo về Dữ Liệu: </strong>
              Xin lưu ý rằng một số dữ liệu cá nhân có thể được giữ lại trong hệ thống để đảm bảo
              tuân thủ pháp luật và chính sách bảo mật. Thông tin này sẽ được bảo mật và duy trì
              theo quy định.
            </p>
          </li>
          <li>
            <p>
              <strong>Xác Nhận Quyết Định: </strong>
              Trước khi hoàn tất quá trình rời khỏi đội bóng, hãy xem xét kỹ lưỡng mọi chi tiết. Nếu
              bạn đã chuẩn bị đầy đủ và chắc chắn về quyết định, hãy xác nhận để hoàn tất quá trình.
            </p>
          </li>
        </ol>
        <p>
          Nhớ rằng, sau khi rời khỏi, bạn có thể không thể truy cập các tính năng và thông tin riêng
          tư của đội bóng. Hãy đảm bảo rằng bạn đã đưa ra quyết định dựa trên các xem xét cẩn thận
          và chuẩn bị đầy đủ.
        </p>
      </div>
      <ConfirmLeave />
    </div>
  )
}

export default page
