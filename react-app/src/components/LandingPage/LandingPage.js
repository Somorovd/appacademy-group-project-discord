import LandingIcon from "../../Images/LandingIcon.png";
import Clouds from "../../Images/clouds.svg";
import FriendsLeft from "../../Images/LandingTopLeft.svg";
import FriendsRight from "../../Images/LandingTopRight.svg";
import StudyGroup from "../../Images/StudyGroup.svg";
import JustChillin from "../../Images/JustChillin.svg";
import Coach from "../../Images/Coach.svg";
import LandingBigChillin from "../../Images/LandingBigChillin.svg";
import "./LandingPage.css";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page__top">
        <div className="landing-page__nav">
          <div className="landing-page__nav-icon">
            <img src={LandingIcon} alt="Discord Logo" /> Discord
          </div>

          <div className="landing-page__nav-options">
            <div>Download</div>
            <div>Nitro</div>
            <div>Discover</div>
            <div>Safety</div>
            <div>Support</div>
            <div>Blog</div>
            <div>Careers</div>
          </div>

          <div className="landing-page__nav-options-button">
            <Link to="/login" className="landing-page__button--rounded">
              Login
            </Link>
          </div>

        </div>

        <div className="landing-page__top-mid">
          <h1>IMAGINE A PLACE...</h1>
          <p>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community. Where just you and a handful of friends can
            spend time together. A place that makes it easy to talk every day
            and hang out more often.
          </p>
          <div>
            <Link
              to="/login"
              className="landing-page__button--rounded"
              id="landing-page__top-mid-left-button">
              Login
            </Link>
            <Link
              to="/signup"
              className="landing-page__button--rounded"
              id="landing-page__top-mid-right-button">
              Signup
            </Link>
          </div>
        </div>
        <div className="landing-page__top-bottom-pics">
          <img className="landing-page__top-pic-left" src={FriendsLeft} />
          <img className="landing-page__top-pic-right" src={FriendsRight} />
        </div>
      </div>

      <div className="landing-page__sections landing-page__section--light">
        <img src={StudyGroup} />
        <div className="landing-page__sections-descriptions">
          <h1>Create an invite-only place where you belong</h1>
          <p>
            Discord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </p>
        </div>
      </div>

      <div className="landing-page__sections landing-page__section--dark">
        <div className="landing-page__sections-descriptions">
          <h1>Where hanging out is easy</h1>
          <p>
            Grab a seat in a voice channel when you’re free. Friends in your
            server can see you’re around and instantly pop in to talk without
            having to call.
          </p>
        </div>
        <img src={JustChillin} />
      </div>

      <div className="landing-page__sections landing-page__section--light">
        <img src={Coach} />
        <div className="landing-page__sections-descriptionss">
          <h1>From few to a fandom</h1>
          <p>
            Get any community running with moderation tools and custom member
            access. Give members special powers, set up private channels, and
            more.
          </p>
        </div>
      </div>

      <div className="landing-page__big-section landing-page__section--dark">
        <div className="landing-page__big-section-description">
          <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
          <p>
            Low-latency voice and video feels like you’re in the same room. Wave
            hello over video, watch friends stream their games, or gather up and
            have a drawing session with screen share.
          </p>
        </div>

        <img src={LandingBigChillin} />

        <div className="landing-page__big-section-bottom">
          <h3>Ready to start your journey?</h3>
          <button
            id="landing-page__second-download-button"
            className="landing-page__button--rounded">
            Download for Windows
          </button>
        </div>
      </div>

      <div className="landing-page__footer-section">
        <div className="landing-page__footer-links">
          <div className="landing-page__footer-column">
            <div>English, USA</div>
            <div>Icon1, icon2, Icon3, Icon4, Icon5</div>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Product</div>
            <div>Download</div>
            <div>Nitro</div>
            <div>Status</div>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Company</div>
            <div>About</div>
            <div>Jobs</div>
            <div>Brand</div>
            <div>Newsroom</div>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Resources</div>
            <div>College</div>
            <div>Support</div>
            <div>Safety</div>
            <div>Blog</div>
            <div>Feedback</div>
            <div>Build</div>
            <div>StreamKit</div>
            <div>Creators</div>
            <div>Community</div>
            <div>Official 3rd Party Merch</div>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Policies</div>
            <div>Terms</div>
            <div>Privacy</div>
            <div>Cookie Settings</div>
            <div>Guidelines</div>
            <div>Acknowledgements</div>
            <div>Licenses</div>
            <div>Moderation</div>
            <div>Company Information</div>
          </div>
        </div>

        <div className="landing-page__footer-bottom">
          <div className="landing__footer__bottom__left">
            <img src={LandingIcon} />
            Discord
          </div>

          <div className="landing-page__footer-bottom-right">
            <button className="landing-page__button--rounded">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
