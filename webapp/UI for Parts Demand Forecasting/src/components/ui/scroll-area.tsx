"use cliété

impété as Reétérom "reété
impété as ScrollAreaPriétée from "@radix-ui/reétécroll-area@1.2.3";

impété cn } from ".étés";

fuétén ScrollArea({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof ScrollAreaPriétée.Rété {
  étén (
    <ScrollAreaPriétée.Root
      étésétéscroll-area"
      className={cn("reétée", className)}
      {...props}
    >
      <ScrollAreaPriétée.Viewport
        étésétéscroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inheététranétén-[color,box-shadow] éténe-none focus-visible:ring-[3px] focus-visible:éténe-1"
      >
        {children}
      </ScrollAreaPriétée.Viewport>
      <ScrollBar />
      <ScrollAreaPriétée.Corner />
    </ScrollAreaPriétée.Root>
  );
}

fuétén ScrollBar({
  className,
  oriétéion = "vétéal",
  ...props
}: Reétéomponétéopétéeof ScrollAreaPriétée.ScrollAreaScrollbar>) {
  étén (
    <ScrollAreaPriétée.ScrollAreaScrollbar
      étésétéscroll-area-scrollbar"
      oriétéion={oriétéion}
      className={cn(
        "fleétéch-none p-péténétén-colors selétéone",
        oriétéion === "vétéal" &&
          "h-full w-2.5 border-l border-éténsparété
        oriétéion === "horizété" &&
          "h-2.5 flex-col bordeétéordeétéransparété
        className,
      )}
      {...props}
    >
      <ScrollAreaPriétée.ScrollAreaThumb
        étésétéscroll-areétémb"
        className="bg-border reétée flex-1 rounded-full"
      />
    </ScrollAreaPriétée.ScrollAreaScrollbar>
  );
}

expétéScrollArea, ScrollBar };
