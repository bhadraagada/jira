import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./dotted-sep";
import { Navigation } from "./Navigation";
import Projects from "./Projects";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export const SideBar = () => {
  return (
    <aside className="w-full h-full bg-neutral-100 p-4">
      <Link href={"/"}>
        <Image src={"/logo.svg"} alt="logo" height={75} width={75} />
      </Link>
      <DottedSeparator className="my-4" />
      <WorkspaceSwitcher />
      <DottedSeparator className="my-4" />
      <Navigation />
      <DottedSeparator className="my-4" />
      <Projects />
    </aside>
  );
};
