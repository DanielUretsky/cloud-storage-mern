import closeButton from '../../../assets/img/close.svg'

import { removeUploadFile } from '../../../reducers/uploadReducer';

import { useDispatch } from 'react-redux'

import './uploader.scss'

const UploadFile = ({file}) => {
    const dispatch = useDispatch();
    return ( 
        <div className="upload-file">
            <div className="upload-file__header">
                <div className="upload-file__title">{file.name}</div>
                <img 
                    className='upload-file__close-btn' 
                    onClick={() => dispatch(removeUploadFile(file.id))}
                    src={closeButton} 
                    alt="Close button" 
                />
            </div>
            <div className="upload-file__progress-bar">
                <div className="upload-file__upload-bar" style={{width: file.progress + '%'}}></div>
                <div className="upload-file__percent">{file.progress}%</div>
            </div>
        </div>
     );
}
 
export default UploadFile;