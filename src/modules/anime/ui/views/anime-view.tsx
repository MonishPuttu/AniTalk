import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const AnimeViewLoading = () => {
  return (
    <LoadingState
      title="Loading characters"
      description="This may take a few seconds..."
    />
  );
};

export const AnimeViewError = () => {
  return (
    <ErrorState
      title="Error loading content"
      description="Something went wrong"
    />
  );
};
