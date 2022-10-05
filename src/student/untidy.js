import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import useGeolocation from 'react-hook-geolocation';
import { useGeoLocation } from 'use-geo-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

const Book= ()=>{
    const nav = useNavigate()
    const {latitude, longitude} = useGeoLocation();
    const [showsr, setshowsr] = useState(0)
    const [cap, setcap] = useState('Places you can visit')
    const [origin, setorigin] = useState([
        
    ])
    console.log(latitude)
    const [switches, setswitches] = useState(0)
    const [myorigin, setmyorigin] = useState('')
    const [pops, setpops] = useState(0)
    const [error, seterror] = useState(0)
    const [searchparam, setsearchparam] = useState('')
    const [searchres, setsearchres] = useState([])
    const getloc = (origin) => {
        origin && latitude ? 
        origin.forEach(parameter => {
            // console.log(origin)
            
            // console.log(parameter.name)
            console.log(latitude)
            // console.log(geolocation.latitude + 0.005500000000000)
            // console.log(parseFloat(parameter.lat))
            // console.log(geolocation.latitude - 0.005500000000000)
            //  geolocation.latitude + 0.005500000000000 > parseFloat(parameter.lat) ? console.log('1') : console.log('0')
            // parseFloat(parameter.lat) > geolocation.latitude - 0.005500000000000 ? console.log('1') : console.log('0')
            if(!(latitude + 0.005500000000000 > parseFloat(parameter.lat) && parseFloat(parameter.lat) > latitude - 0.005500000000000 ))
                {
                // console.log('something went wrong')
                // setTimeout(() => {
                //     setswitches(2)
                // }, 7000);
                    
                }
            else{
                setswitches(1)
                    console.log(parameter.name)
                    setmyorigin({name:parameter.name, lcode:parameter.code})
            }
        })
        
         : console.log('unset')
    }
    const getsearch = (e) => {
        setsearchparam(e.target.value)
        const item = origin.filter(items => items.name.indexOf(searchparam) !== -1);
        console.log(item)
        setsearchres(item)
    }
    const getorigin = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'orijin.json',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setorigin(response.data)
                getloc(response.data)
            
        })
        .catch(function (error) {
        console.log(error)
        });
    }
    // useEffect(()=>{
    //         getloc()
    // },[geolocation])
    
    useEffect(()=>{
        getorigin()
    },[latitude])
    
    return(
        <div>
            <div className="container">
                <div className="topbar">
                    <div className="icon" style={{alignSelf:'center', justifySelf:'center'}}>
                       {showsr === 1 ? <FontAwesomeIcon icon={faIgloo} onClick={(e)=>{setshowsr(0); setcap('Places you can visit')}} style={{cursor:'pointer'}} /> : <FontAwesomeIcon icon={faSearch} onClick={(e)=>setshowsr(1)}/>} 
                    </div>
                    <div className="topic">
                        <input type='text' placeholder='Search' style={{width:'100%', border:'none'}}  onFocus={(e)=>{setshowsr(1); setcap('Search Results')}}  onChange={getsearch}/>
                    </div>
                </div>
                
                <div className="maps">{
                // <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2701222973815!2d6.006135037105107!3d9.039105923753237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104966b7f2e9b195%3A0x18c8eec7a2fae37c!2sFederal%20Polytechnic%20Bida!5e0!3m2!1sen!2sng!4v1662107023865!5m2!1sen!2sng" width="500" height="800" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>}
                } 
                 </div>
               
                <div className="main">
                    <div className="route">
                        <div className="location">
                            {switches === 0 ? <div className="icon"><FontAwesomeIcon icon={faLocationDot}/></div> : <div className="icon" style={{cursor:'pointer'}} onClick={(e)=>setpops(1)}><FontAwesomeIcon icon={faLocationDot}/></div>}
                            <div className='myloc' style={{display:'grid', alignItems:'center'}}>
                                <h3>Current Location</h3>
                                <span>{switches === 0 ? 'Searching for location' : switches === 1 ? myorigin.name : switches === 2 ? 'We could not find your current location. Tap the location icon to choose a point of origin':''}</span>
                                <p></p>
                                <span>{latitude}</span>
                                <span>{longitude}</span>
                            </div>
                        </div>
                        <div className='hr'></div>
                    </div>
                    <h2 style={{margin:'20px 0'}}>{cap}</h2>
                    { showsr === 1 ? 
                        <div className='sresults'>
                            {
                                switches === 1 ?
                                searchres.map(({name, code, img1, img2}, i)=>(
                                <Link to={'/directions/'+ myorigin.lcode +'/'+code}>
                                    <div className='card'>
                                        <div className='img'>
                                            <img src={img1} alt='' />
                                        </div>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                                :
                                searchres.map(({name, code, img1, img2}, i)=>(
                                    <div className='card'>
                                        <div className='img'>
                                            <img src={img1} alt='' />
                                        </div>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                ))
                        
                        }
                        </div> : 
                        <div className='suggestions'>
                            {
                                switches === 1 ?
                                    origin.map(({name, code, img1, img2}, i)=>(
                                    <Link to={'/directions/'+ myorigin.lcode +'/'+code}>
                                        <div className='box' >
                                            <div className='img'>
                                                <img src={img1} alt='' />
                                            </div>
                                            <div className='title'>
                                                <span>{name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    
                            )) : 
                            origin.map(({name, code, img1, img2}, i)=>(
                                    <div className='box' onClick={(e)=>seterror(1)}>
                                        <div className='img'>
                                            <img src={img1} alt='' />
                                        </div>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                
                        ))
                        }
                            
                        </div>
                    }
                    {pops === 1 ?
                        <div className='pop' onClick={(e)=>setpops(0)}>
                            <div className='pc'>
                                {origin.map(({name, code, img2}, i)=>(
                                    <div className='popbox' onClick={(e)=>{setmyorigin({name:name, lcode:code}); setswitches(1)}}>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                        <div className='hr'></div>
                                    </div>
                                ))}
                                
                            </div>
                        
                        
                    </div>
                    : ''
                    }
                    {error === 1 ?
                        <div className='pop' onClick={(e)=>seterror(0)}>
                            <div className='pc2'>
                                <p>Select your location</p>
                            </div>
                        
                        
                    </div>
                    : ''
                    }
                </div> 
            </div> 
        </div>
    )
}
export default Book

// accept 5:57 24/9/2022

import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import useGeolocation from 'react-hook-geolocation';
import { useGeoLocation } from 'use-geo-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'

const Book= ()=>{
    const nav = useNavigate()
    const {latitude, longitude} = useGeoLocation();
    const [showsr, setshowsr] = useState(0)
    const [cap, setcap] = useState('Places you can visit')
    const [origin, setorigin] = useState([
        
    ])
    console.log(latitude)
    const [switches, setswitches] = useState(0)
    const [myorigin, setmyorigin] = useState('')
    const [pops, setpops] = useState(0)
    const [error, seterror] = useState(0)
    const [searchparam, setsearchparam] = useState('')
    const [searchres, setsearchres] = useState([])
    const getloc = (origin) => {
        // origin && latitude ? 
        // origin.forEach(parameter => {
        //     if(latitude + 0.005500000000000 > parseFloat(parameter.lat) && parseFloat(parameter.lat) > latitude - 0.005500000000000 )
        //         {
        //         setswitches(1)
        //             console.log(parameter.name)
        //             setmyorigin({name:parameter.name, lcode:parameter.code})
        //     }
        // })
        for(const parameter of origin){
            if(latitude + 0.005500000000000 > parseFloat(parameter.lat) && parseFloat(parameter.lat) > latitude - 0.005500000000000 )
                {
                setswitches(1)
                    console.log(parameter.name)
                    setmyorigin({name:parameter.name, lcode:parameter.code})
                    break
            }
            else{
                setswitches(2)
            }
        }
        //  : console.log('unset')
    }
    const getsearch = (e) => {
        setsearchparam(e.target.value)
        const item = origin.filter(items => items.name.indexOf(searchparam) !== -1);
        console.log(item)
        setsearchres(item)
    }
    const getorigin = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'orijin.json',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            setorigin(response.data)
                getloc(response.data)
            
        })
        .catch(function (error) {
        console.log(error)
        });
    }
    // useEffect(()=>{
    //         getloc()
    // },[geolocation])
    
    useEffect(()=>{
        getorigin()
    },[latitude])
    
    return(
        <div>
            <div className="container">
                <div className="topbar">
                    <div className="icon" style={{alignSelf:'center', justifySelf:'center'}}>
                       {showsr === 1 ? <FontAwesomeIcon icon={faIgloo} onClick={(e)=>{setshowsr(0); setcap('Places you can visit')}} style={{cursor:'pointer'}} /> : <FontAwesomeIcon icon={faSearch} onClick={(e)=>setshowsr(1)}/>} 
                    </div>
                    <div className="topic">
                        <input type='text' placeholder='Search' style={{width:'100%', border:'none'}}  onFocus={(e)=>{setshowsr(1); setcap('Search Results')}}  onChange={getsearch}/>
                    </div>
                </div>
                
                <div className="maps">{
                // <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2701222973815!2d6.006135037105107!3d9.039105923753237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104966b7f2e9b195%3A0x18c8eec7a2fae37c!2sFederal%20Polytechnic%20Bida!5e0!3m2!1sen!2sng!4v1662107023865!5m2!1sen!2sng" width="500" height="800" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>}
                } 
                 </div>
               
                <div className="main">
                    <div className="route">
                        <div className="location">
                            {switches === 0 ? <div className="icon"><FontAwesomeIcon icon={faLocationDot}/></div> : <div className="icon" style={{cursor:'pointer'}} onClick={(e)=>setpops(1)}><FontAwesomeIcon icon={faLocationDot}/></div>}
                            <div className='myloc' style={{display:'grid', alignItems:'center'}}>
                                <h3>Current Location</h3>
                                <span>{switches === 0 ? 'Searching for location' : switches === 1 ? myorigin.name : switches === 2 ? 'We could not find your current location. Tap the location icon to choose a point of origin':''}</span>
                                <p></p>
                                {
                                    // <span>{latitude}</span>
                                    // <span>{longitude}</span>
                                }
                            </div>
                        </div>
                        <div className='hr'></div>
                    </div>
                    <h2 style={{margin:'20px 0'}}>{cap}</h2>
                    { showsr === 1 ? 
                        <div className='sresults'>
                            {
                                switches === 1 ?
                                searchres.map(({name, code, img1, img2}, i)=>(
                                <Link to={'/directions/'+ myorigin.lcode +'/'+code}>
                                    <div className='card'>
                                        <div className='img'>
                                            <img src={img1} alt='' />
                                        </div>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                    </Link>
                                ))
                                :
                                searchres.map(({name, code, img1, img2}, i)=>(
                                    <div className='card'>
                                        <div className='img'>
                                            <img src={img1} alt='' />
                                        </div>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                ))
                        
                        }
                        </div> : 
                        <div className='suggestions'>
                            {
                                switches === 1 ?
                                    origin.map(({name, code, img1, img2}, i)=>(
                                    <Link to={'/directions/'+ myorigin.lcode +'/'+code}>
                                        <div className='box' >
                                            <div className='img'>
                                                <img src={img1} alt='' />
                                            </div>
                                            <div className='title'>
                                                <span>{name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                    
                            )) : 
                            origin.map(({name, code, img1, img2}, i)=>(
                                    <div className='box' onClick={(e)=>seterror(1)}>
                                        <div className='img'>
                                            <img src={img1} alt='' />
                                        </div>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                    </div>
                                
                        ))
                        }
                            
                        </div>
                    }
                    {pops === 1 ?
                        <div className='pop' onClick={(e)=>setpops(0)}>
                            <div className='pc'>
                                {origin.map(({name, code, img2}, i)=>(
                                    <div className='popbox' onClick={(e)=>{setmyorigin({name:name, lcode:code}); setswitches(1)}}>
                                        <div className='title'>
                                            <span>{name}</span>
                                        </div>
                                        <div className='hr'></div>
                                    </div>
                                ))}
                                
                            </div>
                        
                        
                    </div>
                    : ''
                    }
                    {error === 1 ?
                        <div className='pop' onClick={(e)=>seterror(0)}>
                            <div className='pc2'>
                                <p>Select your location</p>
                            </div>
                        
                        
                    </div>
                    : ''
                    }
                </div> 
            </div> 
        </div>
    )
}
export default Book


