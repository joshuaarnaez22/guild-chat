import SetupServerModal from "@/components/shared/modals/setup-server-modal";
import { userProfile, userServer } from "@/lib/profile";
import { redirect } from "next/navigation";

const SetupPage = async () => {
  const profile = await userProfile();
  const server = await userServer(profile.id);

  if (server) {
    redirect(`servers/${server.id}`);
  }

  return (
    <div>
      <SetupServerModal />
    </div>
  );
};

export default SetupPage;
