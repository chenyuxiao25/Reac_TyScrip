import React from "react"
import { CurrentUser } from "../interfaces/user.interface"
interface AvatarProps {

user ?:CurrentUser,
}
// const Avatar = ({user}:AvatarProps) => {
const Avatar:React.FC<AvatarProps> = ({user}) => {
  return (
      <div>Avatar
          
{user?.hoTen}

    </div>
  )
}

export default Avatar