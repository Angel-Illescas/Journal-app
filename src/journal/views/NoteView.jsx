import { SaveAsOutlined, UpdateRounded, UploadFileOutlined } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, TextField, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from './../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setActiveNote, startDeletingNote, starUpdateImages, starUpdatingNote } from "../../store/journal";
import 'sweetalert2/dist/sweetalert2.css';

const navBarHeight = 64;

export const NoteView = () => {
    const dispatch = useDispatch();
    const { active: curretNoteActive, messageSave, isSaving } = useSelector(state => state.journalGeneralState);
    const { formState, onInputChange } = useForm(curretNoteActive);
    const uploadFileRef = useRef();

    const [openDialog, setOpenDialog] = useState(false);

    const formatedData = (date) => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    };

    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if (messageSave.length > 0) {
            setOpenDialog(true);
        }
    }, [messageSave]);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdateNote = () => {
        dispatch(starUpdatingNote());
    };

    const handleOnChangeFile = ({ target }) => {
        if (target.files.length === 0) return;
        dispatch(starUpdateImages(target.files));
    };

    const handleOnDelete = () => {
        dispatch(startDeletingNote());
    };

    return (
        <>
            <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{ height: `calc(100vh - ${navBarHeight}px - 300px)` }}
                className='animate__animated animate__fadeIn animate__faster'
            >
                <Grid item>
                    <Typography fontSize={30} fontWeight='bold' color="primary">
                        {formatedData(formState.date)}
                    </Typography>
                </Grid>

                <Grid item>
                    <Button
                        style={{ display: (curretNoteActive.imageUrl.length > 0) ? "" : "none" }}
                        onClick={() => uploadFileRef.current.click()}
                        color="secondary"
                        size="large"
                        disabled={isSaving}
                        component="label"
                        variant="contained"
                        startIcon={<UploadFileOutlined sx={{ fontSize: 24 }} />}
                        sx={{ fontSize: 16, m: 1,fontWeight:'600' }}
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
                        sx={{ fontSize: 16, m: 1, color: 'white',fontWeight:'600' }}
                    >
                        Save
                    </Button>
                </Grid>

                <Grid container sx={{ mt: 1 }}>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Type your title"
                        label='Title'
                        sx={{ border: 'none', mb: 1 }}
                        name="title"
                        value={formState?.title}
                        onChange={onInputChange}
                    />
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        label="What happened today?"
                        placeholder="What happened today?"
                        minRows={5}
                        name="body"
                        value={formState?.body}
                        onChange={onInputChange}
                    />
                </Grid>

                {(curretNoteActive.imageUrl.length > 0) ? (
                    <ImageGallery images={curretNoteActive.imageUrl} />
                ) : (
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
                            <UploadFileOutlined sx={{ fontSize: 50, color: 'rgba(0, 0, 0, 0.50)' }} />
                            <Typography variant="h6" color="rgba(0, 0, 0, 0.50)">
                                Drag and drop photos here
                            </Typography>
                        </Grid>
                    </Grid>
                )}

                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mt: 2 }}
                >
                    <Button onClick={handleOnDelete} sx={{fontWeight:'600'}} color="error" variant="contained" size="large" startIcon={<DeleteIcon />}>
                        Delete Note
                    </Button>
                </Grid>

            </Grid>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
            >
                <DialogTitle color="primary.main">Note Update</DialogTitle>
                <DialogContent>
                    <Typography >{messageSave}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} variant="contained" size="large" color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
