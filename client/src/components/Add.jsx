import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

const Add = (props) => {
    const [open, setOpen] = useState(true);
    const [file, setFile] = useState();
    const [newName, setNewName] = useState()

    const { handleOpenAdd, dirPath, type, reset } = props;


    const handleAdd = () => {
        const data = new FormData();
        data.append('myFile', file)
        fetch(`${dirPath}/upload`, { method: 'POST', body: data })
            .then(res => console.log(res))
            .then(handleOpenAdd('none'))
            .then(reset())
    }

    const create = () => {
        fetch(`${dirPath}/new`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newName: newName })
        })
            .then(res => console.log(res))
            .then(handleOpenAdd('none'))
            .then(reset())
    }


    return (
        <React.Fragment>
            <Dialog open={open} onClose={handleOpenAdd}>
                <DialogTitle>{type}</DialogTitle>
                <DialogContent>
                    {type == 'add' ? <input type="file" onChange={(e) => setFile(e.target.files[0])} /> :
                        <TextField label="name" variant="outlined" onChange={(e) => setNewName(e.target.value)} />}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleOpenAdd}>Cancel</Button>
                    {type == 'add' ? <Button onClick={() => handleAdd()}>Add</Button> :
                        <Button onClick={() => create()}>Create</Button>}
                </DialogActions>
            </Dialog>

        </React.Fragment>
    );
}

export default Add;