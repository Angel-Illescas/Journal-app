import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: "",
        notes: [],
        active: null
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
        },
        addNewEmplyNote: (state, { payload }) => {
            state.notes.push(payload)
            state.isSaving = false
        },
        setActiveNote: (state, { payload }) => {
            state.active = payload
            state.messageSave = ""
        },
        setNotes: (state, { payload }) => {
            state.notes = payload
        },
        setSaving: (state, { payload }) => {
            state.isSaving = true;
            state.messageSave = ""

        },
        updateNote: (state, { payload }) => {
            state.isSaving = false;
            state.notes = state.notes.map((note) => {
                if (note.id == payload.id) {
                    return note = payload
                } return note
            });
            state.messageSave = `${payload.title} Actualizado correctamente`

        },
        deleteNoteById: (state, { payload }) => {
            state.notes = state.notes.filter( note=> note.id != payload)
            state.active = null

        },
        sendPhotosToActiveNote: (state, { payload }) => {
            state.active.imageUrl = [...state.active.imageUrl, ...payload]
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving=false
            state.messageSave=""
            state.notes = []
            state.active = null
        }
    }
});



export const {
    savingNewNote,
    addNewEmplyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,sendPhotosToActiveNote ,clearNotesLogout} = journalSlice.actions;