import { redirect } from "next/navigation";

import { SignUpCard } from "@/features/auth/components/SignUpCard";
import { getCurrent } from "@/features/auth/queries";

const SignUp = async () => {
  const user = await getCurrent();

  if (user) redirect("/");
  return (
    <div>
      <SignUpCard />
    </div>
  );
};

export default SignUp;
