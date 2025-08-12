import { auth } from "@/lib/auth";
import { AnimeSelect } from "@/modules/anime/components/anime-select";

import { Conversation } from "@/modules/anime/components/conversation";
import {
  AnimeViewError,
  AnimeViewLoading,
} from "@/modules/anime/ui/views/anime-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <Suspense fallback={<AnimeViewLoading />}>
      <ErrorBoundary fallback={<AnimeViewError />}>
        {/* <Conversation /> */}
        <AnimeSelect />
      </ErrorBoundary>
    </Suspense>
  );
};

export default Page;
