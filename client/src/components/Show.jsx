import { Button, Card, CardActionArea, CardActions, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';


const Show = (props) => {
    const [info, setInfo] = useState();

    const {dirPath, details, hendleButtons} = props.all

  
    useEffect(() => {
        fetch(`${dirPath}/${details.name}`)
            .then(res => res.json())
            .then(info => {setInfo(info); console.log(info);})
    } ,[])

    return ( 
        <React.Fragment>
            <h3>Show</h3>
            <IconButton onClick={() => hendleButtons()}><CloseIcon /></IconButton>
            {info && <Card sx={{ maxWidth: 190, margin : 2, maxHeight : 150 , overflow : 'scroll' }}>
                <CardActionArea>
                { Object.entries(info).map(e => <h5>{e[1].name}</h5>)}
                </CardActionArea>
                <CardActions >
                
                </CardActions>
            </Card>}
        </React.Fragment>
     );
}
 
export default Show;