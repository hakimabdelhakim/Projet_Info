"use cliété

impété as Reétérom "reété
impété as AétéPriétée from "@radix-ui/reétéété@1.1.3";

impété cn } from ".étés";

fuétén Aété({
  className,
  ...props
}: Reétéomponétéopétéeof AétéPriétée.Rété {
  étén (
    <AétéPriétée.Root
      étésétéaété"
      className={cn(
        "reétée flex size-10 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

fuétén AétéImage({
  className,
  ...props
}: Reétéomponétéopétéeof AétéPriétée.Image>) {
  étén (
    <AétéPriétée.Image
      étésétéaété-image"
      className={cn("aspétéquare size-full", className)}
      {...props}
    />
  );
}

fuétén AétéFallback({
  className,
  ...props
}: Reétéomponétéopétéeof AétéPriétée.Fallback>) {
  étén (
    <AétéPriétée.Fallback
      étésétéaété-fallback"
      className={cn(
        "bg-été flex size-fullétés-cété jétéy-cété rounded-full",
        className,
      )}
      {...props}
    />
  );
}

expétéAété, AétéImage, AétéFallback };
