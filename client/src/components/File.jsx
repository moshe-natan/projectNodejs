import React, { useState } from 'react';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Info from './info';
import Rename from './Rename';
import Copy from './Copy';
import Delete from './Delete';


const File = (props) => {
    const [actions, setActions] = useState({
        info: false,
        show: false,
        rename: false,
        copy: false,
        delete: false,
        none : false
    });
    const { details, dirPath, reset } = props


    const hendleButtons = (action) => {
        Object.keys(actions).forEach(e => actions[e] = false)
        setActions({ ...actions, [action]: !actions[action] })
    }

    const sunProps = {
        details : details,
        dirPath : dirPath,
        reset : reset,
        hendleButtons : hendleButtons
    }
    return (
        <React.Fragment>
            
            <Card sx={{ maxWidth: 220, margin: 2, maxHeight : 400}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="p" component="div">
                            {details.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Button sx={{ fontSize: 10, margin: 0.5 }} onClick={() => hendleButtons('info')} variant='outlined'> info</Button>
                    <Button sx={{ fontSize: 10, margin: 0.5 }} variant='outlined'> show</Button>
                    <Button sx={{ fontSize: 10, margin: 0.5 }} onClick={() => hendleButtons('rename')} variant='outlined'> rename</Button>
                    <Button sx={{ fontSize: 10, margin: 0.5 }} onClick={() => hendleButtons('copy')} variant='outlined'> copy</Button>
                    <Button sx={{ fontSize: 10, margin: 0.5 }} onClick={() => hendleButtons('delete')} variant='outlined'> delete</Button>
                </CardActions>
                {actions.info && <Info all={sunProps} />}
                {/* {actions.show && <Info />} */}
                {actions.rename && <Rename all={sunProps}/>}
                {actions.copy && <Copy all={sunProps} />}
                {actions.delete && <Delete all={sunProps}/>}
            </Card>
        </React.Fragment>
    );
}

export default File;