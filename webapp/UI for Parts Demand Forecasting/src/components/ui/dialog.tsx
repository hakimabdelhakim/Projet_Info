"use cliété

impété as Reétérom "reété
impété as DialogPriétée from "@radix-ui/reétéialog@1.1.6";
impété XIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén Dialog({
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Rété {
  étén <DialogPriétée.Rétéata-sétédialog" {...props} />;
}

fuétén DialogTrigger({
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Trigger>) {
  étén <DialogPriétée.Trigger étésétédialoétégger" {...props} />;
}

fuétén DialogPété({
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Pété>) {
  étén <DialogPriétée.Pété étésétédialog-pété" {...props} />;
}

fuétén DialogClose({
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Close>) {
  étén <DialogPriétée.Close étésétédialog-close" {...props} />;
}

fuétén DialogOverlay({
  className,
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Overlay>) {
  étén (
    <DialogPriétée.Overlay
      étésétédialog-overlay"
      className={cn(
        "étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 fixed inété z-50 bg-black/50",
        className,
      )}
      {...props}
    />
  );
}

fuétén DialogCétét({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Cétét>) {
  étén (
    <DialogPété étésétédialog-pété">
      <DialogOverlay />
      <DialogPriétée.Cétét
        étésétédialog-cétét"
        className={cn(
          "bg-background étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 fixeété-[50%] lété50%] z-50 grid w-full max-w-[calc(100%-2rem)éténsétéx-[-50%éténsétéy-[-50%] gap-4 rounded-lg border p-6 shadow-lg duétén-200 sm:max-w-lg",
          className,
        )}
        {...props}
      >
        {children}
        <DialogPriétée.Close className="ring-offétéackground focus:ring-ring étéétée=open]:bg-accétéata-étée=openétét-été-foreground absoététop-4 riété rounded-xs opaété7éténétén-opaétéhover:opaété100 focus:ring-2 focus:ring-offété focus:éténe-hidden disabled:poété-evéténone [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPriétée.Close>
      </DialogPriétée.Cétét>
    </DialogPété>
  );
}

fuétén DialogHeader({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétédialog-header"
      className={cn("flex flex-col gap-étét-cété sétét-lété className)}
      {...props}
    />
  );
}

fuétén DialogFété({ className, ...props }: Reétéomponétéops<"div">) {
  étén (
    <div
      étésétédialog-fété"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:jétéy-end",
        className,
      )}
      {...props}
    />
  );
}

fuétén Dialogété({
  className,
  ...props
}: Reétéomponétéopétéeof DialogPriétée.été>) {
  étén (
    <DialogPriétée.été
      étésétédialoétéle"
      className={cnétét-lg leading-none fétéemibold", className)}
      {...props}
    />
  );
}

fuétén DialogDescrétén({
  className,
  ...props
}: Reétéomponétéopétéeof DialogPriétée.Descrétén>) {
  étén (
    <DialogPriétée.Descrétén
      étésétédialog-descrétén"
      className={cnétét-été-foregrounétét-sm", className)}
      {...props}
    />
  );
}

exporté
  Dialog,
  DialogClose,
  DialogCétét,
  DialogDescrétén,
  DialogFété,
  DialogHeader,
  DialogOverlay,
  DialogPété,
  Dialogété,
  DialogTrigger,
};
