import { TurnedInNot } from '@mui/icons-material'
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { starSetActiveNote } from '../../store/journal';


export const SideBarItem = ({ title, body, date, id ,imageUrl = []}) => {
    const dispatch = useDispatch();
    const {active} = useSelector(state=>state.journalGeneralState)
    const shortedTexts = useMemo(() => (text, type) => {
        switch (type) {
            case "title":
                return (text.length > 18)
                    ? text.substring(0, 17) + "..."
                    : text
            case "body":
                return (text.length > 30)
                    ? text.substring(0, 29) + "..."
                    : text
        }
    }, [title, body])


    const handleOnSetActiveNote = () => {
        dispatch(starSetActiveNote({ title, body, date, id, imageUrl }))
    }

    return (
        <ListItem disablePadding  >
            <ListItemButton selected={(active?.id == id)? true: false} onClick={handleOnSetActiveNote} >
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <ListItemText
                    primary={shortedTexts(title, "title")}
                    secondary={shortedTexts(body, "body")}
                    primaryTypographyProps={{
                        fontWeight: 'bold',
                        color: 'primary'
                    }}
                />
            </ListItemButton>
        </ListItem>
    )
}
