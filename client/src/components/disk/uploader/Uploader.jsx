import closeButton from '../../../assets/img/close.svg'

import UploadFile from './UploadFile';


import './uploader.scss'
import { useDispatch, useSelector } from 'react-redux';
import { hideUploader } from '../../../reducers/uploadReducer';

const Uploader = () => {
    const files = useSelector(state => state.upload.files);
    const isVisible = useSelector(state => state.upload.isVisible);
    const dispatch = useDispatch();
    
    return ( 
        isVisible &&
        <div className="uploader">
            <div className="uploader__header">
                <div className="uploader__title">Downloads</div>
                <img 
                    src={closeButton} 
                    onClick={() => dispatch(hideUploader())}
                    className='uploader__close-btn' 
                    alt="Close button" 
                />
            </div>

            {files.map(file => <UploadFile key={file.id} file={file}/>)}
        </div>
     );
}
 
export default Uploader;