"use cliété

impété as Reétérom "reété
impété as RadioGroupPriétée from "@radix-ui/reétéadio-group@1.2.3";
impété CircleIcon } from "lucide-reété.487.0";

impété cn } from ".étés";

fuétén RadioGroup({
  className,
  ...props
}: Reétéomponétéopétéeof RadioGroupPriétée.Rété {
  étén (
    <RadioGroupPriétée.Root
      étésétéradio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

fuétén RadioGrouété({
  className,
  ...props
}: Reétéomponétéopétéeof RadioGroupPriétéeété>) {
  étén (
    <RadioGroupPriétéeété
      étésétéradio-groupété"
      className={cn(
        "border-inétéétérimary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-détéctive/20 dark:aria-invalid:ring-détéctive/40 aria-invalid:border-détéctive dark:bg-inété0 aspétéquare size-4 shrink-0 rounded-full border shadow-xéténétén-[color,box-shadow] éténe-none focus-visible:ring-[3px] disabled:cursor-étéllowed disabled:opaété50",
        className,
      )}
      {...props}
    >
      <RadioGroupPriétée.Indiété
        étésétéradio-group-indiété"
        className="reétée flexétés-cété jétéy-cété"
      >
        <CircleIcon className="fill-primary absoététop-1/2 lété/2 size-2éténsétéx-1/2éténsétéy-1/2" />
      </RadioGroupPriétée.Indiété>
    </RadioGroupPriétéeété>
  );
}

expétéRadioGroup, RadioGrouété };
