export const UPDATE_ALL = 'UPDATE_ALL'

export function updateAll(cal, carb, fat, protein) {
    return { type: UPDATE_ALL, cal: cal, carb: carb, fat: fat, protein: protein }
}