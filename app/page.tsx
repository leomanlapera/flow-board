import { DashboardLayout } from "@/components/dashboard-layout";
import { BoardView } from "@/components/board-view";

export default function HomePage() {
  return (
    <DashboardLayout>
      <BoardView />
    </DashboardLayout>
  );
}
