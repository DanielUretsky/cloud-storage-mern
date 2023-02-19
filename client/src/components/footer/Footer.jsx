import Input from '../../utils/input/Input';

import facebookLogo from '../../assets/img/facebook.png';
import linkedinLogo from '../../assets/img/linkedin.png';
import instagramLogo from '../../assets/img/instagram.png';
import Logo from '../../assets/img/navbar-logo.svg'

import './footer.scss';


const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__image">
                <img src={Logo} alt="" />
            </div>
            <div className="footer__info">
                <div className="footer__subscribe">
                    <Input type='text' placeholder='Your E-mail' />
                    <button className='btn--send'>Subscribe Now!</button>
                </div>
                <div className="footer__navbar">
                    <div className="footer__navbar--partnership">
                        <h3>Partnership</h3>
                        <ul>
                            <li>Websites</li>
                            <li>Social Media</li>
                            <li>Branding</li>
                        </ul>
                    </div>
                    <div className="footer__navbar--about">
                        <h3>About</h3>
                        <ul>
                            <li>Our Projects</li>
                            <li>Careers</li>
                        </ul>
                    </div>
                    <div className="footer__navbar--support">
                        <h3>Support</h3>
                        <ul>
                            <li>Support Request</li>
                            <li>Contact us</li>
                        </ul>
                    </div>
                </div>

                <div className="footer__social">
                    <p>© All rights reserved 2022</p>
                    <div className="footer__social--links">
                        <a href="https://www.facebook.com/profile.php?id=100064627794296"><img className='facebook-logo' src={facebookLogo} alt="Facebook" /></a>
                        <a href="https://www.linkedin.com/in/daniel-uretsky/"><img className='linkedin-logo' src={linkedinLogo} alt="LinkedIn" /></a>
                        <a href="https://www.instagram.com/ur.fias/"><img className='instagram-logo' src={instagramLogo} alt="Instagram" /></a>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Footer;