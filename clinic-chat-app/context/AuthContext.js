import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const INITIAL_STATE = {
        currentUser: null,
    }
    const authReducer = (state, action) => {
        switch (action.type) {
            case 'LOGIN':
                return {
                    currentUser: action.payload,
                }

            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)
    return (
        <AuthContext.Provider value={{ currentUser: state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}
