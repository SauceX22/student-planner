"use client";

import HoverCardList from "@/components/events/hover-card-list";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      {/* <EventList /> */}
      <HoverCardList />
    </main>
  );
};

export default HomePage;
