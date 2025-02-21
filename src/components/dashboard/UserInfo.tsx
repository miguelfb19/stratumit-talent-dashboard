"use client";

import clsx from "clsx";
import { User } from "next-auth";

interface Props {
  user: User;
  isAdmin?: boolean;
}

export const UserInfo = ({ user, isAdmin = false }: Props) => {
  return (
    <div
      className="grid grid-rows-[auto_1fr] items-start w-10/12 h-4/6 rounded-xl p-10 gap-14 bg-white shadow-2xl shadow-black"
      id="container"
    >
      <h1
        className={clsx("w-full text-4xl font-bold text-blue-700 text-center", {
          "text-blue-900": isAdmin,
        })}
      >
        {isAdmin ? "Admin information" : "User information"}
      </h1>
      <section
        className="flex flex-col md:grid md:grid-cols-2 h-full md:justify-items-center max-md:gap-4"
        id="principal-information"
      >
        <div className="flex flex-col items-start gap-4" id="col-1">
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
            {user.birthDate}
          </span>
        </div>
        <div className="flex flex-col items-start gap-4" id="col-2">
          <span>
            <b>Last Name: </b>
            {user.lastName}
          </span>
          <span>
            <b>Phone Number: </b>
            {user.profile?.phoneNumber
              ? user.profile.phoneNumber
              : "Not number"}
          </span>
          <span>
            <b>Timezone: </b>
            {user.profile?.timezone ? user.profile.timezone : "Not info"}
          </span>
        </div>
      </section>
    </div>
  );
};
