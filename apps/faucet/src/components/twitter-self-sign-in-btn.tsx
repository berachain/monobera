import { Button } from "@bera/ui/button";
import { signIn, useSession } from "next-auth/react";

export default function TwitterSelfSignInButton() {
  const { data } = useSession();
  const token = data?.access_token;
  const expires = data?.expires_at;
  const signedIn = token && expires && expires > Date.now() / 1000;
  const name = data?.name;
  return (
    <Button onClick={() => signIn('twitter')} className="w-full" disabled={signedIn}>
      🐻 {signedIn ? name : "Sign in"}
    </Button>
  );
}
