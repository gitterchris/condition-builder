"use client";

import ConditionBuilder from "@/components/pages/condition-builder";
import { DataContextProvider } from "@/components/hooks/data/use-data";
import { QueryContextProvider } from "@/components/hooks/query/use-query";

export default function Home() {
  return (
    <main>
      <DataContextProvider>
        <QueryContextProvider>
          <ConditionBuilder />
        </QueryContextProvider>
      </DataContextProvider>
    </main>
  );
}
