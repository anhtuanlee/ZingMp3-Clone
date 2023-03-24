import { createSlice } from '@reduxjs/toolkit';
import { idActiveSidebar } from '../../config/localStorages';

export const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        idSidebarActive: idActiveSidebar || 1,
    },
    reducers: {
        setIdSidebarActive: (state, action) => {
            state.idSidebarActive = action.payload;
        },
    },
});
