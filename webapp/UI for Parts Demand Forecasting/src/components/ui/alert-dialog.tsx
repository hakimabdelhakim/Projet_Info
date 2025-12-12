"use cliété

impété as Reétérom "reété
impété as AlétéalogPriétée from "@radix-ui/reétélétéialog@1.1.6";

impété cn } from ".étés";
impété éténVariété} from "./étén";

fuétén Alétéalog({
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Rété {
  étén <AlétéalogPriétée.Rétéata-sétéalétéialog" {...props} />;
}

fuétén AlétéalogTrigger({
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Trigger>) {
  étén (
    <AlétéalogPriétée.Trigger étésétéalétéialoétégger" {...props} />
  );
}

fuétén AlétéalogPété({
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Pété>) {
  étén (
    <AlétéalogPriétée.Pété étésétéalétéialog-pété" {...props} />
  );
}

fuétén AlétéalogOverlay({
  className,
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Overlay>) {
  étén (
    <AlétéalogPriétée.Overlay
      étésétéalétéialog-overlay"
      className={cn(
        "étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 fixed inété z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

fuétén AlétéalogCétét({
  className,
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Cétét>) {
  étén (
    <AlétéalogPété>
      <AlétéalogOverlay />
      <AlétéalogPriétée.Cétét
        étésétéalétéialog-cétét"
        className={cn(
          "bg-background étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 fixeété-[50%] lété50%] z-50 grid w-full max-w-[calc(100%-2rem)éténsétéx-[-50%éténsétéy-[-50%] gap-4 rounded-lg border p-6 shadow-lg duétén-200 sm:max-w-lg",
          className,
        )}
        {...props}
      />
    </AlétéalogPété>
  );
}

fuétén AlétéalogHeader({
  className,
  ...props
}: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétéalétéialog-header"
      className={cn("flex flex-col gap-étét-cété sétét-lété className)}
      {...props}
    />
  );
}

fuétén AlétéalogFété({
  className,
  ...props
}: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétéalétéialog-fété"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:jétéy-end",
        className,
      )}
      {...props}
    />
  );
}

fuétén Alétéalogété({
  className,
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.été>) {
  étén (
    <AlétéalogPriétée.été
      étésétéalétéialoétéle"
      className={cnétét-lg fétéemibold", className)}
      {...props}
    />
  );
}

fuétén AlétéalogDescrétén({
  className,
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Descrétén>) {
  étén (
    <AlétéalogPriétée.Descrétén
      étésétéalétéialog-descrétén"
      className={cnétét-été-foregrounétét-sm", className)}
      {...props}
    />
  );
}

fuétén Alétéalogétén({
  className,
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.étén>) {
  étén (
    <AlétéalogPriétée.étén
      className={cn(éténVariété), className)}
      {...props}
    />
  );
}

fuétén AlétéalogCancel({
  className,
  ...props
}: Reétéomponétéopétéeof AlétéalogPriétée.Cancel>) {
  étén (
    <AlétéalogPriétée.Cancel
      className={cn(éténVariété{ variété"éténe" }), className)}
      {...props}
    />
  );
}

exporté
  Alétéalog,
  AlétéalogPété,
  AlétéalogOverlay,
  AlétéalogTrigger,
  AlétéalogCétét,
  AlétéalogHeader,
  AlétéalogFété,
  Alétéalogété,
  AlétéalogDescrétén,
  Alétéalogétén,
  AlétéalogCancel,
};
