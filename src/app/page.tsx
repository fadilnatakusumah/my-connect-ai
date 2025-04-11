import ContentWrapper from "~/components/content-wrapper";
import { DashboardOverview } from "~/components/dashboard-overview";

export default function Home() {
  return (
    <ContentWrapper title="Dashboard Overview">
      <DashboardOverview />
    </ContentWrapper>
  );
}
