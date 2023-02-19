import CloseButton from '../../assets/img/close.svg';

import Input from "../../utils/input/Input";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPopupDisplay } from '../../reducers/fileReducer';
import { createDir } from "../../actions/file";


const Popup = () => {
    const [dirName, setDirName] = useState('');

    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);

    const dispatch = useDispatch();

    const createDirHandler = () => {
        dispatch(createDir(currentDir, dirName));
        dispatch(setPopupDisplay('none'));
        
        setDirName('');
    }
    return (
        <div
            className="popup"
            onClick={() => dispatch(setPopupDisplay('none'))}
            style={{ display: popupDisplay }}
        >
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">
                        <h1>Create new folder</h1>
                    </div>
                    <img
                        className='popup__close-btn'
                        onClick={() => dispatch(setPopupDisplay('none'))}
                        src={CloseButton}
                        alt="Close"
                    />
                </div>
                <Input
                    type="text"
                    placeholder="Enter folder name"
                    value={dirName}
                    setValue={setDirName}
                />
                <button onClick={() => createDirHandler()} className='popup__create-dir-btn'>Create folder</button>
            </div>
        </div>
    );
}

export default Popup;