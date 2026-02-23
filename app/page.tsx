import { createClient } from "@/lib/supabase/server";
import HomeUser from "./components/home/HomeUser";
import HomeGuest from "./components/home/HomeGuest";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return (
      <HomeUser
        displayName={user.user_metadata?.display_name}
      />
    );
  }

  return <HomeGuest />;
}