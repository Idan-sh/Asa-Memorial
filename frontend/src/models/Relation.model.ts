export const relationOptions = {
    family: [
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
    acquaintance: ['מכר', 'שותף לעבודה', 'שותפה לעבודה', 'שכן', 'שכנה'],
  };
  export type RelationCategory = keyof typeof relationOptions;