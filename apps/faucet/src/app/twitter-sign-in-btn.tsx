import React, { useEffect, useState } from "react";
import { Button } from "@bera/ui/button";
import { createClient } from "@supabase/supabase-js";

const TwitterSignInButton = ({
  setTwitterAccessToken,
}: {
  setTwitterAccessToken: (token: string) => void;
}) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const [signedIn, setSignedIn] = useState(false);

  async function signInWithTwitter() {
    const { data, error } = await supabase.auth
      .signInWithOAuth({
        provider: "twitter",
      })
      .then((data) => {
        if (data) {
          setSignedIn(true);
        }
      })
      .catch((error) => {
        console.error("error,", error);
      });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }
  async function getSession() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setTwitterAccessToken(session.access_token);
      setSignedIn(true);
    }
  }
  useEffect(() => {
    getSession();
  }, []);

  return (
    <div className="flex flex-row gap-4">
      {signedIn ? (
        <div>
          <Button onClick={signOut} className="w-full">
            Sign out
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
