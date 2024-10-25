"use client";

import { DottedSeparator } from "@/components/dotted-sep";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useJoinWorkspace } from "../api/usejoinWorksapce";
import { useInviteCode } from "../hooks/useInviteCode";
import { useWorkspaceId } from "../hooks/useWorkspaceId";

interface JoinWorkspaceFormProps {
  initialValues: {
    name: string;
  };
}

const JoinWorkspaceForm = ({ initialValues }: JoinWorkspaceFormProps) => {
  const router = useRouter();
  const workspaceId = useWorkspaceId();
  const inviteCode = useInviteCode();
  const { mutate, isPending } = useJoinWorkspace();

  const onSubmit = () => {
    mutate(
      {
        param: { workspaceId },
        json: { code: inviteCode },
      },
      {
        onSuccess: ({ data }) => {
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="p-7">
        <CardTitle className="text-2xl font-bold">Join Workspace</CardTitle>
        <CardDescription>
          You&apos;ve been invited to join{" "}
          <strong>{initialValues.name} </strong>workspace.{" "}
        </CardDescription>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
          <Button
            className="w-full lg:w-fit lg:mb-2"
            variant={"secondary"}
            type="button"
            asChild
            size={"lg"}
            disabled={isPending}
          >
            <Link href={"/"}>Cancel</Link>
          </Button>
          <Button
            className="w-full lg:w-fit "
            size={"lg"}
            variant={"primary"}
            type="button"
            disabled={isPending}
            onClick={onSubmit}
          >
            Join Workspace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JoinWorkspaceForm;
