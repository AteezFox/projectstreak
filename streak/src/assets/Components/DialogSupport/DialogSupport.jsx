import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, TextareaAutosize } from '@mui/material';
import './dialog.module.style.css';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function FloatingButtonDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const toggleDialog = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    return (
        <>
            <button className="floatingButton" onClick={toggleDialog}>
                <QuestionMarkIcon />
            </button>
            <Dialog open={isDialogOpen} onClose={toggleDialog} classes={{ paper: 'dialog' }}>
                <DialogTitle>Kérdésed van?</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        placeholder="Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        className="inputField"
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        placeholder="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        className="inputField"
                    />
                    <TextareaAutosize
                        id="message"
                        placeholder="Message"
                        minRows={5}
                        maxRows={10}
                        className="inputField"
                    />
                </DialogContent>
                <DialogActions className={"buttons"}>
                    <Button onClick={toggleDialog} className={"close"}>Bezárás</Button>
                    <Button onClick={toggleDialog} className={"send"}>Küldés</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}