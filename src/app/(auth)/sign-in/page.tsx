import { redirect } from "next/navigation";

import { SignInCard } from "@/features/auth/components/SignInCard";
import { getCurrent } from "@/features/auth/queries";

const SignIn = async () => {
  const user = await getCurrent();

  if (user) redirect("/");
  return (
    <div>
      <SignInCard />
    </div>
  );
};

export default SignIn;
