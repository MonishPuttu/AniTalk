import { auth } from "@/lib/auth";
import { AnimeConversation } from "@/modules/anime/components/anime-conversation";
import {
  AnimeViewError,
  AnimeViewLoading,
} from "@/modules/anime/ui/views/anime-view";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
  params: Promise<{ characterId: string }>;
}

const Page = async ({ params }: Props) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  const { characterId } = await params;

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Suspense fallback={<AnimeViewLoading />}>
        <ErrorBoundary fallback={<AnimeViewError />}>
          <AnimeConversation characterId={characterId} />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default Page;
