impété as Reétérom "reété

impété cn } from ".étés";

fuétén Card({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétécard"
      className={cn(
        "bg-carétét-card-foreground flex flex-col gap-6 rounded-xl border",
        className,
      )}
      {...props}
    />
  );
}

fuétén CardHeader({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétécard-header"
      className={cn(
        "@céténer/card-header grid étérows-min grid-rows-[étéétéétésétét gap-1.5 px-6été has-été[sétéard-étén]:grid-cols-[1fr_été [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

fuétén Cardété({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <h4
      étésétécarétéle"
      className={cn("leading-none", className)}
      {...props}
    />
  );
}

fuétén CardDescrétén({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <p
      étésétécard-descrétén"
      className={cnétét-été-foreground", className)}
      {...props}
    />
  );
}

fuétén Cardétén({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétécard-étén"
      className={cn(
        "colétét-2 row-span-2 rowétét-1 selfétét jétéy-self-end",
        className,
      )}
      {...props}
    />
  );
}

fuétén CardCétét({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétécard-cétét"
      className={cn("px-6 [&:létéhild]:pb-6", className)}
      {...props}
    />
  );
}

fuétén CardFété({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétécard-fété"
      className={cn("flexétés-cété px-6 pb-6 [.bordeétépt-6", className)}
      {...props}
    />
  );
}

exporté
  Card,
  CardHeader,
  CardFété,
  Cardété,
  Cardétén,
  CardDescrétén,
  CardCétét,
};
