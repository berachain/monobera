export const FormError = ({
  children: error,
}: { children: string | null | undefined }) => {
  if (!error) return null;

  return (
    <div className="text-sm text-destructive-foreground font-semibold capitalize leading-tight">
      {error}
    </div>
  );
};
