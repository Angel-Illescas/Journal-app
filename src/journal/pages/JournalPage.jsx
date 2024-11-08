import { IconButton, Typography } from "@mui/material"
import { JournalLayout } from './../layout/JournalLayout';
import { NoteView, NothingSelectedView } from "../views";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { starNewNote } from "../../store/journal";

export const JournalPage = () => {

  const {isSaving,active} = useSelector(state=>state.journalGeneralState)
  const dispatch = useDispatch()


  const handleOnNewNote = ()=>{
    dispatch(starNewNote())
  }

  return (
    <JournalLayout>
      {(!!active)
      ?<NoteView/>
      :<NothingSelectedView/>
      }
      <IconButton
        onClick={handleOnNewNote}
        disabled={isSaving}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'secondary.main',
          ':hover': { backgroundColor: 'secondary.alt', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  )
}
