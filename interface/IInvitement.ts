import ITeam from "./ITeam"
import IGuest from "./IGuest"

export enum EInvitementStatus {
  PENDING = "pending",
  APPROVED = "approved",
  DECLINED = "declined",
}

export default interface IInvitement {
  _id?: string
  from?: string | IGuest
  to?: string | IGuest
  status?: EInvitementStatus
  team?: string | ITeam
  isJoinRequest?: boolean
  createdAt?: string
}
