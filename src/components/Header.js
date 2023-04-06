
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { Link } from "react-router-dom"
import { Appstate } from '../App';
import LoginIcon from '@mui/icons-material/Login';
const Header = () => {

    const useAppstate = useContext(Appstate);

    return (
        <div className=" sticky z-10 header top-0 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
            <Link to={'/'}><span>Movies<span className="text-white">World</span></span></Link>
            {useAppstate.login ? 
            <Link to={'/addmovie'}><h1 className="text-lg text-white cursor-pointer flex items-center">
                <Button><VideoCallIcon className="mr-1" color='error' /> <span className='text-white'>Add New</span></Button>
            </h1></Link>
            :
            <Link to={'/login'}><h1 className="text-lg text-white bg-green-500 cursor-pointer flex items-center">
                <Button><LoginIcon className="mr-1" color='error' /> <span className='text-black font-bold'>Login</span></Button>
            </h1></Link>
            }
        </div>
    )
}

export default Header