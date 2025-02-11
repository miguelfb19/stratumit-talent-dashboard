import { UsersTable } from "../../../components/admin/ui/UsersTable";

import { getUsersFromDb } from "@/actions/admin/get-users";
import { submitAlert } from "@/utils/alerts";

const tableColumns = [
  "Name",
  "Email",
  "Roles",
  "Country",
  "Birth date",
  "Is verified",
  "Actions",
];

export default async function ManageUsersPage() {
  const res = await getUsersFromDb();

  if (!res.ok || !res.users) {
    submitAlert(res.message, "error");

    return (
      <div className="text-red-600 text-2xl w-full text-center mt-10">
        {res.message}
      </div>
    );
  }

  const { users } = res;

  return (
    <div className="flex flex-col w-full mt-10 px-5 overflow-scroll">
      <UsersTable columns={tableColumns} users={users} />
    </div>
  );
}
