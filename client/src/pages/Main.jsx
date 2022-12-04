import React, { useEffect, useState } from 'react';
import File from '../components/File'
import Folder from '../components/Folder';
import '../app.css'
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Fab, IconButton } from '@mui/material';
import Add from '../components/Add';


const Main = () => {
    const [data, setData] = useState()
    const [dirPath, setDirPath] = useState('http://localhost:5000/items');
    const [openAdd, setOpenAdd] = useState({isOpen : false, type : null})

    const navigate = useNavigate()

    
    useEffect(() => {
        navigate('/items')
        fetch(dirPath)
            .then(res => res.json())
            .then(data => { setData(data); console.log(data); })
    }, []);

    const setTheData = (name) => {
        const newDirPath = name ? `${dirPath}/${name}` : dirPath
        setDirPath(newDirPath)
        fetch(newDirPath)
            .then(res => res.json())
            .then(data => { setData(data); console.log(data); })
            .then(navigate(name))
    }

    const handleOpenAdd = (type) => {
        setOpenAdd({isOpen : !openAdd.isOpen, type : type})
    }

    return (
        <React.Fragment>
            <div className='itemsContaner'>
                <Fab color="primary" aria-label="add" onClick={() => handleOpenAdd('add')}>
                    add
                    <AddIcon />
                </Fab>
                <Fab color="primary" aria-label="add" onClick={() => handleOpenAdd('new')}>
                    new
                    <AddIcon />
                </Fab>
                {openAdd.isOpen && <Add handleOpenAdd={handleOpenAdd} dirPath={dirPath} type={openAdd.type} reset={setTheData}/>}
                {data && data.map((e, i) => e.name.indexOf('.') > 0 ?
                    <File key={i} details={e} dirPath={dirPath} reset={setTheData} /> :
                    <Folder key={i} details={e} dirPath={dirPath} enter={setTheData} />)}


            </div>

        </React.Fragment>
    );
}

export default Main;