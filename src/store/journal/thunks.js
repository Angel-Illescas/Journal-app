import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from './../../firebase/config';
import { addNewEmplyNote, deleteNoteById, savingNewNote, sendPhotosToActiveNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice";
import { filesUpload, loadNotes } from "../../helpers";

export const starNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote())
        const { uid } = getState().authGeneralState //OBTENEMOS EL ESTADO DE AUTH

        /* dispatch()
 */
        const newNote = {
            title: "",
            body: "",
            date: new Date().getTime(),
            imageUrl: []
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`)) //APUNTAMOS HACIA LA RUTA
        await setDoc(newDoc, newNote) //SE MANDA A LA BASE

        newNote.id = newDoc.id //Pasamos el id de la nota generada en fire a la del store 


        dispatch(addNewEmplyNote(newNote))
        dispatch(setActiveNote(newNote))

        /*  Hay que actulizar las reglas en la base en Firebase para que puedan pasar
 
         rules_version = '2';
 
             service cloud.firestore {
                 match / databases / { database } / documents {
                     match / { document=**} {
                         allow read, write: if request.auth != null;
                     }
                 }
             } */


    }
}


export const starLoadingNotes = () => {
    return async (dispatch, getState) => {

        const { uid } = getState().authGeneralState //OBTENEMOS EL ESTADO DE AUTH

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))

    }
}


export const starSetActiveNote = ({ title, body, date, id, imageUrl }) => {
    return async (dispatch) => {
        dispatch(setActiveNote({ title, body, date, id, imageUrl }))
    }
}

export const starUpdatingNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving())
        const { uid } = getState().authGeneralState
        const { active: activeNote } = getState().journalGeneralState
        const noteToFirestone = { ...activeNote }
        delete noteToFirestone.id // para no tener dos key de id en firebase
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`) //SOLO ES LA referencia
        await setDoc(docRef, noteToFirestone, { merge: true })
        dispatch(updateNote(activeNote))

    }
}

export const starUpdateImages = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving())


        const arrOfUploadsPromises = []
        for (const file of files) {
            arrOfUploadsPromises.push(filesUpload(file))
        };

        const photoUrls = await Promise.all(arrOfUploadsPromises) // De esta manera resolvemos todas las promesas al mismo tiempo, haciendo un array de promesas
        dispatch(sendPhotosToActiveNote(photoUrls))
    }
}

export const startDeletingNote = () => {
    return async (dispatch,getState) => {
        const { uid } = getState().authGeneralState
        const { active: activeNote } = getState().journalGeneralState
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`)
        const resp = await deleteDoc(docRef)

        dispatch(deleteNoteById(activeNote.id))
    }
}