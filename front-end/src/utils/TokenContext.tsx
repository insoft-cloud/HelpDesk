import React, {createContext, Dispatch, useContext, useReducer} from "react";

export type TokenContext = {
    token : string | undefined;
    tokenExpired : number;
    page : string;
    user : string | undefined;
};

type Action =
    | { type: 'SET_TOKEN'; token: string, tokenExpired : number , user: string}
    | { type: 'SET_PAGE'; page: string}


type TokenDispatch = Dispatch<Action>;
const TokenStateContext = createContext<TokenContext | undefined>(undefined);
const TokenDispatchContext = createContext<TokenDispatch | null>(null);


function reducer(state: TokenContext, action: Action): TokenContext {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token,
                tokenExpired: action.tokenExpired,
                user: action.user
            };
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page,
            };
        default:
            throw new Error('Unhandled action');
    }
}

export function TokenProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, {
        token: undefined,
        tokenExpired: 0,
        page: "HOME",
        user: undefined,
    });

    return (
        <TokenStateContext.Provider value={state}>
            <TokenDispatchContext.Provider value={dispatch}>
                {children}
            </TokenDispatchContext.Provider>
        </TokenStateContext.Provider>
    );
}

export function useTokenState() {
    const state = useContext(TokenStateContext);
    if (!state) throw new Error('Cannot find TokenProvider');
    return state;
}

export function useTokenDispatch() {
    const dispatch = useContext(TokenDispatchContext);
    if (!dispatch) throw new Error('Cannot find TokenDispatchContext');
    return dispatch;
}