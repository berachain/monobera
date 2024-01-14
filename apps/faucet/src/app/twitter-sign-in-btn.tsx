import React, { useEffect } from "react";
import { Button } from "@bera/ui/button";
import { createClient } from "@supabase/supabase-js";

const TwitterSignInButton = ({
  twitterSignedIn,
  setTwitterSignedIn,
  setTwitterAccessToken,
}: {
  twitterSignedIn: boolean;
  setTwitterSignedIn: (twitterSignedIn: boolean) => void;
  setTwitterAccessToken: (token: string) => void;
}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY ?? "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function signInWithTwitter() {
    // const { data, error } =
    await supabase.auth
      .signInWithOAuth({
        provider: "twitter",
      })
      .then((data) => {
        if (data) {
          // TODO: remove console.log
          console.log("data", data);
        }
      })
      .catch((error) => {
        console.error("error,", error);
      });
  }

  async function signOut() {
    // const { error } =
    await supabase.auth.signOut();
    setTwitterSignedIn(false);
  }
  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setTwitterAccessToken(session.access_token);
      setTwitterSignedIn(true);
    }
  }
  useEffect(() => {
    void getSession();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      {twitterSignedIn ? (
        <div>
          <Button onClick={signOut} className="w-full">
            Sign out from Twitter
          </Button>
        </div>
      ) : (
        <div>
          <Button onClick={signInWithTwitter} className="w-full">
            Sign in with Twitter
          </Button>
        </div>
      )}
    </div>
  );
};

export default TwitterSignInButton;
