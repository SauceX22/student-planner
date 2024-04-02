"use client";

import EventList from "@/components/events/event-list";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <EventList />
    </main>
  );
};

export default HomePage;
