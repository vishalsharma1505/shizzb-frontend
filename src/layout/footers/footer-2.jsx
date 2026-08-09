import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
// internal
import social_data from '@/data/social-data';
import { Email, Location } from '@/svg';
import logo from '@assets/img/logo/logo.png';
import pay from '@assets/img/footer/footer-pay.png';

const FooterTwo = () => {
  return (
    <>
      <footer>
        <div className="tp-footer-area tp-footer-style-2 tp-footer-style-3 tp-footer-style-4" data-bg-color="#F5F5F5" style={{ backgroundColor: `rgb(245, 245, 245)` }}>
          <div className="tp-footer-top pt-95 pb-40">
            <div className="container">
              <div className="row">
                <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-4-1 mb-50">
                    <div className="tp-footer-logo">
                      <Link href="/">
                        <Image src={logo} alt="logo" />
                      </Link>
                    </div>
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-talk mb-20">
                        <span>Got Questions? Call us</span>
                        <h4><a href="tel:+91 7056000569">+91 7056000569</a></h4>
                      </div>
                      <div className="tp-footer-contact">
                        <div className="tp-footer-contact-item d-flex align-items-start">
                          <div className="tp-footer-contact-icon">
                            <span>
                              <Email />
                            </span>
                          </div>
                          <div className="tp-footer-contact-content">
                            <p><a href="mailto:support@support.com">support@shizzb.in</a></p>
                          </div>
                        </div>
                        <div className="tp-footer-contact-item d-flex align-items-start">
                          <div className="tp-footer-contact-icon">
                            <span>
                              <Location />
                            </span>
                          </div>
                          <div className="tp-footer-contact-content">
                            <p><a href="https://www.google.com/maps/place/Shizzb+cosmetic+office+in+faridabad/@28.4026397,77.3028245,17z/data=!4m15!1m8!3m7!1s0x390cdd32327f6cdb:0xc55d3f60a0f4be5b!2sShizzb+cosmetic+office+in+faridabad!8m2!3d28.4026738!4d77.3026647!10e1!16s%2Fg%2F11y3hrxq3q!3m5!1s0x390cdd32327f6cdb:0xc55d3f60a0f4be5b!8m2!3d28.4026738!4d77.3026647!16s%2Fg%2F11y3hrxq3q" target="_blank">79 Sleepy Hollow St. <br /> Jamaica, New York 1432</a></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6">
                  <div className="tp-footer-widget footer-col-4-2 mb-50">
                    <h4 className="tp-footer-widget-title">Quick Links</h4>
                    <div className="tp-footer-widget-content">
                      <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="register">Register</a></li>
                        <li><a href="login">Login</a></li>
                        <li><a href="faqs">FAQ's</a></li>
                        <li><a href="shop">Products</a></li>
                        <li><a href="our-stores">Store Locator</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-2 col-md-4 col-sm-5">
                  <div className="tp-footer-widget footer-col-4-3 mb-50">
                    <h4 className="tp-footer-widget-title">Infomation</h4>
                    <div className="tp-footer-widget-content">
                      <ul>
                        <li><a href="about-us">About Us</a></li>
                        <li><a href="career">Careers</a></li>
                        <li><a href="privay-policy">Privacy Policy</a></li>
                        <li><a href="terms-condition">Terms & Conditions</a></li>
                        <li><a href="blog">Blogs</a></li>
                        <li><a href="contact">Contact Us</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-7">
                  <div className="tp-footer-widget footer-col-4-4 mb-50">
                    <h4 className="tp-footer-widget-title">Subcribe.</h4>
                    <div className="tp-footer-widget-content">
                      <div className="tp-footer-subscribe">
                        <p>Our conversation is just getting started</p>
                        <div className="tp-footer-subscribe-form mb-30">
                          <form action="#">
                            <div className="tp-footer-subscribe-input">
                              <input type="email" placeholder="Enter Your Email" />
                              <button type="submit">Subscribe</button>
                            </div>
                          </form>
                        </div>
                        <div className="tp-footer-social-4 tp-footer-social">
                          <h4 className="tp-footer-social-title-4">Follow Us On</h4>
                          {social_data.map(s => <a href={s.link} key={s.id} target="_blank">
                            <i className={s.icon}></i>
                          </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="tp-footer-bottom">
            <div className="container">
              <div className="tp-footer-bottom-wrapper">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <div className="tp-footer-copyright">
                      <p>© {new Date().getFullYear()} All Rights Reserved  |  Designed By
                        <Link href="/">ThemePure</Link>.
                      </p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="tp-footer-payment text-md-end">
                      <p>
                        <Image src={pay} alt="pay" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterTwo;