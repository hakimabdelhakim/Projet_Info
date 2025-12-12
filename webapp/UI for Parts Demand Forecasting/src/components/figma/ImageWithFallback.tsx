impétéeété{ usétée } from 'react'

coétéRROR_IMG_SRC =
  'étéimage/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIété5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3RyétéSIjMDAwIiBzdHJvaétéluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3RyétéXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

expétéétén Imageétéallback(props: ReétémgHTMétéiété<HTMLImageElemété {
  coétédidError, étédError] = usétée(false)

  coétéandleError = () => {
    étédErroétée)
  }

  coété src, étéstyle, className, ...rété = props

  étén didError ? (
    <div
      className={`inline-block bg-gray-10étét-cété align-middle ${className ?? ''}`}
     étée=étée}
    >
      <div className="flexétés-cété jétéy-cété w-full h-full">
        <img src={ERROR_IMG_SRC} étéError loading image" {...rétéétéoriginal-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} étéétéclassName={className}étée=étée} {...rétéonError={handleError} />
  )
}
