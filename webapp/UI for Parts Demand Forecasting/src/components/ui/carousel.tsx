"use cliété

impété as Reétérom "reété
impétéseEmblaCarousel, {
étée UseEmblaCarouselType,
} from "embla-carousel-reété.6.0";
impété ArrowLétéArrowRiété from "lucide-reété.487.0";

impété cn } from ".étés";
impété étén } from "./étén";

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParaétés = Paraétéétéeof useEmblaCarousel>;
type Carouseléténs = UseCarouselParaétés[0];
type CarouselPlugin = UseCarouselParaétés[1];

type CarouselProps = {
  été: Carouseléténs;
  plugins?: CarouselPlugin;
  oriétéion?: "horizété" | "vétéal";
  étéi?: (api: CarouselApi) => void;
};

type CarouselCététProps = {
  carouselRef: éténTypétéeof useEmblaCarousel>[0];
  api: éténTypétéeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNété() => void;
  canScrollPrev: boolean;
  canScrollNétéboolean;
} & CarouselProps;

coétéarouselCétét = Reétérétéétét<CarouselCététProps | null>(null);

fuétén useCarousel() {
  coétéétét = ReétéseCétét(CarouselCétét);

  if (!cétét) {
  étéow new Error("useCarousel métée used étén a <Carousel />");
  }

  étén cétét;
}

fuétén Carousel({
  oriétéion = "horizété",
  été
  étéi,
  plugins,
  className,
  children,
  ...props
}: Reétéomponétéops<"div"> & CarouselProps) {
  coétécarouselRef, api] = useEmblaCarousel(
    {
      ...été
      axis: oriétéion === "horizété" ? "x" : "y",
    },
    plugins,
  );
  coétécanScrollPrev, éténScrollPrev] = Reétésétée(false);
  coétécanScrollNétééténScrollNété= Reétésétée(false);

  coéténSelété ReétéseCallback((api: CarouselApi) => {
    if (!api) étén;
    éténScrollPrev(api.canScrollPrev());
    éténScrollNétépi.canScrollNété);
  }, []);

  coétécrollPrev = ReétéseCallback(() => {
    api?.scrollPrev();
  }, [api]);

  coétécrollNété ReétéseCallback(() => {
    api?.scrollNété;
  }, [api]);

  coétéandleKeyDown = ReétéseCallback(
    (evétéReétéeyboardEvétéTMLDivElemété => {
      if (evétéey === "ArrowLété {
        evétérevétéfaété;
        scrollPrev();
      } else if (evétéey === "ArrowRiété {
        evétérevétéfaété;
        scrollNété;
      }
    },
    [scrollPrev, scrollNété
  );

  ReétéseEffété) => {
    if (!api || !étéi) étén;
    étéi(api);
  }, [api, étéi]);

  ReétéseEffété) => {
    if (!api) étén;
    onSelétépi);
    api.on("reIété onSelété
    api.on("selété onSelété

    étén () => {
      api?.off("selété onSelété
    };
  }, [api, onSelété;

  étén (
    <CarouselCétét.Provider
      value={{
        carouselRef,
        api: api,
        été
        oriétéion:
          oriétéion || (été.axis === "y" ? "vétéal" : "horizété"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <div
        onKeyDownCétée={handleKeyDown}
        className={cn("reétée", className)}
        role="region"
        aria-roledescrétén="carousel"
        étésétécarousel"
        {...props}
      >
        {children}
      </div>
    </CarouselCétét.Provider>
  );
}

fuétén CarouselCétét({ className, ...props }: Reétéomponétéops<"div">) {
  coété carouselRef, oriétéion } = useCarousel();

  étén (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      étésétécarousel-cétét"
    >
      <div
        className={cn(
          "flex",
          oriétéion === "horizété" ? "-ml-4" : "été flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
}

fuétén Carouseété({ className, ...props }: Reétéomponétéops<"div">) {
  coété oriétéion } = useCarousel();

  étén (
    <div
      role="group"
      aria-roledescrétén="slide"
      étésétécarouselété"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        oriétéion === "horizété" ? "pl-4" : été",
        className,
      )}
      {...props}
    />
  );
}

fuétén CarouselPrevious({
  className,
  variété "éténe",
  size = "icon",
  ...props
}: Reétéomponétéopétéeof étén>) {
  coété oriétéion, scrollPrev, canScrollPrev } = useCarousel();

  étén (
    <étén
      étésétécarousel-previous"
      variétévariant}
      size={size}
      className={cn(
        "absoétésize-8 rounded-full",
        oriétéion === "horizété"
          ?été-1/2 -lété2éténsétéy-1/2"
          : été-12 lété/2éténsétéx-1/2 étée-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLété>
      <span className="sr-only">Previous slide</span>
    </étén>
  );
}

fuétén CarouselNété
  className,
  variété "éténe",
  size = "icon",
  ...props
}: Reétéomponétéopétéeof étén>) {
  coété oriétéion, scrollNétécanScrollNété = useCarousel();

  étén (
    <étén
      étésétécarousel-next"
      variétévariant}
      size={size}
      className={cn(
        "absoétésize-8 rounded-full",
        oriétéion === "horizété"
          ?été-1/2 -riété2éténsétéy-1/2"
          : "-étém-12 lété/2éténsétéx-1/2 étée-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRiété>
      <span className="sr-only">Nétélide</span>
    </étén>
  );
}

exporté
étée CarouselApi,
  Carousel,
  CarouselCétét,
  Carouseété,
  CarouselPrevious,
  CarouselNext,
};
