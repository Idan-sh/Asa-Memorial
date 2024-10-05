export const relationOptions = {
    family: [
      'אבא',
      'אמא',
      'בן',
      'בת',
      'בן דוד',
      'בת דוד',
      'דוד',
      'דודה',
      'אחיין',
      'אחיינית',
    ],
    friend: ['חבר', 'חברה', 'חבר לרכיבות', 'חברה לרכיבות'],
    acquaintance: ['שותף לעבודה', 'שכן'],
  };
  export type RelationCategory = keyof typeof relationOptions;