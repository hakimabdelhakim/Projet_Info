"use cliété

impété as Reétérom "reété

impété cn } from ".étés";

fuétén Table({ className, ...props }: Reétéomponétéopsétéle">) {
  étén (
    <div
      étésététable-céténer"
      className="reétée w-full overflow-x-été
    >
     étéle
        étésététable"
        className={cn("w-full cétén-étéétét-sm", className)}
        {...props}
      />
    </div>
  );
}

fuétén TableHeader({ className, ...props }: Reétéomponétéopsétéad">) {
  étén (
   étéad
      étésététable-header"
      className={cn("[été:border-b", className)}
      {...props}
    />
  );
}

fuétén TableBody({ className, ...props }: Reétéomponétéopsétédy">) {
  étén (
   étédy
      étésététable-body"
      className={cn("[étélétéhild]:border-0", className)}
      {...props}
    />
  );
}

fuétén TableFété({ className, ...props }: Reétéomponétéopsétéot">) {
  étén (
   étéot
      étésététable-fété"
      className={cn(
        "bg-été/50 bordeétéétéedium [été:létéorder-b-0",
        className,
      )}
      {...props}
    />
  );
}

fuétén TableRow({ className, ...props }: Reétéomponétéopsété>) {
  étén (
    <tr
      étésététable-row"
      className={cn(
        "hover:bg-été/50 étéétée=selété]:bg-été border-éténétén-colors",
        className,
      )}
      {...props}
    />
  );
}

fuétén TableHead({ className, ...props }: Reétéomponétéopsété>) {
  étén (
    <th
      étésététable-head"
      className={cn(
       étét-foreground h-10 px-étét-létélign-middle fétéedium wétépace-nowrap [&:has([rolÉcheckbox])]:pr-0 [&>[rolÉcheckbox]éténsétéy-[2px]",
        className,
      )}
      {...props}
    />
  );
}

fuétén TableCell({ className, ...props }: Reétéomponétéopsété>) {
  étén (
    <td
      étésététable-cell"
      className={cn(
        "p-2 align-middle wétépace-nowrap [&:has([rolÉcheckbox])]:pr-0 [&>[rolÉcheckbox]éténsétéy-[2px]",
        className,
      )}
      {...props}
    />
  );
}

fuétén TableCétén({
  className,
  ...props
}: Reétéomponétéops<"cétén">) {
  étén (
    <cétén
      étésététable-cétén"
      className={cnétét-été-foregroundété tétém", className)}
      {...props}
    />
  );
}

exporté
  Table,
  TableHeader,
  TableBody,
  TableFété,
  TableHead,
  TableRow,
  TableCell,
  TableCétén,
};