// accept 5:57 24/9/2022
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useGeolocation from 'react-hook-geolocation';
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
    const geolocation = useGeolocation();
    const {latitude, longitude} = useGeoLocation();
    const nav = useNavigate()
    const [showsr, setshowsr] = useState(0)
    const [cap, setcap] = useState('Directions')
    const [origin, setorigin] = useState([
        {
            id:1,
            name:'Computer Science Department',
            code:'3543',
            lat:'9.6592186087195',
            long:'6.8887287517613',
            img1:'https://github.com/ge-nome/imagerepo/blob/main/csd1.jpg?raw=true',
            img2:'https://github.com/ge-nome/imagerepo/blob/main/csd2.jpg?raw=true',
            img3:'https://github.com/ge-nome/imagerepo/blob/main/csd3.jpg?raw=true'
        },
        {
            id:2,
            name:'Admin Block',
            code:'3513',
            lat:'9.040153340484311',
            long:'6.0065387359642575',
            img1:'https://github.com/ge-nome/imagerepo/blob/main/admin%20(2).jpg?raw=true',
            img2:'https://github.com/ge-nome/imagerepo/blob/main/admin%20(3).jpg?raw=true',
            img3:'https://github.com/ge-nome/imagerepo/blob/main/admin%20(4).jpg?raw=true'
        },
        {
            id:3,
            name:'Civil Engineering Department',
            code:'3533',
            lat:'9.037352194254996',
            long:'6.008943841710603',
            img1:'https://github.com/ge-nome/imagerepo/blob/main/csd1.jpg?raw=true',
            img2:'',
            img3:''
        },
        {
            id:4,
            name:'Big Gate',
            code:'3543',
            lat:'9.04002186087195',
            long:'6.0067287517613',
            img1:'https://github.com/ge-nome/imagerepo/blob/main/csd1.jpg?raw=true',
            img2:'',
            img3:''
        },
        {
            id:5,
            name:'Dr Omozokpia\'s house',
            code:'3663',
            lat:'9.0636288',
            long:'7.4612736',
            img1:'https://github.com/ge-nome/imagerepo/blob/main/csd1.jpg?raw=true',
            img2:'',
            img3:''
        },
        {
            id:6,
            name:'SAAS Complex',
            code:'6342',
            lat:'9.06936288',
            long:'7.4612736',
            img1:'https://github.com/ge-nome/imagerepo/blob/main/csd1.jpg?raw=true',
            img2:'',
            img3:''
        }
    ])
    const [alldirection, setalldirection] = useState([
        {
            id:1,
            from:'3513',
            to:'3543',
            directions:[
                {
                    id:'1',
                    step:'Stand backing the entrance of the Computer Science Department',
                    image:'logo.jpg'
                },
                {
                    id:'2',
                    step:'Turn left and walk for 39 seconds',
                    image:'logo.jpg'
                },
                {
                    id:'3',
                    step:'Take the first turn by your right',
                    image:'logo.jpg'
                },
                {
                    id:'4',
                    step:'Keep walking until you see the building shown in the slides above',
                    image:'logo.jpg'
                },
            ]
        },
        {
            id:2,
            from:'3513',
            to:'3533',
            directions:[
                {
                    id:'1',
                    step:'Take a bike going to small/big gate',
                    image:'logo.jpg'
                },
                {
                    id:'2',
                    step:'When you reach small/big gate, take a bike going to Ramatu Dangana Estate',
                    image:'logo.jpg'
                }
            ]
        }
    ])
    const [myorigin, setmyorigin] = useState('Searching for a location...')
    const [mydest, setmydest] = useState('')
    const [dir, setdir] = useState([
        
    ])
    const getloc = () => {
        origin.forEach(parameter => {
            if(latitude + 0.005500000000000 > parseFloat(parameter.lat) && parseFloat(parameter.lat) > latitude - 0.005500000000000)
                {
                    setmyorigin(parameter.name)
                }
        });
    }
    const getdest = async () => {
        const destination = origin.find((each)=> each.code===to)
        const froom = alldirection.find((one)=> one.from===from && one.to===to)
        // 
        setmydest(destination)
        if(froom !== undefined){
               setdir(froom.directions) 
        }
        else{
            setdir([{step:'No directions to this location'}])
        }

    }
    const getorigin = () => {
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
        })
        .catch(function (error) {
        console.log(error);
        });
    }
    useEffect(()=>{
        getorigin()
    },[])
    useEffect(()=>{
            getloc()
    }, [geolocation.latitude])

    useEffect(()=>{
        getdest()
    }, [getorigin])
    
    const items = [
        <div className="item" data-value="1">
            <div className='img'>
                <img src={mydest.img1} alt='' />
            </div>
        </div>,
        <div className="item" data-value="2">
            <div className='img'>
                <img src={mydest.img2} alt='' />
            </div>
        </div>,
        <div className="item" data-value="3">
            <div className='img'>
                <img src={mydest.img3} alt='' />
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
                        <input type='text' placeholder='Search' style={{width:'100%', border:'none'}}  value={mydest.name} disabled/>
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
                                <p>From: {myorigin}</p>
                                <p>To: {mydest.name}</p>
                            </div>
                    </div>
                    <div className='hr'></div>
                    <h2 style={{margin:'20px 0'}}>{cap}</h2>
                    { 
                        // dir !== undefined ?
                        dir.map(({step, image}, i)=>(
                            <div className='cards'>
                                <p>Step {i+1}: {step}</p>
                            </div>
                        )) 
                        // : 
                        // <div className='cards'>
                        //     <p>No directions to this location</p>
                        // </div>
                    
                    }
                </div> 
            </div> 
        </div>
    )
}
export default Accept