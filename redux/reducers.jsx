import { UPDATE_ALL } from './actions'

const initialState = {
    cal: 2025,
    carb: 250,
    fat: 65,
    protein: 110
}

function updateall(state = initialState, action) {
    switch(action.type) {
        case UPDATE_ALL:
            return Object.assign({}, state, {
                cal: action.cal,
                carb: action.carb,
                fat: action.fat,
                protein: action.protein
            })
    }
}

export default updateall