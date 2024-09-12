export const FormError = ({
  children: error,
}: { children: string | boolean | undefined }) => {
  if (!error) return null;

  return (
    <div className="text-sm text-destructive-foreground leading-tight">
      {error}
    </div>
  );
};
