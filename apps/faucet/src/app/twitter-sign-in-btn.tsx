import React from "react";
import { Button } from "@bera/ui/button";
import { createClient } from "@supabase/supabase-js";

const TwitterSignInButton = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function signInWithTwitter() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <div>
      <Button onClick={signInWithTwitter} className="w-full">
        Sign in with twitter
      </Button>
    </div>
  );
};

export default TwitterSignInButton;
