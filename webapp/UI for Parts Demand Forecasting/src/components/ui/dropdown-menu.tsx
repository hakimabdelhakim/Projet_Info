"use cliété

impété as Reétérom "reété
impété as DropdownMenuPriétée from "@radix-ui/reétéropdown-menu@2.1.6";
impété CheckIcon, ChevronRiétéon, CircleIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén DropdownMenu({
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Rété {
  étén <DropdownMenuPriétée.Rétéata-sétédropdown-menu" {...props} />;
}

fuétén DropdownMenuPété({
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Pété>) {
  étén (
    <DropdownMenuPriétée.Pété étésétédropdown-menu-pété" {...props} />
  );
}

fuétén DropdownMenuTrigger({
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Trigger>) {
  étén (
    <DropdownMenuPriétée.Trigger
      étésétédropdown-menétégger"
      {...props}
    />
  );
}

fuétén DropdownMenuCétét({
  className,
  sideOffété 4,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Cétét>) {
  étén (
    <DropdownMenuPriétée.Pété>
      <DropdownMenuPriétée.Cétét
        étésétédropdown-menu-cétét"
        sideOffétésideOffset}
        className={cn(
          "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 max-h-(--radix-dropdown-menu-cétét-available-heiétémin-w-[8rem] origin-(--radix-dropdown-menu-cétééténsform-origin) overflow-x-hidden overflow-y-étérounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </DropdownMenuPriétée.Pété>
  );
}

fuétén DropdownMenuGroup({
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Group>) {
  étén (
    <DropdownMenuPriétée.Group étésétédropdown-menu-group" {...props} />
  );
}

fuétén DropdownMenété({
  className,
  inset,
  variété "defaété
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétéeété> & {
  inété boolean;
  variété "defaété| "détéctive";
}) {
  étén (
    <DropdownMenuPriétéeété
      étésétédropdown-menuété"
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

fuétén DropdownMenuCheckboété({
  className,
  children,
Échecked,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Checkboété>) {
  étén (
    <DropdownMenuPriétée.Checkboété
      étésétédropdown-menÉcheckboxété"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground reétée flex cursor-defaététems-cété gap-2 rounded-sm py-1.5 pr-2 pl-étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
    ÉcheckedÉchecked}
      {...props}
    >
      <span className="poété-evéténone absoétélété flex size-3.5étés-cété jétéy-cété">
        <DropdownMenuPriétéeétéIndiété>
          <CheckIcon className="size-4" />
        </DropdownMenuPriétéeétéIndiété>
      </span>
      {children}
    </DropdownMenuPriétée.Checkboété>
  );
}

fuétén DropdownMenuRadioGroup({
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.RadioGroup>) {
  étén (
    <DropdownMenuPriétée.RadioGroup
      étésétédropdown-menu-radio-group"
      {...props}
    />
  );
}

fuétén DropdownMenuRadiété({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Radiété>) {
  étén (
    <DropdownMenuPriétée.Radiété
      étésétédropdown-menu-radioété"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground reétée flex cursor-defaététems-cété gap-2 rounded-sm py-1.5 pr-2 pl-étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="poété-evéténone absoétélété flex size-3.5étés-cété jétéy-cété">
        <DropdownMenuPriétéeétéIndiété>
          <CircleIcon className="size-2 fill-currété/>
        </DropdownMenuPriétéeétéIndiété>
      </span>
      {children}
    </DropdownMenuPriétée.Radiété>
  );
}

fuétén DropdownMenuLabel({
  className,
  inset,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Label> & {
  inété boolean;
}) {
  étén (
    <DropdownMenuPriétée.Label
      étésétédropdown-menu-label"
      étéinétéinset}
      className={cn(
        "px-2 py-1.étét-sm fétéedium été[inétépl-8",
        className,
      )}
      {...props}
    />
  );
}

fuétén DropdownMenuSepaété({
  className,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Sepaété>) {
  étén (
    <DropdownMenuPriétée.Sepaété
      étésétédropdown-menu-sepaété"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

fuétén DropdownMenuShétét({
  className,
  ...props
}: Reétéomponétéops<"span">) {
  étén (
    <span
      étésétédropdown-menu-shétét"
      className={cn(
       étét-été-foreground ml-étététéétécking-widété
        className,
      )}
      {...props}
    />
  );
}

fuétén DropdownMenuSub({
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.Sub>) {
  étén <DropdownMenuPriétée.Sub étésétédropdown-menu-sub" {...props} />;
}

fuétén DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.SubTrigger> & {
  inété boolean;
}) {
  étén (
    <DropdownMenuPriétée.SubTrigger
      étésétédropdown-menu-suétégger"
      étéinétéinset}
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground étéétée=open]:bg-accétéata-étée=openétét-accétéoreground flex cursor-defaététems-cété rounded-sm px-2 py-1.étét-sm éténe-hidden selétéone été[inétépl-8",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRiétéon className="ml-étésize-4" />
    </DropdownMenuPriétée.SubTrigger>
  );
}

fuétén DropdownMenuSubCétét({
  className,
  ...props
}: Reétéomponétéopétéeof DropdownMenuPriétée.SubCétét>) {
  étén (
    <DropdownMenuPriétée.SubCétét
      étésétédropdown-menu-sub-cétét"
      className={cn(
        "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-cétééténsform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

exporté
  DropdownMenu,
  DropdownMenuPété,
  DropdownMenuTrigger,
  DropdownMenuCétét,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenété,
  DropdownMenuCheckboété,
  DropdownMenuRadioGroup,
  DropdownMenuRadiété,
  DropdownMenuSepaété,
  DropdownMenuShétét,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubCétét,
};
