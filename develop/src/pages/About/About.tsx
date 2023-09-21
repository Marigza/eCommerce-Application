import { Helmet } from "react-helmet";
import "./About.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";

const About: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>JustStore - About us</title>
      </Helmet>
      <main className="about-page">
        <div className="path" />
        <h1>The team of JustDevelopers</h1>
        <div className="about-page_discription">
          <p>
            Hello! We are beginning front-end developers, and although just recently we did not know
            each other, and some did not even imagine themselves as a web developer, now we are
            pleased to present our creation - JustStore, created jointly by our JustDevelopers team.
          </p>
        </div>
        <div className="about-page_team-cards">
          <div className="about-page_team-cards__card">
            <div className="card-image marina" />
            <div className="card-discription">
              <h2>Gapeyeva Marina</h2>
              <h3>Our Teamlead • Front-end Developer </h3>
              <p>
                I Graduated from the Novosibirsk State Technical University. I like reading,
                cooking, walking in the city, yoga-practice and living in a warm climate. All my
                joblife I working with deadlines, numbers, documents and people. The development
                process is like magic for me, when life appears on a blank slate: colors, shapes,
                interactivity, statistics. Now I grown up to Front-end developer, and I&apos;m not
                going to stop there
              </p>
              <h4>Contribution</h4>
              <ul>
                <li>Planning and organizing calls, documenting the results of calls</li>
                <li>In-depth work with CommerceTools</li>
                <li>Development and implementation of a product page</li>
                <li>
                  Improving and implementing functionality on the product page for working with the
                  shopping cart
                </li>
                <li>Working on mistakes</li>
                <li>Maintaining a project task table</li>
              </ul>
              <div className="card-links">
                <a href="https://github.com/Marigza" target="_blank" rel="noreferrer">
                  <GitHubIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/Marigza" target="_blank" rel="noreferrer">
                  <LinkedInIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/Marigza" target="_blank" rel="noreferrer">
                  <TelegramIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/Marigza" target="_blank" rel="noreferrer">
                  <FacebookIcon style={{ fontSize: "6vh" }} />
                </a>
              </div>
            </div>
          </div>
          <div className="about-page_team-cards__card">
            <div className="card-image maksim" />
            <div className="card-discription">
              <h2>Maksim Yukhnovich</h2>
              <h3>Front-end Developer</h3>
              <p>
                Hello, I&apos;m Maxim and I&apos;ve been purposefully learning the craft of creating
                web applications for about a year now. Just recently I turned 21, I managed to
                complete my studies in Belarus as a mechanical engineering technologist, but this
                was not where I saw myself, now I am looking for myself in the field of information
                technology and trying to settle down in a new country. I love beautiful interfaces,
                historical and philosophical literature, heavy music and long walks in the forest.
              </p>
              <h4>Contribution</h4>
              <ul>
                <li>Setting the overall design of the application</li>
                <li>In-depth work with CommerceTools</li>
                <li>
                  Development and implementation of a catalog (functionality for finding a specific
                  product)
                </li>
                <li>
                  Improving and implementing functionality on the product page for working with the
                  shopping cart
                </li>
                <li>Working on mistakes</li>
                <li>Maintaining a project task table</li>
              </ul>
              <div className="card-links">
                <a href="https://github.com/bizhluzdy" target="_blank" rel="noreferrer">
                  <GitHubIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/bizhluzdy" target="_blank" rel="noreferrer">
                  <LinkedInIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/bizhluzdy" target="_blank" rel="noreferrer">
                  <TelegramIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/bizhluzdy" target="_blank" rel="noreferrer">
                  <FacebookIcon style={{ fontSize: "6vh" }} />
                </a>
              </div>
            </div>
          </div>
          <div className="about-page_team-cards__card">
            <div className="card-image mikhail" />
            <div className="card-discription">
              <h2>Mikhail Hancharuk</h2>
              <h3>Front-end Developer</h3>
              <p>
                My name is Michael and I live in the Grodno-city, Republic of Belarus. I graduated
                from the Belarusian National Technical University, faculty &quot;Electric power
                systems and networks&quot;. I like progress, all sorts of smart things and of course
                computers . I started learning frontend development 2 years ago, and I really like
                it, especially when I have to think through and write logic, this is probably my
                favorite. At the moment I&apos;m finishing stage#2, it wasn&apos;t easy, but I got
                through with it, and I&apos;m not going to stop.
              </p>
              <h4>Contribution</h4>
              <ul>
                <li>Extensive work with CommerceTools</li>
                <li>Work with requests to the server</li>
                <li>
                  Development and implementation of a user profile and implementation of data
                  editing
                </li>
                <li>Working on a user&apos;s shopping cart</li>
                <li>Working on mistakes</li>
                <li>Maintaining a project task table</li>
              </ul>
              <div className="card-links">
                <a href="https://github.com/mikhaelHan" target="_blank" rel="noreferrer">
                  <GitHubIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/mikhaelHan" target="_blank" rel="noreferrer">
                  <LinkedInIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/mikhaelHan" target="_blank" rel="noreferrer">
                  <TelegramIcon style={{ fontSize: "6vh" }} />
                </a>
                <a href="https://github.com/mikhaelHan" target="_blank" rel="noreferrer">
                  <FacebookIcon style={{ fontSize: "6vh" }} />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="about-page_discription">
          <p>
            We communicated in our telegram chat, our discord channel, arranged regular general
            calls twice a week and irregular private calls for operational work and making
            corrections, introducing innovations.
            <br />
            <br />
            We started this exciting journey in the world of web application development from
            scratch, and thanks to our amazing mentors{" "}
            <a href="https://github.com/Rasskris" target="_blank" rel="noreferrer">
              Kristina
            </a>{" "}
            and{" "}
            <a href="https://github.com/AlenaBDE" target="_blank" rel="noreferrer">
              Alena
            </a>
            , as well as hard work and collaboration, we are moving mountains of specifications and
            achieving amazing results. So hang in there, there are still many exciting projects and
            achievements ahead in the world of front-end development!
            <br />
            <br />
            And special thanks to
            <br />
            <br />
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <div className="rs" />
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default About;
