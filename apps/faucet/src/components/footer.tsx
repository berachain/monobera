export function Footer() {
  return (
    <div className="fixed bottom-0 flex w-screen flex-col justify-between border-t border-border px-12 py-4 sm:flex-row">
      <p className="text-xs leading-5 text-secondary-foreground">
        &copy; {new Date().getFullYear()} Berachain | All rights reserved
      </p>
      <p className="text-xs">Made W/❤️ at the 🐻Beraden</p>
    </div>
  );
}
