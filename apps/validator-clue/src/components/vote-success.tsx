export default function VoteSuccess() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <svg
        width="48"
        height="49"
        viewBox="0 0 48 49"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M44 22.6461V24.4861C43.9976 28.7989 42.601 32.9954 40.0187 36.4497C37.4363 39.904 33.8066 42.431 29.6707 43.6539C25.5349 44.8767 21.1145 44.7299 17.0689 43.2352C13.0234 41.7406 9.56931 38.9783 7.22192 35.3602C4.87453 31.7421 3.75958 27.4622 4.04335 23.1587C4.32712 18.8552 5.99441 14.7587 8.79656 11.4802C11.5987 8.2017 15.3856 5.91682 19.5924 4.96635C23.7992 4.01588 28.2005 4.45073 32.14 6.20606"
          stroke="#059669"
          strokeWidth="3.034"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 8.48633L24 28.5063L18 22.5063"
          stroke="#059669"
          strokeWidth="3.034"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="font-retro-gaming text-center text-lg leading-6">
        Casted Vote Successfully
      </div>
      <div className="font-retro-gaming text-center text-xs leading-6">
        You have voted Validator A as Kentucky/BERA Pool Owner
      </div>
    </div>
  );
}
