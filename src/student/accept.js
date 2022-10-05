import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useGeoLocation from 'react-hook-geolocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo, faRoute } from '@fortawesome/free-solid-svg-icons'
import { faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Iframe from 'react-iframe'
import admin from '../admin.jpg'
import twin from '../twin.jpg'



const Accept= ()=>{

    const {from, to} = useParams()
    const {latitude, longitude} = useGeoLocation();
    const nav = useNavigate()
    const [showsr, setshowsr] = useState(0)
    const [cap, setcap] = useState('Directions')
    const [origin, setorigin] = useState([])
    const [alldirection, setalldirection] = useState([])
    const [myorigin, setmyorigin] = useState({})
    const [mydest, setmydest] = useState([])
    const [dir, setdir] = useState([])
    const getloc = (origin) => {
        for(const parameter of origin){
            if(latitude + 0.005500000000000 > parseFloat(parameter.lat) && parseFloat(parameter.lat) > latitude - 0.005500000000000 )
                {
                    console.log(parameter.name)
                    setmyorigin({name:parameter.name, lcode:parameter.code})
                    break
            }
            else{
                setmyorigin({name:'Searching for a location...', lcode:parameter.code})
            }
        }
    }
    const getorigin = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: '../../orijin.json',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setorigin(response.data)
            getloc(response.data)
            getlock(response.data)
            getdest(response.data)
            
        })
        .catch(function (error) {
        console.log(error)
        });
    }
    const getdestinations = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: '../../destinations.json',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setorigin(response.data)
            getdest(response.data)
            
        })
        .catch(function (error) {
        console.log(error)
        });
    }
    const getdirections = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: '../../directions.json',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setalldirection(response.data)
            getalldir(response.data)
            
        })
        .catch(function (error) {
        console.log(error)
        });
    }
    const getlock = async (origin) => {
        const location = origin.find((each)=> each.code===from)
        setmyorigin({name:location.name, lcode:location.code})
    }
    const getdest = async (origin) => {
        const destination = origin.find((each)=> each.code===to)
        console.log(destination)
        setmydest(destination)
    }
    const getalldir = async () => {
        const froom = alldirection.find((one)=> one.from===from && one.to===to)  
        console.log(froom)
        if(froom !== undefined){
               setdir(froom.directions) 
        }
        else{
            setdir([{step:'No directions to this location'}])
        }
    }
    useEffect(()=>{
        getorigin()
    },[])
    useEffect(()=>{
        getdestinations()
    },[])
    useEffect(()=>{
        getdirections()
    }, [])
    useEffect(()=>{
        getalldir()
    }, [alldirection])
    const items = [
        <div className="item" data-value="1">
            <div className='img'>
                <img src={mydest ? mydest.img1 : ''} alt='' />
            </div>
        </div>,
        <div className="item" data-value="2">
            <div className='img'>
                <img src={mydest ? mydest.img1 : ''} alt='' />
            </div>
        </div>,
        <div className="item" data-value="3">
            <div className='img'>
                <img src={mydest ? mydest.img1 : ''} alt='' />
            </div>
        </div>
        ];
    return(
        <div>
            <div className="container">
                <div className="topbar" style={{backgroundColor:'white'}}>
                    <div className="icon" style={{alignSelf:'center', justifySelf:'center'}}>
                       <Link to={'/'}><FontAwesomeIcon icon={faIgloo} style={{cursor:'pointer'}} /></Link>
                    </div>
                    <div className="topic">
                        <input type='text' placeholder='Search' style={{width:'100%', border:'none'}}  value={mydest ? mydest.name : ''} disabled/>
                    </div>
                </div>
                {
                    <div className="maps">
                        <AliceCarousel
                            autoPlay
                            autoPlayStrategy="none"
                            autoPlayInterval={5000}
                            animationDuration={4000}
                            animationType="fadeout"
                            infinite
                            touchTracking={false}
                            disableDotsControls
                            disableButtonsControls
                            items={items}
                        />
                    </div>
                }
                <div className="main" style={{marginTop:'200px', minHeight:'650px'}}>
                    <div className='location'>
                        <div className='icon' style={{alignSelf:'center', justifySelf:'center'}}>
                            <FontAwesomeIcon icon={faRoute} style={{cursor:'pointer',fontSize:'.6em'}} />
                        </div>
                        <div className='myloc' style={{display:'grid', alignItems:'center'}}>
                                <p>From: {myorigin.name}</p>
                                <p>To: {mydest ? mydest.name : ''}</p>
                            </div>
                    </div>
                    <div className='hr'></div>
                    <h2 style={{margin:'20px 0'}}>{cap}</h2>
                    { 
                        dir.map(({step, image}, i)=>(
                            <div className='cards'>
                                <p>Step {i+1}: {step}</p>
                            </div>
                        )) 
                    
                    }
                </div> 
            </div> 
            <div className='fltbutton'>
                        <Link to={"/"}><FontAwesomeIcon icon={faIgloo} color="white"/></Link>
                    </div>
        </div>
    )
}
export default Accept