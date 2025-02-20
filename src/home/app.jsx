import { useState, useEffect } from "react";
import AISwiper from "../components/decorations/decoration";
import "./app.css";
import { TbPhotoScan } from "react-icons/tb";
import { ImStatsDots } from "react-icons/im";
import { LuBrain } from "react-icons/lu";
import { FaRegLightbulb } from "react-icons/fa";
import { GiServerRack } from "react-icons/gi";
import { logs, heros } from "../mocks/ai";
import hacking from "../assets/KNNm.gif";
import analyis from "../assets/analyis.gif";
import CountUp from "react-countup";

export const App = () => {
  const [logsData, setLogsData] = useState(logs);
  const [herosAnalysis, setHerosAnalysis] = useState([95, 65, 75, 35]);
  const [herosAnalysisBefore, setHerosAnalysisBefore] = useState([
    95, 65, 75, 35,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const firstLog = logsData[0].text;
      const newLogs = logsData.slice(1);
      setLogsData([
        ...newLogs,
        { text: firstLog, date: new Date().toISOString() },
      ]);
    }, 1000);
    return () => clearInterval(interval);
  }, [logsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAnalysis = herosAnalysis.map((analysis) => {
        const change = Math.floor(Math.random() * 10) - 10; //
        let updatedValue = analysis + change;
        return Math.max(0, Math.min(100, updatedValue));
      });

      setHerosAnalysisBefore(herosAnalysis);
      setHerosAnalysis(newAnalysis);
    }, 5000);

    return () => clearInterval(interval);
  }, [herosAnalysis]);

  return (
    <div className="w100 df fdc aic jcc gap-20 contents">
      <AISwiper />
      <div className="w100 df gap-20 about-ai">
        <div className="w100 df fdc gap-20 frame gradient-bg">
          <h1 className="w100 df aic jcsb">
            sort statistics by usage <ImStatsDots />
          </h1>
          <div className="w100 df fdc aic gap-10 stats">
            {heros.map((hero, index) => (
              <div key={index} className="w100 df">
                <p>{hero.name}</p>
                <div className="ekg-container">
                  <div className="ekg-line"></div>
                </div>
                <span>
                  <CountUp
                    start={herosAnalysisBefore[index]}
                    end={herosAnalysis[index]}
                    duration={6}
                  />
                  %
                </span>
              </div>
            ))}
          </div>
          <img src={analyis} alt="analyis" />
          <span className="corner-right-bottom"></span>
          <span className="corner-left-bottom"></span>
        </div>
        <div className="df fdc gap-20 frame">
          <img src={hacking} alt="computer" />
          <h1 className="w100 df aic jcsb">
            COGNITIVE ARCHITECTURE <LuBrain />
          </h1>
          <div className="w100 df gap-15 details">
            <div className="frame ">
              <h3>
                Neural Pathways <LuBrain />
              </h3>
              <p>
                Advanced neural network with 12.4B parameters optimized for
                complex decision making and pattern recognition.
              </p>
              <span className="corner-right-bottom"></span>
              <span className="corner-left-bottom"></span>
            </div>
            <div className="frame">
              <h3>
                Processing Units <GiServerRack />
              </h3>
              <p>
                128-core quantum processing unit with 256TB of memory and
                1.2PB/s of bandwidth.
              </p>
              <span className="corner-right-bottom"></span>
              <span className="corner-left-bottom"></span>
            </div>
            <div className="frame ">
              <h3>
                Learning Systems <FaRegLightbulb />
              </h3>
              <p>
                Machine learning algorithms with deep reinforcement learning and
                unsupervised learning capabilities.
              </p>
              <span className="corner-right-bottom"></span>
              <span className="corner-left-bottom"></span>
            </div>
          </div>
          <span className="corner-right-bottom"></span>
          <span className="corner-left-bottom"></span>
        </div>
      </div>
      <div className="df fdc aic gap-20 frame gradient-bg data-log">
        <h3>data log dump initialized.</h3>
        <div className="df fdc aic gap-5 data-info">
          <h2>LOG ENTRY: PROJECT DEVELOPMENT UPDATE</h2>
          <p>
            <span>LOCATION</span>: Research Facility, Planet X-17
          </p>
          <p>
            <span>PROJECT STATUS</span>: In Development
          </p>
          <div className="df fw jcc gap-20 featchers">
            <div>
              <p>project update</p>
              <span>
                The development team has been working tirelessly on the latest
                iteration of the project. Significant progress has been made in
                the areas of neural interface integration, machine learning
                algorithms, and quantum computing.
              </span>
            </div>
            <div>
              <p>Challenges</p>
              <span>
                The team has encountered several challenges during the
                development process, including unexpected system crashes,
                hardware malfunctions, and unanticipated compatibility issues...
              </span>
            </div>
            <div>
              <p>NEXT STEPS</p>
              <span>
                The development team has been working tirelessly on the latest
                iteration of the project. Significant progress has been made in
                the areas of neural interface integration, machine learning
                algorithms, and quantum computing.
              </span>
            </div>
            <div>
              <p>CONCLUSION</p>
              <span>
                Despite the challenges encountered, the team remains optimistic
                about the potential of the project. The development of advanced
                neural interfaces and machine learning algorithms ...
              </span>
            </div>
            <button className="df aic gap-15">
              preview visual records <TbPhotoScan />
            </button>
          </div>

          <div className="w100 df fdc aic gap-15 logs">
            {logsData.map((log, index) => (
              <div key={index} className="w100 df aic jcsb gap-5">
                <p>LOG ENTRY: {log.text}</p>
                <span>DATE: {log.date}</span>
              </div>
            ))}
          </div>
        </div>
        <span className="corner-right-bottom"></span>
        <span className="corner-left-bottom"></span>
      </div>
    </div>
  );
};
