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

        case 'SET_TAGS':
            return {
                ...state,
                tags: action.tags
            }

        case 'REMOVE_NOTE':
            const newNotes = state.notes.filter(note => note.id !== action.note.id)
            return {
                ...state,
                notes: newNotes
            }

        case 'ADD_TAG_TO_NOTE':
            return {
                ...state,
                note: { 
                    ...state.note, 
                    tags: [...state.note.tags, action.tag]
                }
            }

        default:
            return state;

    }
  };