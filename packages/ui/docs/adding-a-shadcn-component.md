# Adding a shadcn/ui component

## 1. Create a new component in `src` folder

```tsx
"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "./utils/cn";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
```

If the primitives are missing from `package.json`, find the right package and add it to `package.json`:

```json
{
  "dependencies": {
    "@radix-ui/react-switch": "^1.0.2"
  }
}
```

## 2. Add the component to `tsup.config.ts`

Depending on if the component is a `client` or `server` component, add it to the right `tsup.config.ts`:

```ts
const client = [
  ... existing components
  "./src/switch.tsx",
];

const server = [
  ... existing components
];
```

## 3. Install packages and run `pnpm dev` again, should build and you should be able to import it as expected
