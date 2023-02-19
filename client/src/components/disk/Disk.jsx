import GoBackButton from '../../assets/img/go-back.png'
import CreateDirButton from '../../assets/img/create-dir.png'
import UploadFileButton from '../../assets/img/upload-file.png'

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import FileList from "./fileList/FileList";
import Popup from './Popup';
import Uploader from './uploader/Uploader';


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFiles, searchFiles, uploadFile } from "../../actions/file";
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer';
import { showLoader } from '../../reducers/loaderReducer';

import './disk.scss';
import sizeFormat from '../../utils/input/sizeFormat';





const Disk = () => {
    const dispatch = useDispatch();

    const currentDir = useSelector(state => state.files.currentDir);
    const dirStack = useSelector(state => state.files.dirStack);
    const currentUser = useSelector(state => state.user.currentUser)

    const [dragEnter, setDragEnter] = useState(false);
    const [sort, setSort] = useState('');
    const [search, setSearch] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(false);

    const sortByName = () => {
        setSort('name');
    }

    const sortByDate = () => {
        setSort('date');
    }

    const sortBySize = () => {
        setSort('size');
    }

    useEffect(() => {
        dispatch(getFiles(currentDir, sort));
        
            
        
    }, [currentDir, sort])

    const showPopupMenu = () => {
        dispatch(setPopupDisplay('flex'));
        
    }

    const backClick = () => {
        const backDirId = dirStack.pop();
        dispatch(setCurrentDir(backDirId));
    }

    const fileUpload = (event) => {
        const files = [...event.target.files];

        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        
    }

    const dragEnterHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(true);
    }

    const dragLeaveHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setDragEnter(false);
    }

    const dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();
        let files = [...event.dataTransfer.files];
        files.forEach(file => dispatch(uploadFile(file, currentDir)));
        setDragEnter(false);
    }

    const searchChangeInput = (event) => {
        setSearch(event.target.value);
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout);
        }
        dispatch(showLoader());
        if (event.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(searchFiles(value));
            }, 500, event.target.value))
        }
        else {
            dispatch(getFiles(currentDir));
        }

    }

   


    return (!dragEnter ?
        <div
            className="disk"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
        >
            <div className="disk__navbar">
                <div className="navbar-items">

                    {currentDir && <img
                        src={GoBackButton}
                        className="navbar-items__back"
                        alt='Go back'
                        onClick={() => backClick()}
                        draggable={false}
                    />}
                    <img
                        src={CreateDirButton}
                        className="navbar-items__show-popup"
                        alt='Create file'
                        onClick={() => showPopupMenu()}
                        draggable={false}
                        title='Create new folder'
                    />
                    <label htmlFor="navbar-items__upload-file">
                        <img
                            src={UploadFileButton}
                            alt=""
                            className='navbar-items__upload-file'
                            draggable={false}
                            title='Upload file'
                        />
                    </label>
                    <input
                        type="file"
                        multiple={true}
                        onChange={(event) => fileUpload(event)}
                        id='navbar-items__upload-file'
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="navbar-serachblock">
                    <input
                        value={search}
                        onChange={event => searchChangeInput(event)}
                        type='text'
                        placeholder='Search...'
                    />

                </div>
                <div className="navbar-progress-bar">
                    <div
                        className='circular-progress-bar'
                        style={{ width: 50, height: 50, fontWeight: 600}}
                        title={`${sizeFormat(currentUser.usedSpace)}/10GB`}
                        
                    >
                        <CircularProgressbar
                            maxValue={10737418240}
                            value={currentUser.usedSpace}
                            text='Used space'
                            strokeWidth={9}
                            
                            styles={
                                buildStyles({
                                    textSize: '15px'
                                    
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <FileList
                sortByDate={sortByDate}
                sortByName={sortByName}
                sortBySize={sortBySize}
                sort={sort}
            />
            <Popup />
            <Uploader />

        </div>
        :
        <div
            className="drag-block"
            onDragEnter={dragEnterHandler}
            onDragLeave={dragLeaveHandler}
            onDragOver={dragEnterHandler}
            onDrop={dropHandler}
        >
            Move file here
        </div>
    );
}

export default Disk;