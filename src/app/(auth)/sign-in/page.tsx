import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { SignInCard } from "@/features/auth/components/SignInCard";

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
