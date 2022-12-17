import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { Reorder } from 'framer-motion';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import CountUp from './countUp';


function App() {
  let data = [{
    "userID" : "u-2",
    "displayName" : "Victoria",
    "picture" : "",
    "score" : 46200,
  },{
    "userID" : "u-3",
    "displayName" : "Joy",
    "picture" : "",
    "score" : 38800,
  },{
    "userID" : "u-4",
    "displayName" : "Quinn",
    "picture" : "",
    "score" : 33400,
  },{
    "userID" : "u-5",
    "displayName" : "Sheenalo",
    "picture" : "",
    "score" : 31600,
  },{
    "userID" : "u-6",
    "displayName" : "Charlene",
    "picture" : "",
    "score" : 30800,
  },{
    "userID" : "u-7",
    "displayName" : "LeonaBaby",
    "picture" : "",
    "score" : 22300,
  },{
    "userID" : "u-8",
    "displayName" : "Sunny",
    "picture" : "",
    "score" : 17800,
  },{
    "userID" : "u-9",
    "displayName" : "ImWord",
    "picture" : "",
    "score" : 17300,
  },{
    "userID" : "u-10",
    "displayName" : "Dophine",
    "picture" : "",
    "score" : 15400,
  },{
    "userID" : "u-1",
    "displayName" : "Jone",
    "picture" : "",
    "score" : 157000,
  }]
  data.sort((streamerA, streamerB) => streamerB.score - streamerA.score)
  console.log(data)
  const [streamers, setStreamers] = useState(data)
  const [prevStreamers, setPrevStreamers] = useState(data)

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }  
  const updateStreamerScore = () => {
    var max = Math.max(...streamers.map(item => item.score)) + 1000;
    setPrevStreamers(streamers);
    let rendomTwoNumber = [randomIntFromInterval(0, 9), randomIntFromInterval(0, 9)]
    let newStreamers = streamers.filter((streamer, index) => (streamer.score = rendomTwoNumber.indexOf(index) > -1 ? randomIntFromInterval(streamer.score, max) : streamer.score))
    newStreamers = newStreamers.sort((streamerA, streamerB) => streamerB.score - streamerA.score)
    // console.log(streamers);
    setStreamers(newStreamers);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      updateStreamerScore()
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Table>
        <Reorder.Group as='div' values={streamers} onReorder={setStreamers} >
          {
            streamers.map((streamer, index) => {
              return (
                  <Reorder.Item as='tr' key={streamer.score} value={streamer.score}>
                    <td ><div className={`round number round-${index}`}>{index+1}</div></td>
                    <td><div className='round'></div></td>
                    <td width={'45%'}>{streamer.displayName}</td>
                    <td width={'45%'} align={"right"} className="red-text"><CountUp start={prevStreamers[index].score} end={streamer.score}></CountUp> pt</td>
                  </Reorder.Item>
              )
            })

          }
        </Reorder.Group>
        </Table>
      </header>
    </div>
  );
}

export default App;
