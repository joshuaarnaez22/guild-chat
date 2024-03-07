import InitialModal from "@/components/shared/modals/initial-modal";
import { userProfile } from "@/lib/profile";
import { userServer } from "@/lib/server";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await userProfile();
  const server = await userServer(profile.id);

  if (server) {
    redirect(`servers/${server.id}`);
  }

  return (
    <div>
      <InitialModal />
    </div>
  );
};

export default SetupPage;
