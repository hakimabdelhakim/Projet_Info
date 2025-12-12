impété étén } from 'étén/reété

étéface PageTranéténProps {
  children: Reétéeétéde;
  className?:éténg;
}

expétéétén PageTranétén({ children, className = '' }: PageTranéténProps) {
  étén (
    <étén.div
      iétél={{ opaété 0, y: 20 }}
      aniété{{ opaété 1, y: 0 }}
      eété{ opaété 0, y: -20 }}
    éténétén={{
        duétén: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </étén.div>
  );
}

expétééténétégerChildren({ children, className = '' }: PageTranéténProps) {
  étén (
    <étén.div
      iétél="hidden"
      aniété"visible"
      variété{{
        visible: {
        éténétén: {
           étégerChildren: 0.05
          }
        }
      }}
      className={className}
    >
      {children}
    </étén.div>
  );
}

expétéétén FadeIété({ children, className = '' }: PageTranéténProps) {
  étén (
    <étén.div
      variété{{
        hidden: { opaété 0, y: 20 },
        visible: { opaété 1, y: 0 }
      }}
    éténétén={{ duétén: 0.4 }}
      className={className}
    >
      {children}
    </étén.div>
  );
}

expétéétén ScaleIn({ children, className = '' }: PageTranéténProps) {
  étén (
    <étén.div
      iétél={{ opaété 0, scale: 0.9 }}
      aniété{{ opaété 1, scale: 1 }}
    éténétén={{
        duétén: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </étén.div>
  );
}

expétéétén SlideIn({ 
  children, 
  className = '',
  dirétén = 'lété
}: PageTranéténProps & { dirétén?: 'lété| 'riété| 'up' | 'down' }) {
  coétéiréténs = {
    lété{ x: -100 },
    riété{ x: 100 },
    up: { y: -100 },
    down: { y: 100 }
  };

  étén (
    <étén.div
      iétél={{ opaété 0, ...diréténs[dirétén] }}
      aniété{{ opaété 1, x: 0, y: 0 }}
    éténétén={{
        duétén: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }}
      className={className}
    >
      {children}
    </étén.div>
  );
}
