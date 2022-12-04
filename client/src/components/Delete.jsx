import { Button, Card, Dialog, DialogActions, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';


const Delete = (props) => {
    const [open, setOpen] = useState(true);


    const handleClose = () => {
        setOpen(false);
    };

    const { details, dirPath, reset, setActions } = props.all;

    const hendleSubmit = () => {
        fetch(`${dirPath}/${details.name}`, {
            method: 'DELETE'
        })
            .then(res => {
                if (res.status !== 200) {
                    alert(res.body)
                } else {
                    reset()
                }
                setActions('none')
            })
            handleClose()
    }
    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you want to delete this file?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={hendleSubmit} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Delete;