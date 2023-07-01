import LandingIcon from "../../Images/LandingIcon.png";
import Clouds from "../../Images/clouds.svg";
import FriendsLeft from "../../Images/LandingTopLeft.svg";
import FriendsRight from "../../Images/LandingTopRight.svg";
import StudyGroup from "../../Images/StudyGroup.svg";
import JustChillin from "../../Images/JustChillin.svg";
import Coach from "../../Images/Coach.svg";
import LandingBigChillin from "../../Images/LandingBigChillin.svg";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="LandingWhole">
      <div className="LandingTop">
        <div className="LandingNav">
          <div className="LandingNavIcon">
            <img src={LandingIcon} /> Discord
          </div>

          <div className="LandingNavOptions">
            <div>Download</div>
            <div>Nitro</div>
            <div>Discover</div>
            <div>Safety</div>
            <div>Support</div>
            <div>Blog</div>
            <div>Careers</div>
          </div>

          <div>
            <button className="button__rounded">Login</button>
          </div>
        </div>

        <div className="LandingTopMid">
          <h1>IMAGINE A PLACE...</h1>
          <p>
            ...where you can belong to a school club, a gaming group, or a
            worldwide art community.
            <br />
            Where just you and a handful of friends can spend time together. A
            place that makes it easy
            <br />
            to talk every day and hang out more often.
          </p>
          <div>
            <button className="button__rounded" id="LandingTopMidLeftButton">
              Download for Windows
            </button>
            <button className="button__rounded" id="LandingTopMidRightButton">
              Open Discord in your browser
            </button>
          </div>
        </div>
        <img src={Clouds} />
        <div className="LandingTopBottomPictures">
          <img src={FriendsLeft} />
          <img src={FriendsRight} />
        </div>
      </div>

      <div className="landing__sections landing__section__light">
        <img src={StudyGroup} />
        <div className="landing__sections__descriptions">
          <h1>Create an invite-only place where you belong</h1>
          <p>
            Discord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </p>
        </div>
      </div>

      <div className="landing__sections landing__section__dark">
        <div className="landing__sections__descriptions">
          <h1>Where hanging out is easy</h1>
          <p>
            Grab a seat in a voice channel when you’re free. Friends in your
            server can see you’re around and instantly pop in to talk without
            having to call.
          </p>
        </div>
        <img src={JustChillin} />
      </div>

      <div className="landing__sections landing__section__light">
        <img src={Coach} />
        <div className="landing__sections__descriptions">
          <h1>From few to a fandom</h1>
          <p>
            Get any community running with moderation tools and custom member
            access. Give members special powers, set up private channels, and
            more.
          </p>
        </div>
      </div>

      <div className="landing__big__section landing__section__dark">
        <div className="landing__big__section__description">
          <h1>RELIABLE TECH FOR STAYING CLOSE</h1>
          <p>
            Low-latency voice and video feels like you’re in the same room. Wave
            hello over video, watch friends stream their games, or gather up and
            have a drawing session with screen share.
          </p>
        </div>

        <img src={LandingBigChillin} />

        <div className="landing__big__section__bottom">
          <h3>Ready to start your journey?</h3>
          <button
            id="landing__second__download__button"
            className="button__rounded">
            Download for Windows
          </button>
        </div>
      </div>

      <div className="landing__footer__section">

        <div className="footer__links">
          <div className="landing__footer__column">
            <div>English, USA</div>
            <div>Icon1, icon2, Icon3, Icon4, Icon5</div>
          </div>

          <div className="landing__footer__column">
            <div id="landing__footer__column__top">Product</div>
            <div>Download</div>
            <div>Nitro</div>
            <div>Status</div>
          </div>

          <div className="landing__footer__column">
            <div id="landing__footer__column__top">Company</div>
            <div>About</div>
            <div>Jobs</div>
            <div>Brand</div>
            <div>Newsroom</div>
          </div>

          <div className="landing__footer__column">
            <div id="landing__footer__column__top">Resources</div>
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

          <div className="landing__footer__column">
            <div id="landing__footer__column__top">Policies</div>
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

        <div className="landing__footer__bottom">
          <div className="landing__footer__bottom__left">
            <img src={LandingIcon} />
            Discord
          </div>

          <div className="landing__footer__bottom__right">
            <button className="button__rounded">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
