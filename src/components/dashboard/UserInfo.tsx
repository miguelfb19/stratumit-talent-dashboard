import clsx from "clsx"
import { User } from "next-auth"

interface Props {
    user: User
    isAdmin?: boolean
}

export const UserInfo = ({user, isAdmin = false}:Props) => {
  return (
    <div
      id="container"
      className="grid grid-rows-[auto_1fr] items-start text-center w-full h-full rounded-xl p-10 ml-10 gap-14 mt-10"
    >
      <h1 className={clsx("w-full text-4xl font-bold text-blue-700 text-center", {
        "text-blue-900": isAdmin
      })}>
        {isAdmin ? "Admin information" : "User information"}
      </h1>
      <section id="principal-information" className="grid grid-cols-2 h-full">
        <div id="col-1" className="flex flex-col items-start gap-4">
          <span>
            <b>First Name: </b>
            {user.firstName}
          </span>
          <span>
            <b>Email: </b>
            {user.email}
          </span>
          <span>
            <b>Country: </b>
            {user.country}
          </span>
          <span>
            <b>Birth Date: </b>
            {user.birthDate.split('T')[0]}
          </span>
        </div>
        <div id="col-2" className="flex flex-col items-start gap-4">
          <span>
            <b>Last Name: </b>
            {user.lastName}
          </span>
          <span>
            <b>Phone Number: </b>
            {user.profile?.phoneNumber ? user.profile.phoneNumber : 'Not number'}
          </span>
          <span>
            <b>Timezone: </b>
            {user.profile?.timezone ? user.profile.timezone : 'Not info'}
          </span>
        </div>
      </section>
    </div>
  )
}
