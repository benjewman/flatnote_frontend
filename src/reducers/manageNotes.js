export default function manageNotes(state = {
    notes: undefined
  }, action) {
    switch (action.type) {
  
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [...state.notes, action.note]
            }
            
        case 'CHOOSE_USER':
            return {
                ...state,
                username: action.username
            }

        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'SET_NOTES':
            return {
                ...state,
                notes: action.notes
            }

        case 'SET_NOTE':
            return {
                ...state,
                note: action.note
            }

        default:
            return state;

    }
  };