import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import React, { useState } from 'react'
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Rename from './Rename';
import Copy from './Copy';
import Delete from './Delete';
import Show from './Show';

const Folder = (props) => {
    const [actions, setActions] = useState({
        show: false,
        rename: false,
        copy: false,
        delete: false
    });
    const { details, dirPath, reset } = props;

    const hendleButtons = (action) => {
        Object.keys(actions).forEach(e => actions[e] = false)
        action ? setActions({ ...actions, [action]: !actions[action] }) :
        setActions({...actions})
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
                        <FolderOpenIcon />
                        <Typography gutterBottom variant="p" component="div">
                            {props.details.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions sx={{display : 'flex', flexWrap : 'wrap'}}>

                    {Object.keys(actions).map((e, i) => <Button sx={{fontSize : 10, margin : 0.5}}
                     variant='outlined'
                     onClick={() => hendleButtons(e)}>{e}</Button>)}
                    <Button sx={{fontSize : 10, margin : 0.5}}
                     variant='outlined'
                     onClick={() => props.enter(props.details.name)}> enter</Button>
                </CardActions>
                {actions.show && <Show  all={sunProps} />}
                {/* {actions.show && <Info />} */}
                {actions.rename && <Rename all={sunProps}/>}
                {actions.copy && <Copy all={sunProps} />}
                {actions.delete && <Delete all={sunProps}/>}
            </Card>
        </React.Fragment>
    );
}

export default Folder;