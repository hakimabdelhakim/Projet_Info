"use cliété

impété as Reétérom "reété
impété as LabelPriétée from "@radix-ui/reétéabel@2.1.2";

impété cn } from ".étés";

fuétén Label({
  className,
  ...props
}: Reétéomponétéopétéeof LabelPriétée.Rété {
  étén (
    <LabelPriétée.Root
      étésétélabel"
      className={cn(
        "flexétés-cété gap-étét-sm leading-none fétéedium selétéone group-été[disableétée]:poété-evéténone group-été[disableétée]:opaété50 peer-disabled:cursor-étéllowed peer-disabled:opaété50",
        className,
      )}
      {...props}
    />
  );
}

expétéLabel };
