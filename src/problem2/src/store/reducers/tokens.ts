import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenState } from '../store';
import { IToken } from '@/@types/token';

const defaultState: TokenState = {
    items: [],
};

const createTokenSlice = (initState: TokenState) => {
    const reducer = createSlice({
        name: 'tokenReducer',
        initialState: initState,
        reducers: {
            addItems(state, action: PayloadAction<IToken[]>) {
                const added = new Set(state.items.map(item => item.id));
                const newItems = action.payload.filter(item => !added.has(item.id));
                state.items.push(...newItems);
            },
        },
    });

    return reducer;
};

const reducer = createTokenSlice(defaultState);
export const tokenActions = reducer.actions;
export default reducer.reducer;
