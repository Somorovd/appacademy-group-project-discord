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
            <img src={LandingIcon} alt="Discord Logo" /> Concord
          </div>

          <div className="landing-page__nav-options">
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/CSS">CSS <i class="fa-brands fa-css3-alt"></i></a>
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTML">HTML <i class="fa-brands fa-html5"></i></a>
            <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript">JS <i class="fa-brands fa-js"></i></a>
            <a target="_blank" href="https://react.dev/">React <i class="fa-brands fa-react"></i></a>
            <a target="_blank" href="https://www.python.org/">Python <i class="fa-brands fa-python"></i></a>
            <a target="_blank" href="https://flask.palletsprojects.com/en/2.3.x/">Flask <i class="fa-solid fa-flask"></i></a>
            <a target="_blank" href="https://redux.js.org/">Redux <i class="fa-solid fa-atom"></i></a>
          </div>

          <div className="landing-page__nav-options-button">
            <Link to="/login" className="landing-page__button--rounded">
              Login
            </Link>
          </div>

        </div>

        <div className="landing-page__top-mid">
          <h1>IMAGINE A PLACE...</h1>
          <p className="landing-page__paragraph">
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

      </div>

      <div className="landing-page__footer-section">
        <div className="landing-page__footer-links">

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Daniel Somorov</div>
            <a className="landing-page__personal" target="_blank" href="https://github.com/Somorovd">Github</a>
            <a className="landing-page__personal" target="_blank" href="https://www.linkedin.com/in/daniel-somorov-05705313b/">LinkedIn</a>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Edward Huffstetler</div>
            <a className="landing-page__personal" target="_blank" href="https://github.com/Edward932">Github</a>
            <a className="landing-page__personal" target="_blank" href="https://www.linkedin.com/in/edwardhuffstetler/">LinkedIn</a>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Christian Spada</div>
            <a className="landing-page__personal" target="_blank" href="https://github.com/christian-spada">Github</a>
            <a className="landing-page__personal" target="_blank" href="https://www.linkedin.com/in/christian-s-82a24a23b/">LinkedIn</a>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Ruben Ramirez</div>
            <a className="landing-page__personal" target="_blank" href="https://github.com/RubenRamirez12">Github</a>
            <a className="landing-page__personal" target="_blank" href="https://www.linkedin.com/in/ruben-ramirez-64a6a7265/">LinkedIn</a>
          </div>
        </div>

        <div className="landing-page__footer-bottom">
          <div className="landing__footer__bottom__left">
            <img src={LandingIcon} />
            Concord
          </div>

          <div className="landing-page__footer-bottom-right">
          <Link
              to="/signup"
              className="landing-page__button--rounded"
              id="landing-page__bottom-button">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
