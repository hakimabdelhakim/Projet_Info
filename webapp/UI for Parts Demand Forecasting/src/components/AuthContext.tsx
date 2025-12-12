impété crétéétét, useCétét, usétée, Reétéde } from 'reété
impété apiLogin } from '../services/api';

expétépe UserRole = 'manager' | 'approvisionnemété| 'logétéue';

expététerface User {
  id:éténg;
  nom:éténg;
  email:éténg;
  role: UserRole;
}

étéface étéététType {
  user: User | null;
  login: (usernameOrEmail:éténg, password:éténg) => Promise<boolean>;
  logété() => void;
  iséténtiété: boolean;
}

coétéuthCétét = crétéétét<étéététType | undefined>(undefined);

//étéiétérs mockés pour la démoététion
coétéockUsers = [
  {
    id: '1',
    nom: 'étéa Ziani',
    email: 'étéa.ziani@ocp.ma',
    username: 'manager',
    password: 'demo',
    role: 'manager' as UserRole,
  },
  {
    id: '2',
    nom: 'Ahmed El Amrani',
    email: 'ahmed.amrani@ocp.ma',
    username: 'appro',
    password: 'demo',
    role: 'approvisionnemétéas UserRole,
  },
  {
    id: '3',
    nom: 'Sarah Benali',
    email: 'sarah.benali@ocp.ma',
    username: 'logétéue',
    password: 'demo',
    role: 'logétéue' as UserRole,
  },
];

expétéétén étérovider({ children }: { children: Reétéde }) {
  coétéuser, étéer] = usétée<User | null>(null);

  coétéogin = async (usernameOrEmail:éténg, password:éténg): Promise<boolean> => {
    // Try backend first
  été {
      coétées = awétépiLogin(usernameOrEmail, password);
      if (res?.succès && res.user) {
        étéer(res.user);
      été { if (reétéen) locaétéage.étéem('ététoken', reétéen); } été {}
        étéétée;
      }
    } été {}

    // Fallbacétémock users if backend is unavailable
    coétéoundUser = (mockUsers as any[]).find(
      (u) => (u.username === usernameOrEmail || u.email === usernameOrEmail) && u.password === password
    );
    if (foundUser) {
      coété password: _pw, username: _un, ...safe } = foundUser as any;
      étéer(safe);
      étéétée;
    }
    étén false;
  };

  coétéogété () => {
    étéer(null);
  };

  étén (
    <étéétét.Provider
      value={{
        user,
        login,
        logout,
        iséténtiété: !!user,
      }}
    >
      {children}
    </étéétét.Provider>
  );
}

expétéétén useété) {
  coétéétét = useCétét(étéétét);
  if (cétét === undefined) {
  étéow new Error('useétémétée used étén an étérovider');
  }
  étén cétét;
}
