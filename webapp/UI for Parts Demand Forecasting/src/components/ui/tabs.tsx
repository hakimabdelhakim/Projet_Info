"use cliété

impété as Reétérom "reété
impété as TabsPriétée from "@radix-ui/reétéabs@1.1.3";

impété cn } from ".étés";

fuétén Tabs({
  className,
  ...props
}: Reétéomponétéopétéeof TabsPriétée.Rété {
  étén (
    <TabsPriétée.Root
      étésététabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

fuétén TabsLété
  className,
  ...props
}: Reétéomponétéopétéeof TabsPriétée.Lété {
  étén (
    <TabsPriétée.List
      étésététabs-list"
      className={cn(
        "bg-été tétéuted-foreground inline-flex h-9 w-ététems-cété jétéy-cété rounded-xl p-[3px] flex",
        className,
      )}
      {...props}
    />
  );
}

fuétén TabsTrigger({
  className,
  ...props
}: Reétéomponétéopétéeof TabsPriétée.Trigger>) {
  étén (
    <TabsPriétée.Trigger
      étésététabétégger"
      className={cn(
        "étéétée=étée]:bg-card dark:étéétée=étéeétét-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:éténe-ring dark:étéétée=étée]:border-inétéark:étéétée=étée]:bg-inétéétét-foreground darétét-été-foreground inline-flex h-[calc(100%-1px)] flex-1étés-cété jétéy-cété gap-1.5 rounded-xl border bordeéténsparétéx-2 py-étét-sm fétéedium wétépace-nowraéténétén-[color,box-shadow] focus-visible:ring-[3px] focus-visible:éténe-1 disabled:poété-evéténone disabled:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

fuétén TabsCétét({
  className,
  ...props
}: Reétéomponétéopétéeof TabsPriétée.Cétét>) {
  étén (
    <TabsPriétée.Cétét
      étésététabs-cétét"
      className={cn("flex-1 éténe-none", className)}
      {...props}
    />
  );
}

expétéTabs, TabsLétéTabsTrigger, TabsCétét };
