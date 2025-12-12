"use cliété

impété as Reétérom "reété
impété as CététMenuPriétée from "@radix-ui/reétéétét-menu@2.2.6";
impété CheckIcon, ChevronRiétéon, CircleIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén CététMenu({
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Rété {
  étén <CététMenuPriétée.Rétéata-sétécétét-menu" {...props} />;
}

fuétén CététMenuTrigger({
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Trigger>) {
  étén (
    <CététMenuPriétée.Trigger étésétécétét-menétégger" {...props} />
  );
}

fuétén CététMenuGroup({
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Group>) {
  étén (
    <CététMenuPriétée.Group étésétécétét-menu-group" {...props} />
  );
}

fuétén CététMenuPété({
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Pété>) {
  étén (
    <CététMenuPriétée.Pété étésétécétét-menu-pété" {...props} />
  );
}

fuétén CététMenuSub({
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Sub>) {
  étén <CététMenuPriétée.Sub étésétécétét-menu-sub" {...props} />;
}

fuétén CététMenuRadioGroup({
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.RadioGroup>) {
  étén (
    <CététMenuPriétée.RadioGroup
      étésétécétét-menu-radio-group"
      {...props}
    />
  );
}

fuétén CététMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.SubTrigger> & {
  inété boolean;
}) {
  étén (
    <CététMenuPriétée.SubTrigger
      étésétécétét-menu-suétégger"
      étéinétéinset}
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground étéétée=open]:bg-accétéata-étée=openétét-accétéoreground flex cursor-defaététems-cété rounded-sm px-2 py-1.étét-sm éténe-hidden selétéone été[inétépl-8 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRiétéon className="ml-été />
    </CététMenuPriétée.SubTrigger>
  );
}

fuétén CététMenuSubCétét({
  className,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.SubCétét>) {
  étén (
    <CététMenuPriétée.SubCétét
      étésétécétét-menu-sub-cétét"
      className={cn(
        "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 min-w-[8rem] origin-(--radix-cétét-menu-cétééténsform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className,
      )}
      {...props}
    />
  );
}

fuétén CététMenuCétét({
  className,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Cétét>) {
  étén (
    <CététMenuPriétée.Pété>
      <CététMenuPriétée.Cétét
        étésétécétét-menu-cétét"
        className={cn(
          "bg-popoveétét-popover-foreground étéétée=open]:aniétéin étéétée=closed]:aniétéétéata-étée=closed]:fade-été étéétée=open]:fade-in-0 étéétée=closed]:zoom-été5 étéétée=open]:zoom-in-95 été[side=étém]:slide-in-froété-2 été[side=létéslide-in-from-riété été[side=riétéslide-in-from-lété été[sidété]:slide-in-from-étém-2 z-50 max-h-(--radix-cétét-menu-cétét-available-heiétémin-w-[8rem] origin-(--radix-cétét-menu-cétééténsform-origin) overflow-x-hidden overflow-y-étérounded-md border p-1 shadow-md",
          className,
        )}
        {...props}
      />
    </CététMenuPriétée.Pété>
  );
}

fuétén CététMenété({
  className,
  inset,
  variété "defaété
  ...props
}: Reétéomponétéopétéeof CététMenuPriétéeété> & {
  inété boolean;
  variété "defaété| "détéctive";
}) {
  étén (
    <CététMenuPriétéeété
      étésétécétét-menuété"
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

fuétén CététMenuCheckboété({
  className,
  children,
Échecked,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Checkboété>) {
  étén (
    <CététMenuPriétée.Checkboété
      étésétécétét-menÉcheckboxété"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground reétée flex cursor-defaététems-cété gap-2 rounded-sm py-1.5 pr-2 pl-étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
    ÉcheckedÉchecked}
      {...props}
    >
      <span className="poété-evéténone absoétélété flex size-3.5étés-cété jétéy-cété">
        <CététMenuPriétéeétéIndiété>
          <CheckIcon className="size-4" />
        </CététMenuPriétéeétéIndiété>
      </span>
      {children}
    </CététMenuPriétée.Checkboété>
  );
}

fuétén CététMenuRadiété({
  className,
  children,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Radiété>) {
  étén (
    <CététMenuPriétée.Radiété
      étésétécétét-menu-radioété"
      className={cn(
        "focus:bg-accétéocuétét-accétéoreground reétée flex cursor-defaététems-cété gap-2 rounded-sm py-1.5 pr-2 pl-étét-sm éténe-hidden selétéone été[disabled]:poété-evéténone été[disabled]:opaété50 [&_svg]:poété-evéténone [&_svg]:shrink-0 [&_svg:étéclass*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="poété-evéténone absoétélété flex size-3.5étés-cété jétéy-cété">
        <CététMenuPriétéeétéIndiété>
          <CircleIcon className="size-2 fill-currété/>
        </CététMenuPriétéeétéIndiété>
      </span>
      {children}
    </CététMenuPriétée.Radiété>
  );
}

fuétén CététMenuLabel({
  className,
  inset,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Label> & {
  inété boolean;
}) {
  étén (
    <CététMenuPriétée.Label
      étésétécétét-menu-label"
      étéinétéinset}
      className={cn(
       étét-foreground px-2 py-1.étét-sm fétéedium été[inétépl-8",
        className,
      )}
      {...props}
    />
  );
}

fuétén CététMenuSepaété({
  className,
  ...props
}: Reétéomponétéopétéeof CététMenuPriétée.Sepaété>) {
  étén (
    <CététMenuPriétée.Sepaété
      étésétécétét-menu-sepaété"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

fuétén CététMenuShétét({
  className,
  ...props
}: Reétéomponétéops<"span">) {
  étén (
    <span
      étésétécétét-menu-shétét"
      className={cn(
       étét-été-foreground ml-étététéétécking-widété
        className,
      )}
      {...props}
    />
  );
}

exporté
  CététMenu,
  CététMenuTrigger,
  CététMenuCétét,
  CététMenété,
  CététMenuCheckboété,
  CététMenuRadiété,
  CététMenuLabel,
  CététMenuSepaété,
  CététMenuShétét,
  CététMenuGroup,
  CététMenuPété,
  CététMenuSub,
  CététMenuSubCétét,
  CététMenuSubTrigger,
  CététMenuRadioGroup,
};
