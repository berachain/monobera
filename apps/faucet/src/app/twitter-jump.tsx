export default function TwitterJump() {
  const url = "https://artio.faucet.berachain.com/";
  const text =
    "Twitter+for+%23bearchain%0AGet+Dripped+@berachain%20%0A%0A";
  const link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;

  return (
    <a
      href={link}
      target="_blank"
      className="flex h-8 w-fit items-center gap-1 rounded-2xl border border-border bg-muted px-2 text-base font-normal leading-normal text-secondary-foreground hover:cursor-pointer hover:text-foreground"
    >
      tweet
    </a>
  );
}
