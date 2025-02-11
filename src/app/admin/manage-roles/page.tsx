import { RolesTable } from "../../../components/admin/ui/RolesTable";

import { getAllRoles } from "@/actions/admin/get-roles";
import { submitAlert } from "@/utils/alerts";
const tableColumns = ["Id", "Role name", "Actions"];

export default async function ManageRolesPage() {
  const res = await getAllRoles();

  if (!res.ok || !res.roles) {
    submitAlert(res.message, "error");

    return (
      <div className="text-red-600 text-2xl w-full text-center mt-10">
        {res.message}
      </div>
    );
  }

  const { roles } = res;

  return (
    <div className="flex flex-col w-full mt-10 px-5">
      <RolesTable columns={tableColumns} roles={roles} />
    </div>
  );
}
