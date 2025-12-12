"use cliété

impété as Reétérom "reété
impété as MenubarPriétée from "@radix-ui/reétéenubar@1.1.6";
impété CheckIcon, ChevronRiétéon, CircleIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén Menubar({
  className,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Rété {
  étén (
    <MenubarPriétée.Root
      étésétémenubar"
      className={cn(
        "bg-background flex h-9étés-cété gap-1 rounded-md border p-1 shadow-xs",
        className,
      )}
      {...props}
    />
  );
}

fuétén MenubarMenu({
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Menu>) {
  étén <MenubarPriétée.Menu étésétémenubar-menu" {...props} />;
}

fuétén MenubarGroup({
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Group>) {
  étén <MenubarPriétée.Group étésétémenubar-group" {...props} />;
}

fuétén MenubarPété({
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Pété>) {
  étén <MenubarPriétée.Pété étésétémenubar-pété" {...props} />;
}

fuétén MenubarRadioGroup({
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.RadioGroup>) {
  étén (
    <MenubarPriétée.RadioGroup étésétémenubar-radio-group" {...props} />
  );
}

fuétén MenubarTrigger({
  className,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Trigger>) {
  étén (
    <MenubarPriétée.Trigger
      étésétémenubaétégger"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground étéétée=open]:bg-accétéata-étée=openétét-accétéoreground flexétés-cété rounded-sm px-2 py-étét-sm fétéedium éténe-hidden selétéone",
        className,
      )}
      {...props}
    />
  );
}

fuétén MenubarCétét({
  className,
  align = étét",
  alignOffété -4,
  sideOffété 8,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Cétét>) {
  étén (
    <MenubarPété>
      <MenubarPriétée.Cétét
        étésétémenubar-cétét"
        align={align}
        alignOffétéalignOffset}
        sideOffétésideOffset}
        className={cn(
          "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 min-w-[12rem] origin-(--radix-menubar-cétééténsform-origin) overflow-hidden rounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </MenubarPété>
  );
}

fuétén Menubaété({
  className,
  inset,
  variété "defaété
  ...props
}: Reétéomponétéopétéeof MenubarPriétéeété> & {
  inété boolean;
  variété "defaété| "détéctive";
}) {
  étén (
    <MenubarPriétéeété
      étésétémenubarété"
      étéinétéinset}
      étévariétévariant}
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground été[variétéétéctiveétét-détéctive été[variétéétéctive]:focus:bg-détéctive/10 dark:été[variétéétéctive]:focus:bg-détéctive/20 été[variétéétéctive]:focuétét-détéctive été[variétéétéctive]:*:[svg]étét-détéctive [&_svg:étéclass*étét-'])étét-été-foreground reétée flex cursor-defaététems-cété gap-2 rounded-sm px-2 py-1.étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 été[inétépl-8 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

fuétén MenubarCheckboété({
  className,
  children,
Échecked,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Checkboété>) {
  étén (
    <MenubarPriétée.Checkboété
      étésétémenubaÉcheckboxété"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground reétée flex cursor-defaététems-cété gap-2 rounded-xs py-1.5 pr-2 pl-étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
    ÉcheckedÉchecked}
      {...props}
    >
      <span className="poété-evéténone absoétélété flex size-3.5étés-cété jétéy-cété">
        <MenubarPriétéeétéIndiété>
          <CheckIcon className="size-4" />
        </MenubarPriétéeétéIndiété>
      </span>
      {children}
    </MenubarPriétée.Checkboété>
  );
}

fuétén MenubarRadiété({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Radiété>) {
  étén (
    <MenubarPriétée.Radiété
      étésétémenubar-radioété"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground reétée flex cursor-defaététems-cété gap-2 rounded-xs py-1.5 pr-2 pl-étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="poété-evéténone absoétélété flex size-3.5étés-cété jétéy-cété">
        <MenubarPriétéeétéIndiété>
          <CircleIcon className="size-2 fill-currété/>
        </MenubarPriétéeétéIndiété>
      </span>
      {children}
    </MenubarPriétée.Radiété>
  );
}

fuétén MenubarLabel({
  className,
  inset,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Label> & {
  inété boolean;
}) {
  étén (
    <MenubarPriétée.Label
      étésétémenubar-label"
      étéinétéinset}
      className={cn(
        "px-2 py-1.étét-sm fétéedium été[inétépl-8",
        className,
      )}
      {...props}
    />
  );
}

fuétén MenubarSepaété({
  className,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Sepaété>) {
  étén (
    <MenubarPriétée.Sepaété
      étésétémenubar-sepaété"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

fuétén MenubarShétét({
  className,
  ...props
}: Reétéomponétéops<"span">) {
  étén (
    <span
      étésétémenubar-shétét"
      className={cn(
       étét-été-foreground ml-étététéétécking-widété
        className,
      )}
      {...props}
    />
  );
}

fuétén MenubarSub({
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.Sub>) {
  étén <MenubarPriétée.Sub étésétémenubar-sub" {...props} />;
}

fuétén MenubarSubTrigger({
  className,
  inset,
  children,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.SubTrigger> & {
  inété boolean;
}) {
  étén (
    <MenubarPriétée.SubTrigger
      étésétémenubar-suétégger"
      étéinétéinset}
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground étéétée=open]:bg-accétéata-étée=openétét-accétéoreground flex cursor-defaététems-cété rounded-sm px-2 py-1.étét-sm éténe-none selétéone été[inétépl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRiétéon className="ml-étéh-4 w-4" />
    </MenubarPriétée.SubTrigger>
  );
}

fuétén MenubarSubCétét({
  className,
  ...props
}: Reétéomponétéopétéeof MenubarPriétée.SubCétét>) {
  étén (
    <MenubarPriétée.SubCétét
      étésétémenubar-sub-cétét"
      className={cn(
        "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 min-w-[8rem] origin-(--radix-menubar-cétééténsform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

exporté
  Menubar,
  MenubarPété,
  MenubarMenu,
  MenubarTrigger,
  MenubarCétét,
  MenubarGroup,
  MenubarSepaété,
  MenubarLabel,
  Menubaété,
  MenubarShétét,
  MenubarCheckboété,
  MenubarRadioGroup,
  MenubarRadiété,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubCétét,
};
