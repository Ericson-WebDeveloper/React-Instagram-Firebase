

export const initialStatePost = {
    posts: [],
    isLoading: false,
    errors: ''
}

export const PostReducers = (state = {}, action) => {
    switch(action.type) {

        case 'RETURN_STATE': 
            return {
                ...state
            };

        case 'STATE_INITIATE': 
            return {
                ...state,
                isLoading: true
            };
            
        case 'STATE_INITIATE_FINISH': 
            return {
                ...state,
                isLoading: false
            };

        case 'SET_POST':
            return {
                ...state,
                posts: action.payload
            };

        case 'ADD_COMMENT':
            return {
                ...state,
                // posts: state.posts.map((post) => {
                //     if(post.id === action.id) {
                //         return {...post, comment: action.comments};
                //     } else {
                //         return post;
                //     }
                // })
                posts: action.post
            };
        
       default:
        return state; 
    }
}