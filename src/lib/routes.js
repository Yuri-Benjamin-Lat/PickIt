export const TOOL_ROUTES = {
  single:  '/single-winner',
  mystery: '/mystery-reward',
  turn:    '/turn-order',
  role:    '/role-assigner',
  team:    '/team-maker',
  elim:    '/elimination',
  bracket: '/bracket',
}

export const ROUTE_TITLES = {
  '/':               'Home',
  '/single-winner':  'Single Winner',
  '/mystery-reward': 'Mystery Reward',
  '/turn-order':     'Sequence / Turn Order',
  '/role-assigner':  'Role Assigner',
  '/team-maker':     'Team Maker',
  '/elimination':    'One by One Elimination',
  '/bracket':        'Bracket Tournament',
}

export const NAV_GROUPS = [
  { label: 'Randomizers', items: [
    { id: 'single', label: 'Single Winner',  icon: 'trophy' },
    { id: 'turn',   label: 'Turn Order',     icon: 'list'   },
    { id: 'role',   label: 'Role Assigner',  icon: 'tag'    },
    { id: 'team',   label: 'Team Maker',     icon: 'users'  },
  ]},
]
