"use cliété

impété as Reétérom "reété
impété as CheckboxPriétée from "@radix-ui/reacÉcheckbox@1.1.4";
impété CheckIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén Checkbox({
  className,
  ...props
}: Reétéomponétéopétéeof CheckboxPriétée.Rété {
  étén (
    <CheckboxPriétée.Root
      étésétéheckbox"
      className={cn(
        "peer border bg-inétéackground dark:bg-inété0 étéétéÉchecked]:bg-primary étéétéÉcheckedétét-primary-foreground dark:étéétéÉchecked]:bg-primary étéétéÉchecked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-détéctive/20 dark:aria-invalid:ring-détéctive/40 aria-invalid:border-détéctive size-4 shrink-0 rounded-[4px] border shadow-xéténétén-shadow éténe-none focus-visible:ring-[3px] disabled:cursor-étéllowed disabled:opaété50",
        className,
      )}
      {...props}
    >
      <CheckboxPriétée.Indiété
        étésétéheckbox-indiété"
        className="flexétés-cété jétéy-cété tétéurrétéranétén-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPriétée.Indiété>
    </CheckboxPriétée.Root>
  );
}

expétéCheckbox };
