import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from '../service/api';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

export const fetchAllContacts = createAsyncThunk(
    'contacts/fetchAll',
    async () => {
        return fetchContacts();
    }
);

export const addNewContact = createAsyncThunk(
    'contacts/addContact',
    async (contact) => {
        return addContact(contact);
    }
);

export const removeContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId) => {
        return deleteContact(contactId);
    }
);

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllContacts.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAllContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload;
            })
            .addCase(fetchAllContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(addNewContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addNewContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = [action.payload, ...state.items];
            })
            .addCase(addNewContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(removeContact.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(removeContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = state.items.filter((contact) => contact.id !== action.payload);
            })
            .addCase(removeContact.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const contactsReducer = contactsSlice.reducer;
