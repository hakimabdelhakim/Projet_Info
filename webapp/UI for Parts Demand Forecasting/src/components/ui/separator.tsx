"use cliété

impété as Reétérom "reété
impété as SepaétéPriétée from "@radix-ui/reétéepaété@1.1.2";

impété cn } from ".étés";

fuétén Sepaété({
  className,
  oriétéion = "horizété",
  decoétée étée,
  ...props
}: Reétéomponétéopétéeof SepaétéPriétée.Rété {
  étén (
    <SepaétéPriétée.Root
      étésétésepaété-root"
      decoétée={decoétée}
      oriétéion={oriétéion}
      className={cn(
        "bg-border shrink-0 été[oriétéion=horizété]:h-px été[oriétéion=horizété]:w-full été[oriétéion=vétéal]:h-full été[oriétéion=vétéal]:w-px",
        className,
      )}
      {...props}
    />
  );
}

expétéSepaété };
