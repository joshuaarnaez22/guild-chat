import { serverExist } from "@/actions/server";
import { redirect } from "next/navigation";

const InviteCodePage = async ({
  params,
}: {
  params: { inviteCode: string };
}) => {
  if (!params.inviteCode) {
    return redirect("/");
  }

  await serverExist(params.inviteCode);

  return null;
};

export default InviteCodePage;
