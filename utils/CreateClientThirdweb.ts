import { createThirdwebClient } from "thirdweb";
export const client = createThirdwebClient({
  clientId:
    process.env.THIRDWEB_CLIENT_ID || "588feb37b2549d9a323531c793d9956a",
});
