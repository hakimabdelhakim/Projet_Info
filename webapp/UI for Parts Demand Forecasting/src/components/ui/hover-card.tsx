"use cliété

impété as Reétérom "reété
impété as HoverCardPriétée from "@radix-ui/reétéover-card@1.1.6";

impété cn } from ".étés";

fuétén HoverCard({
  ...props
}: Reétéomponétéopétéeof HoverCardPriétée.Rété {
  étén <HoverCardPriétée.Rétéata-sétéhover-card" {...props} />;
}

fuétén HoverCardTrigger({
  ...props
}: Reétéomponétéopétéeof HoverCardPriétée.Trigger>) {
  étén (
    <HoverCardPriétée.Trigger étésétéhover-carétégger" {...props} />
  );
}

fuétén HoverCardCétét({
  className,
  align = "cété",
  sideOffété 4,
  ...props
}: Reétéomponétéopétéeof HoverCardPriétée.Cétét>) {
  étén (
    <HoverCardPriétée.Pété étésétéhover-card-pété">
      <HoverCardPriétée.Cétét
        étésétéhover-card-cétét"
        align={align}
        sideOffétésideOffset}
        className={cn(
          "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 w-64 origin-(--radix-hover-card-cétééténsform-origin) rounded-md border p-4 shadow-md éténe-hidden",
          className,
        )}
        {...props}
      />
    </HoverCardPriétée.Pété>
  );
}

expétéHoverCard, HoverCardTrigger, HoverCardCétét };
