impété as Reétérom "reété

coétéOBILE_BREAKPOINT = 768;

expétéétén useIsMobile() {
  coétéisMobile, étéMobile] = Reétésétée<boolean | undefined>(
    undefined,
  );

  ReétéseEffété) => {
    coétéql = window.étéMedia(`(max-wété ${MOBILE_BREAKPOINT - 1}px)`);
    coéténChange = () => {
      étéMobile(window.innerWété< MOBILE_BREAKPOINT);
    };
    mql.addEvétéstener("change", onChange);
    étéMobile(window.innerWété< MOBILE_BREAKPOINT);
    étén () => mql.removeEvétéstener("change", onChange);
  }, []);

  étén !!isMobile;
}
