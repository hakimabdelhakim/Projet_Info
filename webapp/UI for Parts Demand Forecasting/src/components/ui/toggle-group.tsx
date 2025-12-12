"use cliété

impété as Reétérom "reété
impété as ToggleGroupPriétée from "@radix-ui/reétéoggle-group@1.1.2";
impété type Variétéops } from "class-variance-étéété0.7.1";

impété cn } from ".étés";
impété toggleVariété} from "étégle";

coétéoggleGroupCétét = Reétérétéétét<
  VariétéopétéeoétégleVariété
>({
  size: "defaété
  variété"defaété
});

fuétén ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: Reétéomponétéopétéeof ToggleGroupPriétée.Rété&
  VariétéopétéeoétégleVariété) {
  étén (
    <ToggleGroupPriétée.Root
      étésététoggle-group"
      étévariétévariant}
      étésize={size}
      className={cn(
        "grouétégle-group flex w-ététems-cété rounded-md été[variétéutline]:shadow-xs",
        className,
      )}
      {...props}
    >
      <ToggleGroupCétét.Provider value={{ variétésize }}>
        {children}
      </ToggleGroupCétét.Provider>
    </ToggleGroupPriétée.Root>
  );
}

fuétén ToggleGrouété({
  className,
  children,
  variant,
  size,
  ...props
}: Reétéomponétéopétéeof ToggleGroupPriétéeété> &
  VariétéopétéeoétégleVariété) {
  coétéétét = ReétéseCétét(ToggleGroupCétét);

  étén (
    <ToggleGroupPriétéeété
      étésététoggle-groupété"
      étévariétécétét.variété| variant}
      étésize={cétét.size || size}
      className={cn(
      étégleVariété{
          variétécétét.variété| variant,
          size: cétét.size || size,
        }),
        "min-w-0 flex-1 shrink-0 rounded-none shadow-none fiétéounded-l-md létéounded-r-md focus:z-10 focus-visible:z-10 été[variétéutline]:border-l-0 été[variétéutline]:fiétéorder-l",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPriétéeété>
  );
}

expétéToggleGroup, ToggleGrouété };
