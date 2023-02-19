import File from './file/File';

import upArrowImg from '../../../assets/img/up-arrow.png'
import downArrowImg from '../../../assets/img/down-arrow.png'
import noFilesImg from '../../../assets/img/no-files.png'



import { useSelector } from 'react-redux';

import './filelist.scss'

const FileList = ({ sortByName, sortByDate, sortBySize, sort }) => {

    const files = useSelector(state => state.files.files);
    const loader = useSelector(state => state.loader.loader);


    if (loader) {
        return (
            <div className="loader-wrapper">
                <div className="lds-facebook"><div></div><div></div><div></div></div>
            </div>
        )
    }

    if (files.length === 0) {
        return (
            <div className="no-files-block">
                <div className="no-files-block__items">
                    <img src={noFilesImg} alt="" />
                    <h1>No files found</h1>
                </div>
            </div>
        )
    }
    return (
        <div className="filelist">
            <div className="filelist__header">
                <div className="filelist__name">
                    Name
                    <img
                        className='filelist__sort-image'
                        src={sort === 'name' ? upArrowImg : downArrowImg} alt=""
                        onClick={() => sortByName()}
                        draggable={false}
                    />
                </div>
                <div className="filelist__date">
                    Date
                    <img
                        className='filelist__sort-image'
                        src={sort === 'date' ? upArrowImg : downArrowImg} alt=""
                        onClick={() => sortByDate()}
                        draggable={false}
                    />
                </div>
                <div className="filelist__size">
                    Size
                    <img
                        className='filelist__sort-image'
                        src={sort === 'size' ? upArrowImg : downArrowImg} alt=""
                        onClick={(e) => sortBySize(e)}
                        draggable={false}
                    />
                </div>
            </div>
            
                {files.map(file =>
                    
                        <File file={file} key={file._id}/>
                   
                )}
            
        </div>
    );
}

export default FileList;