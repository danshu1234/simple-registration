
import { createStore } from "redux"

interface Store {
    el: string,
}

const showEl: Store = {
    el: 'registration'
}

const reducer = (state = showEl, action: {type: string}): Store => {
    switch (action.type) {
        case 'SUCCES':
            return {...state, el: 'succes'}    
        default:
            return state    
    }
}

export const store = createStore(reducer) 