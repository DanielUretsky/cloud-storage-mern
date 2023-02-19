import protectionImg from '../../assets/img/Homepage/protection.png';
import filesTypeImg from '../../assets/img/Homepage/files-type.png';
import devicesImg from '../../assets/img/Homepage/any-devices-access.png';
import shareImg from '../../assets/img/Homepage/share.png';
import securityImg from '../../assets/img/Homepage/security.png';
import cardCloudImg from '../../assets/img/Homepage/cloud-white.png'


import './homepage.scss'

const HomePage = () => {
    return (
        <div className='home-page-wrapper'>
            <div className="greetings-block">
                <div className="greetings-block__header">

                    <h1>Welcome to <span>Cloudy :)</span> Your Reliable Cloud Storage Solution!</h1>
                </div>


            </div>
            <div className="introduction-block">
                <div className="introduction-block-left">

                    <img src={protectionImg} alt="" />
                </div>
                <div className="introduction-block-right">
                    <div className="introduction-block-right__text">
                        <p>Say goodbye to limited storage and the hassle of managing physical drives. With Cloudy, you can store and access your files from anywhere, at any time. Our advanced cloud storage technology offers a secure, fast and easy-to-use platform for all your storage needs.</p>
                    </div>
                </div>
            </div>
            <div className="possibilities-block">
                <div className="possibilities-block__header">
                    <p>With Cloudy you can:</p>
                </div>
                <div className='possibilities-block__files'>
                    <img src={filesTypeImg} alt="" />
                    <p>1. Store unlimited files, including photos, videos, documents, and more.</p>
                </div>
                <div className='possibilities-block__devices'>
                    <p>2. Access your files from any device, including desktop, laptop, tablet and smartphone.</p>
                    <img src={devicesImg} alt="" />
                </div>
                <div className='possibilities-block__share'>
                    <img src={shareImg} alt="" />
                    <p>3. Share your files with friends and colleagues with just a few clicks.</p>
                </div>
                <div className='possibilities-block__security'>
                    <p>4. Enjoy peace of mind knowing your files are secure with our state-of-the-art security measures.</p>
                    <img src={securityImg} alt="" />
                </div>
            </div>
            <div className="starting-block">
                <div className="starting-block__text">

                </div>
                <div className="starting-block__cards">
                    <div className="card card-1">
                        <div className="card__icon"><img src={cardCloudImg} alt="" /></div>
                        <h2 className="card__title">Start enjoying the benefits of cloud storage with Cloudy :) today! Sign up now and get started with 10GB of free storage. Upgrade to a premium plan for even more storage and advanced features.</h2>
                        <p className="card__link" href="#">Sign up for free!</p>
                    </div>

                    
                </div>
                
            </div>
        </div>
    );
}

export default HomePage;