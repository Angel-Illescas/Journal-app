import { SaveAsOutlined, UpdateRounded, UploadFile, UploadFileOutlined } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete'
import { Typography, TextField, IconButton } from "@mui/material"
import { Grid } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from './../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { setActiveNote, startDeletingNote, starUpdateImages, starUpdatingNote } from "../../store/journal";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import Button from '@mui/material/Button'

const navBarHeight = 64



export const NoteView = () => {

    const dispatch = useDispatch()
    const { active: curretNoteActive, messageSave, isSaving } = useSelector(state => state.journalGeneralState)
    const { formState, onInputChange } = useForm(curretNoteActive)
    const uploadFileRef = useRef()

    const formatedData = (date) => {
        const newDate = new Date(date)
        return newDate.toUTCString()
    }

    useEffect(() => {
        dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
        if (messageSave.length > 0) {
            Swal.fire('Nota actualizada', messageSave, 'success')
        }
    }, [messageSave])


    const handleUpdateNote = () => {
        dispatch(starUpdatingNote())
    }

    const handleOnChangeFile = ({ target }) => {

        if (target.files === 0) { return }
        dispatch(starUpdateImages(target.files))

    }

    const handleOnDelete = ()=>{
        dispatch(startDeletingNote())
    }


    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ height: `calc(100% - ${navBarHeight}px)` }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={40} fontWeight='bold' color="primary" >
                    {formatedData(formState.date)}
                </Typography>
            </Grid>



            <Grid item >

                <Button
                    onClick={() => uploadFileRef.current.click()}
                    color="success"
                    size="large"
                    disabled={isSaving}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<UploadFileOutlined />}
                >Subir Fotografías</Button>

                <input
                    type="file"
                    multiple
                    onChange={handleOnChangeFile}
                    ref={uploadFileRef}
                    style={{ display: 'none' }}
                />


                <Button disabled={isSaving} onClick={handleUpdateNote} variant="contained" color="primary" sx={{ m: 2 }}> <SaveAsOutlined sx={{ fontSize: 30, mr: 1 }} /> Guardar</Button>
                
            </Grid>



            <Grid container sx={{ mt: 1 }}>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Titulo'
                    sx={{ border: 'none', mb: 1 }}
                    name="title"
                    value={formState?.title}
                    onChange={onInputChange}
                ></TextField>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="Que sucedio hoy"
                    minRows={5}
                    name="body"
                    value={formState?.body}
                    onChange={onInputChange}
                ></TextField>

            </Grid>

            <ImageGallery images={curretNoteActive.imageUrl} />

            <Button onClick={handleOnDelete} color="error" variant="contained" size="large" startIcon={<DeleteIcon />}>
                    Eliminar nota
                </Button>

        </Grid>
    )
}
