import FriendsLeft from '../../Images/LandingTopLeft.svg';
import FriendsRight from '../../Images/LandingTopRight.svg';
import StudyGroup from '../../Images/StudyGroup.svg';
import JustChillin from '../../Images/JustChillin.svg';
import Coach from '../../Images/Coach.svg';
import LandingBigChillin from '../../Images/LandingBigChillin.svg';
import './LandingPage.css';
import { Link } from 'react-router-dom';
import discord from '../../Images/discord-mark-white.svg';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-page__top">
        <div className="landing-page__nav">
          <div className="landing-page__nav-icon">
            <img
              src={discord}
              alt="Discord Logo"
              className="landing-page__logo"
            />{' '}
            Concord
          </div>

          <div className="landing-page__nav-options">
            <a
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/CSS"
            >
              CSS <i class="fa-brands fa-css3-alt"></i>
            </a>
            <a
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/HTML"
            >
              HTML <i class="fa-brands fa-html5"></i>
            </a>
            <a
              target="_blank"
              href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
            >
              JS <i class="fa-brands fa-js"></i>
            </a>
            <a
              target="_blank"
              href="https://react.dev/"
            >
              React <i class="fa-brands fa-react"></i>
            </a>
            <a
              target="_blank"
              href="https://www.python.org/"
            >
              Python <i class="fa-brands fa-python"></i>
            </a>
            <a
              target="_blank"
              href="https://flask.palletsprojects.com/en/2.3.x/"
            >
              Flask <i class="fa-solid fa-flask"></i>
            </a>
            <a
              target="_blank"
              href="https://redux.js.org/"
            >
              Redux <i class="fa-solid fa-atom"></i>
            </a>
          </div>

          <div>
            <a
              href="#personal-links"
              className="landing-page__connect"
            >
              Connect With Us
            </a>
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
              id="landing-page__top-mid-left-button"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="landing-page__button--rounded"
              id="landing-page__top-mid-right-button"
            >
              Signup
            </Link>
          </div>
        </div>
        <img
          className="landing-page__top-friends-left"
          src={FriendsLeft}
        />
        <img
          className="landing-page__top-friends-right"
          src={FriendsRight}
        />
      </div>

      <div className="landing-page__sections landing-page__section--light">
        <img src={StudyGroup} />
        <div className="landing-page__sections-descriptions">
          <h1 className="landing-page__section-header">
            Create an invite-only place where you belong
          </h1>
          <p className="landing-page__section-text">
            Concord servers are organized into topic-based channels where you
            can collaborate, share, and just talk about your day without
            clogging up a group chat.
          </p>
        </div>
      </div>

      <div className="landing-page__sections landing-page__section--dark">
        <div className="landing-page__sections-descriptions">
          <h1 className="landing-page__section-header">
            Where hanging out is easy
          </h1>
          <p className="landing-page__section-text">
            Grab a seat in a voice channel when you’re free. Friends in your
            server can see you’re around and instantly pop in to talk without
            having to call.
          </p>
        </div>
        <img src={JustChillin} />
      </div>

      <div className="landing-page__sections landing-page__section--light">
        <img src={Coach} />
        <div className="landing-page__sections-descriptions">
          <h1 className="landing-page__section-header">From few to a fandom</h1>
          <p className="landing-page__section-text">
            Get any community running with moderation tools and custom member
            access. Give members special powers, set up private channels, and
            more.
          </p>
        </div>
      </div>

      <div className="landing-page__big-section landing-page__section--dark">
        <div className="landing-page__big-section-description">
          <h1 className="landing-page__section-header font-wide">
            RELIABLE TECH FOR STAYING CLOSE
          </h1>
          <p className="landing-page__section-text">
            Low-latency voice and video feels like you’re in the same room. Wave
            hello over video, watch friends stream their games, or gather up and
            have a drawing session with screen share.
          </p>
        </div>

        <img src={LandingBigChillin} />
      </div>

      <div className="landing-page__footer-section">
        <div
          id="personal-links"
          className="landing-page__footer-links"
        >
          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Daniel Somorov</div>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://github.com/Somorovd"
            >
              <i className="fa-brands fa-github"></i>
              Github
            </a>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://www.linkedin.com/in/daniel-somorov-05705313b/"
            >
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </a>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Edward Huffstetler</div>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://github.com/Edward932"
            >
              <i className="fa-brands fa-github"></i>
              Github
            </a>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://www.linkedin.com/in/edwardhuffstetler/"
            >
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </a>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Christian Spada</div>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://github.com/christian-spada"
            >
              <i className="fa-brands fa-github"></i>
              Github
            </a>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://www.linkedin.com/in/christian-s-82a24a23b/"
            >
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </a>
          </div>

          <div className="landing-page__footer-column">
            <div id="landing-page__footer-column-top">Ruben Ramirez</div>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://github.com/RubenRamirez12"
            >
              <i className="fa-brands fa-github"></i>
              Github
            </a>
            <a
              className="landing-page__personal"
              target="_blank"
              href="https://www.linkedin.com/in/ruben-ramirez-64a6a7265/"
            >
              <i className="fa-brands fa-linkedin"></i>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="landing-page__footer-bottom">
          <div className="landing__footer__bottom__left">
            <img
              src={discord}
              alt="Discord Logo"
              className="landing-page__logo-bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
