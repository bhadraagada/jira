import { redirect } from "next/navigation";

import { getCurrent } from "@/features/auth/actions";
import { SignUpCard } from "@/features/auth/components/SignUpCard";

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
