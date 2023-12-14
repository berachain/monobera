export default function GlobalConsole() {
  const valName = "THJValidator";
  return (
    <div className="flex w-full flex-col rounded-sm bg-foreground text-white xl:max-w-[278px] h-[284px] xl:h-[687px]">
      <div className="flex flex-col-reverse gap-2 overflow-hidden p-2 text-xs overflow-y-auto">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value, index) => (
          <div key={index}>
            <span className="text-sky-300">HH:MM:SS [GLOBAL]</span>{value} Welcome
            to the First Validator Cluedo. Use the toggle buttons in your
            Console to vote and check results after each epoch. Read the Game
            Rules
          </div>
        ))}
      </div>
      <div className="w-full rounded-b-sm bg-secondary-foreground px-3 py-2 font-bold leading-7 text-secondary text-sm">
        ~/ValClue/{valName}
      </div>
    </div>
  );
}
