import { SaveAsOutlined, UpdateRounded, UploadFile, UploadFileOutlined } from "@mui/icons-material"
import DeleteIcon from '@mui/icons-material/Delete'
import { Typography, TextField, IconButton, Box } from "@mui/material"
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

    const handleOnDelete = () => {
        dispatch(startDeletingNote())
    }


    return (
        <Grid
            container
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ height: `calc(100vh - ${navBarHeight}px - 300px)` }}
            className='animate__animated animate__fadeIn animate__faster'
        >
            <Grid item>
                <Typography fontSize={30} fontWeight='bold' color="primary" >
                    {formatedData(formState.date)}
                </Typography>
            </Grid>

            <Grid item>
                <Button
                    style={{display: (curretNoteActive.imageUrl.length > 1)? "":"none"}}
                    onClick={() => uploadFileRef.current.click()}
                    color="secondary"
                    size="large"
                    disabled={isSaving}
                    component="label"
                    variant="contained"
                    startIcon={<UploadFileOutlined sx={{ fontSize: 24 }} />}
                    sx={{ fontSize: 16, m: 1 }}
                >
                    Upload photos
                </Button>

                <input
                    type="file"
                    multiple
                    onChange={handleOnChangeFile}
                    ref={uploadFileRef}
                    style={{ display: 'none' }}
                />

                <Button
                    disabled={isSaving}
                    onClick={handleUpdateNote}
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveAsOutlined sx={{ fontSize: 24 }} />}
                    sx={{ fontSize: 16, m: 1, color: 'white' }}
                >
                    Save
                </Button>
            </Grid>




            <Grid container sx={{ mt: 1 }}>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label='Title'
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
                    label="What happened today?"
                    placeholder="Que sucedio hoy"
                    minRows={5}
                    name="body"
                    value={formState?.body}
                    onChange={onInputChange}
                ></TextField>

            </Grid>

            {(curretNoteActive.imageUrl.length > 0) ? <ImageGallery images={curretNoteActive.imageUrl} /> :
                <Grid
                    onClick={() => uploadFileRef.current.click()}
                    container
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        border: '2px dashed #ccc',
                        borderRadius: 2,
                        height: '25vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.06)',
                        textAlign: 'center',
                        cursor: 'pointer',
                        marginTop: '10px',
                    }}
                >
                    <Grid item>
                        <UploadFileOutlined sx={{ fontSize: 50, color: 'rgba(0, 0, 0, 0.50) ' }} />
                        <Typography variant="h6" color="rgba(0, 0, 0, 0.50)">
                            Drag and drop photos here
                        </Typography>
                    </Grid>
                </Grid>}


            <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ mt: 2 }}
            >
                <Button onClick={handleOnDelete} color="error" variant="contained" size="large" startIcon={<DeleteIcon />}>
                    Delete Note
                </Button>
            </Grid>

        </Grid>
    )
}
