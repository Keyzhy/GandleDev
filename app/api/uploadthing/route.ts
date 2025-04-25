import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Export routes for Next App Routerddd
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
