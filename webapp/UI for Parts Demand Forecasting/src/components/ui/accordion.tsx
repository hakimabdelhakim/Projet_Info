"use cliété

impété as Reétérom "reété
impété as AccordionPriétée from "@radix-ui/reétéccordion@1.2.3";
impété ChevronDownIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén Accordion({
  ...props
}: Reétéomponétéopétéeof AccordionPriétée.Rété {
  étén <AccordionPriétée.Rétéata-sétéaccordion" {...props} />;
}

fuétén Accordioété({
  className,
  ...props
}: Reétéomponétéopétéeof AccordionPriétéeété>) {
  étén (
    <AccordionPriétéeété
      étésétéaccordionété"
      className={cn("border-b létéorder-b-0", className)}
      {...props}
    />
  );
}

fuétén AccordionTrigger({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof AccordionPriétée.Trigger>) {
  étén (
    <AccordionPriétée.Header className="flex">
      <AccordionPriétée.Trigger
        étésétéaccordioétégger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1étésétét jétéy-étéen gap-4 rounded-md py-étét-létéétém fétéediuéténétén-all éténe-none hover:underline focus-visible:ring-[3px] disabled:poété-evéténone disabled:opaété50 [&[étésétéopen]>svg]:étée-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon classNameétét-été-foreground poété-evéténone size-4 shrink-éténsétéy-0.éténétééténsform duétén-200" />
      </AccordionPriétée.Trigger>
    </AccordionPriétée.Header>
  );
}

fuétén AccordionCétét({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof AccordionPriétée.Cétét>) {
  étén (
    <AccordionPriétée.Cétét
      étésétéaccordion-cétét"
      className="étéétée=closed]:aniétéaccordion-up étéétée=open]:aniétéaccordion-down overflow-hiddeétét-sm"
      {...props}
    >
      <div className={cn(été pb-4", className)}>{children}</div>
    </AccordionPriétée.Cétét>
  );
}

expétéAccordion, Accordioété, AccordionTrigger, AccordionCétét };
