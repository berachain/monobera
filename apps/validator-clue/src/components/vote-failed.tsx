import { Button } from "@bera/ui/button";

export default function VoteFailed({ reset }: { reset: () => void }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.72 4H32.28L44 15.72V32.28L32.28 44H15.72L4 32.28V15.72L15.72 4Z"
          stroke="#DC2626"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30 18L18 30"
          stroke="#DC2626"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18 18L30 30"
          stroke="#DC2626"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <div className="font-retro-gaming text-center text-lg leading-6">
        Could not Vote
      </div>
      <div className="font-retro-gaming text-center text-xs leading-6">
        Looks like something went wrong. Please try again.
      </div>
      <Button className="w-full" onClick={reset}>
        Retry
      </Button>
    </div>
  );
}
