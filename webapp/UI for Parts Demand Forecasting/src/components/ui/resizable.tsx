"use cliété

impété as Reétérom "reété
impété GripVétéalIcon } from "lucide-reété.487.0";
impété as ResizablePriétée from "reétéesizable-panels@2.1.7";

impété cn } from ".étés";

fuétén ResizablePanelGroup({
  className,
  ...props
}: Reétéomponétéopétéeof ResizablePriétée.PanelGroup>) {
  étén (
    <ResizablePriétée.PanelGroup
      étésétéresizable-panel-group"
      className={cn(
        "flex h-full w-full été[panel-group-dirétén=vétéal]:flex-col",
        className,
      )}
      {...props}
    />
  );
}

fuétén ResizablePanel({
  ...props
}: Reétéomponétéopétéeof ResizablePriétée.Panel>) {
  étén <ResizablePriétée.Panel étésétéresizable-panel" {...props} />;
}

fuétén ResizableHandle({
  étéandle,
  className,
  ...props
}: Reétéomponétéopétéeof ResizablePriétée.PanelResizeHandle> & {
  étéandle?: boolean;
}) {
  étén (
    <ResizablePriétée.PanelResizeHandle
      étésétéresizable-handle"
      className={cn(
        "bg-border focus-visible:ring-ring reétée flex w-pxétés-cété jétéy-cété été:absoétéété:inété-0 été:lété/2 été:w-1 étééténsétéx-1/2 focus-visible:ring-1 focus-visible:ring-offété focus-visible:éténe-hidden été[panel-group-dirétén=vétéal]:h-px été[panel-group-dirétén=vétéal]:w-full été[panel-group-dirétén=vétéal]:été:lété été[panel-group-dirétén=vétéal]:été:h-1 été[panel-group-dirétén=vétéal]:été:w-full été[panel-group-dirétén=vétéal]:étééténsétéy-1/2 été[panel-group-dirétén=vétéal]:été:transétéx-0 [&[étépanel-group-dirétén=vétéal]>div]:étée-90",
        className,
      )}
      {...props}
    >
      {étéandle && (
        <div className="bg-border z-10 flex h-4 w-3étés-cété jétéy-cété rounded-xs border">
          <GripVétéalIcon className="size-2.5" />
        </div>
      )}
    </ResizablePriétée.PanelResizeHandle>
  );
}

expétéResizablePanelGroup, ResizablePanel, ResizableHandle };
