import { Button, Card, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';


const Rename = (props) => {
    const [newName, setNewName] = useState()
    const { file, dirPath, reset, hendleButtons } = props.all;

    const hendleSubmit = () => {
        console.log(newName);
        fetch(`${dirPath}/${file.name}/rename`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' }, 
            body: JSON.stringify({ newName: newName })
        })
            .then(res => {
                if (res.status !== 200) {
                    alert(res.body)
                } else {
                    reset()
                }
                hendleButtons('none')
            })
    }
    return (
        <React.Fragment>
            <Card>
                <h3>Rename</h3>
                <IconButton onClick={() => hendleButtons('none')}><CloseIcon /></IconButton>
                <TextField label="Outlined" variant="outlined" onChange={(e) => setNewName(e.target.value)} />
                <Button variant="contained" onClick={hendleSubmit}>Rename</Button>
            </Card>
        </React.Fragment>
    );
}

export default Rename;