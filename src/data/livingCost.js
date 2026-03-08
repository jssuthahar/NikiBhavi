// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  NikiBhavi — Malaysia Living Cost Default Data
//  All amounts in Malaysian Ringgit (RM)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const FAMILY_TYPES = [
  { id: 'single',     label: 'Single',              icon: '👤', desc: '1 person' },
  { id: 'couple',     label: 'Couple / Family',      icon: '👫', desc: '2 adults' },
  { id: 'family1kid', label: 'Family + 1 Child',     icon: '👨‍👩‍👦', desc: '2 adults + 1 kid' },
  { id: 'family2kid', label: 'Family + 2 Children',  icon: '👨‍👩‍👧‍👦', desc: '2 adults + 2 kids' },
]

export const EXPENSE_CATEGORIES = [
  {
    id: 'housing',
    label: 'Housing',
    icon: '🏠',
    color: '#6366f1',
    items: [
      { id: 'rent',        label: 'Rent',             icon: '🏠', defaults: { single: 900,  couple: 1300, family1kid: 1500, family2kid: 1800 } },
      { id: 'water',       label: 'Water Bill',       icon: '💧', defaults: { single: 15,   couple: 25,   family1kid: 35,   family2kid: 45   } },
      { id: 'electricity', label: 'Electricity Bill', icon: '⚡', defaults: { single: 80,   couple: 140,  family1kid: 180,  family2kid: 220  } },
      { id: 'internet',    label: 'Internet (Unifi)', icon: '📡', defaults: { single: 80,   couple: 80,   family1kid: 100,  family2kid: 100  } },
      { id: 'mobile',      label: 'Mobile Bill',      icon: '📱', defaults: { single: 40,   couple: 80,   family1kid: 80,   family2kid: 120  } },
    ],
  },
  {
    id: 'food',
    label: 'Food & Groceries',
    icon: '🍛',
    color: '#f59e0b',
    items: [
      { id: 'groceries',    label: 'Groceries',     icon: '🛒', defaults: { single: 250,  couple: 450,  family1kid: 600,  family2kid: 750  } },
      { id: 'gas',          label: 'Gas Cylinder',  icon: '🔥', defaults: { single: 25,   couple: 30,   family1kid: 35,   family2kid: 40   } },
      { id: 'vegetables',   label: 'Vegetables',    icon: '🥦', defaults: { single: 150,  couple: 250,  family1kid: 350,  family2kid: 450  } },
      { id: 'fruits',       label: 'Fruits',        icon: '🍎', defaults: { single: 100,  couple: 180,  family1kid: 250,  family2kid: 320  } },
      { id: 'eating_out',   label: 'Eating Out',    icon: '🍽️', defaults: { single: 200,  couple: 350,  family1kid: 400,  family2kid: 500  } },
    ],
  },
  {
    id: 'transport',
    label: 'Transport',
    icon: '🚗',
    color: '#10b981',
    items: [
      { id: 'transport',   label: 'MRT / Bus / Grab', icon: '🚇', defaults: { single: 200,  couple: 350,  family1kid: 400,  family2kid: 450  } },
      { id: 'fuel',        label: 'Fuel (if car)',     icon: '⛽', defaults: { single: 0,    couple: 200,  family1kid: 250,  family2kid: 300  } },
      { id: 'parking',     label: 'Parking',           icon: '🅿️', defaults: { single: 0,    couple: 80,   family1kid: 100,  family2kid: 100  } },
    ],
  },
  {
    id: 'health',
    label: 'Health & Insurance',
    icon: '🏥',
    color: '#ef4444',
    items: [
      { id: 'medical',     label: 'Medical / Clinic',  icon: '💊', defaults: { single: 60,   couple: 100,  family1kid: 150,  family2kid: 200  } },
      { id: 'insurance',   label: 'Health Insurance',  icon: '🛡️', defaults: { single: 120,  couple: 240,  family1kid: 300,  family2kid: 400  } },
    ],
  },
  {
    id: 'kids',
    label: 'Children',
    icon: '👶',
    color: '#8b5cf6',
    items: [
      { id: 'school',      label: 'School Fees',       icon: '🎒', defaults: { single: 0,    couple: 0,    family1kid: 300,  family2kid: 600  } },
      { id: 'tuition',     label: 'Tuition / Class',   icon: '📚', defaults: { single: 0,    couple: 0,    family1kid: 200,  family2kid: 400  } },
      { id: 'childcare',   label: 'Daycare / Babysit', icon: '🧸', defaults: { single: 0,    couple: 0,    family1kid: 400,  family2kid: 700  } },
      { id: 'kids_items',  label: 'Kids Needs',        icon: '🎠', defaults: { single: 0,    couple: 0,    family1kid: 150,  family2kid: 280  } },
    ],
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle',
    icon: '🎬',
    color: '#ec4899',
    items: [
      { id: 'netflix',     label: 'Netflix',           icon: '📺', defaults: { single: 18,   couple: 18,   family1kid: 25,   family2kid: 25   } },
      { id: 'amazon',      label: 'Amazon Prime',      icon: '📦', defaults: { single: 0,    couple: 15,   family1kid: 15,   family2kid: 15   } },
      { id: 'gym',         label: 'Gym / Sports',      icon: '🏋️', defaults: { single: 80,   couple: 160,  family1kid: 100,  family2kid: 100  } },
      { id: 'entertainment',label: 'Entertainment',    icon: '🎮', defaults: { single: 100,  couple: 150,  family1kid: 200,  family2kid: 250  } },
      { id: 'outing',      label: 'Weekly Outings',    icon: '🚶', defaults: { single: 150,  couple: 250,  family1kid: 350,  family2kid: 450  } },
    ],
  },
  {
    id: 'misc',
    label: 'Miscellaneous',
    icon: '📦',
    color: '#64748b',
    items: [
      { id: 'remittance',  label: 'Remittance to India', icon: '🏦', defaults: { single: 500,  couple: 800,  family1kid: 800,  family2kid: 1000 } },
      { id: 'clothing',    label: 'Clothing / Shopping', icon: '👗', defaults: { single: 100,  couple: 200,  family1kid: 250,  family2kid: 350  } },
      { id: 'temple',      label: 'Temple / Donation',   icon: '🙏', defaults: { single: 50,   couple: 80,   family1kid: 80,   family2kid: 100  } },
      { id: 'savings_send',label: 'Emergency Fund',      icon: '🏧', defaults: { single: 200,  couple: 300,  family1kid: 300,  family2kid: 400  } },
    ],
  },
]

// Build flat default map keyed by familyType
export function getDefaults(familyType) {
  const result = {}
  EXPENSE_CATEGORIES.forEach(cat => {
    cat.items.forEach(item => {
      result[item.id] = item.defaults[familyType] ?? 0
    })
  })
  return result
}
