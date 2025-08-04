import { agentsRouter } from "@/modules/agents/server/procedures";
import { createTRPCRouter } from "../init";
import { meetingRouter } from "@/modules/meetings/server/procedures";
import { premiumRouter } from "@/modules/premium/server/procedures";

export const appRouter = createTRPCRouter({
  agents: agentsRouter,
  meetings: meetingRouter,
  premium: premiumRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
