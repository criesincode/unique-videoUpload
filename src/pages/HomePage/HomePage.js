import Hero from "../../components/Hero/Hero.js"
import Main from "../../components/Main/Main.js"
import Comments from "../../components/Comments/Comments.js"
import Sidebar from "../../components/Sidebar/Sidebar.js"
import "./HomePage.scss"
import { useState, useEffect } from "react"
import axios from "axios"
import {useParams} from "react-router-dom"



const HomePage = () => {
    const [currentDetails, setCurrentDetails] = useState([])
      
      const { videoId } = useParams();
      const defaultVideoID = videoId || "84e96018-4022-434e-80bf-000ce4cd12b8"
      useEffect(() => {
                  const getVideoDetails = async () => {
                    try {
                      const response = await axios.get(`http://localhost:8080/videos/${defaultVideoID}`);
                      setCurrentDetails(response.data);
                    } catch (error) {
                      console.error(error);
                    }
                  };
              
                  getVideoDetails();
                }, [videoId]);
              
                if (!currentDetails) {
                  return <div>Loading...</div>;
                }
                

    return (
        <>
            <Hero videoDetails={currentDetails} />
            <div className="desktopView">
                <div className="desktopA">
                    <Main
                        currentDetails={currentDetails} />
                    <Comments
                        key={currentDetails.id}
                        name={currentDetails.comments}
                        timestamp={currentDetails.timestamp}
                        comments={currentDetails.comments} />
                </div>
                <div className="desktopB">
                <Sidebar
                    key={currentDetails.id}
                    currentDetails={currentDetails} />
                </div>    
            </div>
        </>
    )
}

export default HomePage;

