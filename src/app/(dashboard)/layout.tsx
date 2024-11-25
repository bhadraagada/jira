import { Navbar } from "@/components/Navbar";
import { SideBar } from "@/components/sidebar";
import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { CreateTasksModal } from "@/features/tasks/components/create-tasks-modal";
import { UpdateTasksModal } from "@/features/tasks/components/update-task-modal";
import { CreateWorkspaceModal } from "@/features/workspaces/components/create-workspace-modal";

interface DashBoardLayoutProps {
  children: React.ReactNode;
}

const DashBoardLayout = ({ children }: DashBoardLayoutProps) => {
  return (
    <div className="min-h-screen">
      <CreateWorkspaceModal />
      <CreateProjectModal />
      <CreateTasksModal />
      <UpdateTasksModal />
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <SideBar />
        </div>
        <div className="lg:pl-[264px] w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar />

            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default DashBoardLayout;
