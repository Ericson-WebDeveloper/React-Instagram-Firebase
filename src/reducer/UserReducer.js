

export const initialStateAuth = {
    user: null,
    isLoading: false,
    errors: ''
}

export const UserReducers = (state = {}, action) => {
    switch(action.type) {

        case 'INITIAL_SIGNIN':
            return {
                ...state,
                isLoading: true
            };
        
        case 'SIGNIN_FINISH': 
            return {
                ...state,
                isLoading: false
            }

        case 'SET_USER': 
            return {
                ...state,
                user: action.payload
            }
            
        case 'SET_ERROR': 
            return {
                ...state,
                errors: action.payload
            }
       default:
        return state; 
    }
}