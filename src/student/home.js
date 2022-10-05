import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGeoLocation } from 'use-geo-location';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
import logo from '../fpb.jpeg'
const Home= ()=>{
    const nav = useNavigate()
    const {latitude, longitude} = useGeoLocation();
    const [showsr, setshowsr] = useState(0)
    const [cap, setcap] = useState('Schools you can visit')
    const [origin, setorigin] = useState([])
    const [switches, setswitches] = useState(0)
    const [myorigin, setmyorigin] = useState('')
    const [schools, setschools] = useState([])
    const [pops, setpops] = useState(0)
    const [error, seterror] = useState(0)
    const [searchparam, setsearchparam] = useState('')
    const [searchres, setsearchres] = useState([])
    const getloc = (origin) => {
        for(const parameter of origin){
            if(latitude + 0.005500000000000 > parseFloat(parameter.lat) && parseFloat(parameter.lat) > latitude - 0.005500000000000 )
                {
                setswitches(1)
                    setmyorigin({name:parameter.name, lcode:parameter.code})
                    break
            }
            else{
                setswitches(2)
            }
        }
    }
    const getsearch = (e) => {
        setsearchparam(e.target.value)
        const item = origin.filter(items => items.slug.indexOf(e.target.value) !== -1);
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
    //I removed the use effect dependency 1 Oct 2022
    useEffect(()=>{
        getorigin()
    },[])

    const getschools = async () => {
        var axios = require('axios');
        var config = {
        method: 'get',
        url: 'schools.json',
        headers: { }
        };

        axios(config)
        .then(function (response) {
            setschools(response.data)
        })
        .catch(function (error) {
        console.log(error)
        });
    }
    useEffect(()=>{
        getschools()
    },[schools])
    
    return(
        <div>
            <div className="container">
                <div className=''>
                    <div className='head'>
                        <div className='logo'>
                            <img src={logo} alt=''/>
                        </div>
                        <div className='name'>GIRS Federal Polytechnic Bida</div>
                    </div>
                </div>
                <div className="topbar">
                    <div className="icon" style={{alignSelf:'center', justifySelf:'center'}}>
                       {showsr === 1 ? <FontAwesomeIcon icon={faIgloo} onClick={(e)=>{setshowsr(0); setcap('Schools you can visit')}} style={{cursor:'pointer'}} /> : <FontAwesomeIcon icon={faSearch} onClick={(e)=>setshowsr(0)}/>} 
                    </div>
                    <div className="topic">
                        <input type='text' placeholder='Search for a destination' style={{width:'100%', border:'none', fontSize:'1em'}}  onFocus={(e)=>{setshowsr(1); setcap('Search Results')}}  onChange={getsearch}/>
                    </div>
                </div>
                
                <div className="maps">{
                // <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.2701222973815!2d6.006135037105107!3d9.039105923753237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104966b7f2e9b195%3A0x18c8eec7a2fae37c!2sFederal%20Polytechnic%20Bida!5e0!3m2!1sen!2sng!4v1662107023865!5m2!1sen!2sng" width="500" height="800" style={{border:'0'}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></Iframe>}
                } 
                 </div>
               
                <div className="main">
                    <h2 style={{margin:'20px 0'}}>{cap}</h2>
                    { showsr === 1 ? 
                        <div className='sresults'>
                            {
                                switches === 1 ?
                                searchres.map(({id, name, code, img1, img2}, i)=>(
                                <Link to={'/directions/'+ myorigin.lcode +'/'+code} key={id}>
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
                                searchres.map(({id, name, code, img1, img2}, i)=>(
                                    <div className='card' key={id}>
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
                                schools.map(({id, name, code, img1, abbrev}, i)=>(
                                    <Link to={'/book/'+ code + '/' + abbrev} key={id}>
                                        <div className='box' >
                                            <div className='img'>
                                                <img src={img1} alt='' />
                                            </div>
                                            <div className='title'>
                                                <span>{name}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                            
                        </div>
                    }
                    {pops === 1 ?
                        <div className='pop' onClick={(e)=>setpops(0)}>
                        
                            <div className='pc'>
                            <h3>Select where to start</h3>
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
                                <p>Where would you like to start?</p>
                            </div>
                        
                        
                    </div>
                    : ''
                    }
                </div> 
            </div> 
        </div>
    )
}
export default Home