import { getObjectRates } from "@/actions/rate-action"
import { Separator } from "@/components/ui/separator"
import IRate, { ERate } from "@/interface/IRate"
import RatingItem from "./rating-item"
import RatingBox from "./rating-box"

type Props = {
  objectType: ERate
  objectId: string
}

const Rating = async ({ objectType, objectId }: Props) => {
  const { data, success, code, message } = await getObjectRates(objectType, objectId)
  if (!success) {
    return (
      <div>
        {code} + {message}
      </div>
    )
  }
  const rates = data ?? ([] as IRate[])
  return (
    <div>
      <div className="rounded-md border border-border p-4 shadow-sm">
        <h4 className="font-semibold">Đánh giá</h4>
        <Separator />
        <RatingBox objectId={objectId} objectType={objectType} />
        {rates.length > 0 ? (
          <div className="mt-2 flex flex-col space-y-2">
            {rates.map((rate) => (
              <RatingItem {...rate} key={rate?._id} />
            ))}
          </div>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">Không có đánh giá nào</p>
        )}
      </div>
    </div>
  )
}

export default Rating
