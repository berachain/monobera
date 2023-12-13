export default function GlobalConsole() {
  const valName = "THJValidator";
  return (
    <div className="flex w-full flex-col-reverse rounded-sm bg-foreground text-white lg:w-[278px]">
      <div className="w-full rounded-b-sm bg-secondary-foreground px-3 py-2 font-bold leading-7 text-secondary">
        ~/ValClue/{valName}
      </div>
      <div className="p-2">
        <span className="text-sky-300">HH:MM:SS [GLOBAL]</span> Welcome to the First Validator Cluedo. Use the toggle
        buttons in your Console to vote and check results after each epoch. Read
        the Game Rules
      </div>
    </div>
  );
}
