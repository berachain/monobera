export default function Rules() {
  return (
    <div className="flex h-full flex-col gap-2 overflow-y-auto rounded-sm bg-muted p-4">
      <div className="text-forground flex items-center gap-1 text-lg leading-7">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 17V19C10 19.5304 9.78929 20.0391 9.41421 20.4142C9.03914 20.7893 8.53043 21 8 21C7.46957 21 6.96086 20.7893 6.58579 20.4142C6.21071 20.0391 6 19.5304 6 19V5C6 4.46957 5.78929 3.96086 5.41421 3.58579C5.03914 3.21071 4.53043 3 4 3C3.46957 3 2.96086 3.21071 2.58579 3.58579C2.21071 3.96086 2 4.46957 2 5V8H5"
            stroke="#713F12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 17V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H8"
            stroke="#713F12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19 17V5C19 4.46957 18.7893 3.96086 18.4142 3.58579C18.0391 3.21071 17.5304 3 17 3H4"
            stroke="#713F12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 17H10"
            stroke="#713F12"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="font-retro-gaming">
          Official Rules for: The Validator&apos;s Clue
        </div>
      </div>

      <div>
        <div className="text-sm font-extrabold leading-6">
          1/5 Validator&apos;s Veil:
        </div>
        <div className="text-xs leading-4">
          Each player, henceforth known as a &quot;Validator&quot;, is secretly
          assigned a Liquidity Pool, referred to as their &quot;Mystery
          Pool&quot;. This information is as confidential as your
          grandmother&apos;s secret cookie recipe – guard it with your life!
        </div>
      </div>

      <div>
        <div className="text-sm font-extrabold leading-6">
          2/5 Secret Stuffing:
        </div>
        <div className="text-xs leading-4">
          Each Validator, must strategically accumulate BGT in their Mystery
          Pool, without revealing to the other Validators which one is assigned
          to them.
        </div>
      </div>

      <div>
        <div className="text-sm font-extrabold leading-6">
          3/5 Anyone&apos;s Allegation:
        </div>
        <div className="text-xs leading-4">
          Every Epoch, each validator has the option to cast a vote of
          accusation of which pool an opposing validator is connected to.
        </div>
      </div>

      <div>
        <div className="text-sm font-extrabold leading-6">
          4/5 Revealing Reward & Risk:
        </div>
        <div className="text-xs leading-4">
          At the end of the Epoch, under the glow of moonlight, each validator’s
          vote will unfold its results to them. They were right, and have
          eliminated the other, capturing all the spoils. Or… they were wrong…
          ending their game…
        </div>
      </div>

      <div>
        <div className="text-sm font-extrabold leading-6">
          5/5 Death’s Decision:
        </div>
        <div className="text-xs leading-4">
          All games must come to an end, and in this case, that end either comes
          from the death of all but one surviving validator, or after a
          fortnight, with the spoils going to the validator hoarding the
          greatest BGT supply.
        </div>
      </div>
    </div>
  );
}
