import { Button, Card, CardActionArea, CardActions, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';


const Info = (props) => {
    const [info, setInfo] = useState();

    const {dirPath, details, hendleButtons} = props.all

  
    useEffect(() => {
        fetch(`${dirPath}/${details.name}/info`)
            .then(res => res.json())
            .then(info => setInfo(info))
    } ,[])

    return ( 
        <React.Fragment>
            <h3>Info</h3>
            <IconButton onClick={() => hendleButtons('none')}><CloseIcon /></IconButton>
            {info && <Card sx={{ maxWidth: 190, margin : 2, maxHeight : 150 , overflow : 'scroll' }}>
                <CardActionArea>
                    {Object.entries(info).map(e => <div><h4>{e[0]}:</h4><h6>{e[1]}</h6></div>)}
                </CardActionArea>
                <CardActions >
                
                </CardActions>
            </Card>}
        </React.Fragment>
     );
}
 
export default Info;