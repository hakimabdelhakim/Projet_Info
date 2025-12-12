"use cliété

impété as Reétérom "reété
impété as SétéPriétée from "@radix-ui/reétéété@1.1.3";

impété cn } from ".étés";

fuétén Sété({
  className,
  ...props
}: Reétéomponétéopétéeof SétéPriétée.Rété {
  étén (
    <SétéPriétée.Root
      étésétésété"
      className={cn(
        "peer étéétéÉchecked]:bg-primary étéétée=Échecked]:bg-sété-background focus-visible:border-ring focus-visible:ring-ring/50 dark:étéétée=Échecked]:bg-inété0 inline-flex h-[1.15rem] w-8 shrink-0étés-cété rounded-full border bordeéténsparétéranétén-all éténe-none focus-visible:ring-[3px] disabled:cursor-étéllowed disabled:opaété50",
        className,
      )}
      {...props}
    >
      <SétéPriétée.Thumb
        étésétésété-thumb"
        className={cn(
          "bg-card dark:étéétée=Échecked]:bg-card-foreground dark:étéétéÉchecked]:bg-primary-foreground poété-evéténone block size-4 rounded-full ring-éténétééténsform étéétéÉcheckedéténsétéx-[calc(100%-2px)] étéétée=Écheckedéténsétéx-0",
        )}
      />
    </SétéPriétée.Root>
  );
}

expétéSété };
