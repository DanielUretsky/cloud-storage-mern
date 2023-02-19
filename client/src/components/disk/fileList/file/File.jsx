import FolderLogo from '../../../../assets/img/folder.png';
import FileLogo from '../../../../assets/img/file.png';
import downloadLogo from '../../../../assets/img/download.png';
import deleteLogo from '../../../../assets/img/delete.png';

import sizeFormat from '../../../../utils/input/sizeFormat';

import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer';

import { useDispatch, useSelector } from 'react-redux';

import { deleteFile, downloadFile } from '../../../../actions/file';

import './file.scss'

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    const openDir = (file) => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    const downloadFileClick = (event) => {
        event.stopPropagation();
        downloadFile(file);
    }

    function deleteFileClick(event) {
        event.stopPropagation();
        dispatch(deleteFile(file))
    }

    return (
        <div className="file">
            <img
                src={file.type === 'dir' ? FolderLogo : FileLogo}
                onClick={() => openDir(file)}
                alt="file"
                className="file__img"
                draggable={false}
            />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            <img 
                className='file__icon-controllers file__download' 
                onClick={(event) => downloadFileClick(event)} 
                src={downloadLogo} alt="download file button"
                draggable={false} 
            />
            <img 
                className='file__icon-controllers file__delete' 
                onClick={(event) => deleteFileClick(event)} 
                src={deleteLogo} alt="delete file button" 
                draggable={false}
                
            />
        </div>
         
        
    );
}

export default File;
