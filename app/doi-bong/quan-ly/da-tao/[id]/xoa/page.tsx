import React, { Fragment } from "react"
import ConfirmDelete from "./_components/confirm-delete"
import { ParamsProps } from "@/utils/params"

const page = async ({params: {id}} : ParamsProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="prose max-w-none">
        <p>
          Trước khi bạn xác nhận việc xóa đội bóng, hãy chắc chắn rằng bạn đã xem xét mọi chi tiết
          cẩn thận. Hành động này sẽ xóa tất cả thông tin liên quan đến đội bóng, bao gồm thành
          viên, trận đấu và dữ liệu khác.
        </p>
        <p>
          Xin lưu ý rằng sau khi xóa, không thể khôi phục lại dữ liệu đã mất. Để đảm bảo an toàn cho
          dữ liệu của bạn, chúng tôi sẽ giữ lại dữ liệu đã xóa trong vòng <strong>30 ngày</strong>.
          Trong khoảng thời gian này, bạn có thể liên hệ với chúng tôi để khôi phục lại dữ liệu nếu
          cần.
        </p>
        <p>Nếu bạn không chắc chắn về quyết định của mình, hãy xem xét lại trước khi tiếp tục.</p>
        <p>
          Hãy đảm bảo rằng bạn đã sao lưu dữ liệu quan trọng hoặc thực hiện các biện pháp phòng ngừa
          khác trước khi tiến hành xóa. Chúng tôi đề xuất kiểm tra kỹ lưỡng để đảm bảo rằng việc xóa
          đội bóng là quyết định chính xác và có ý nghĩa cho bạn.
        </p>
        <p>
          Nếu bạn chắc chắn về quyết định của mình, vui lòng xác nhận xóa bằng cách thực thi hành
          động bên dưới. Cảm ơn bạn đã chú ý và thận trọng trong quá trình sử dụng dịch vụ của chúng
          tôi.
        </p>
      </div>
      <ConfirmDelete teamId={id}/>
    </div>
  )
}

export default page
