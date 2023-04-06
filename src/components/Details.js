import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Dna } from "react-loader-spinner";
import Reviews from "./Reviews";

const Details = () => {

    const {id} = useParams();
    const [data , setData] = useState({
        title:"",
        year:"",
        image:"",
        discription:"",
        rating:0,
        rated:0

    });
    const [loading , setLoading] = useState(true)
    useEffect(()=> {
        setLoading(true)
        async function getData(){
            const _doc = doc(db, "movies",id)
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoading(false)
        }
        getData();
    },[])

    return (
        <div className="p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center">
            { loading ? <div className="w-full flex justify-center items-center h-96"><Dna height ={80}/></div>:
                <>
            <img className = " h-96 block md:sticky top-24 " src ={data.image} />

            <div className="md:ml-4 ml-0 w-full md:w-1/2">
                <h1 className="text-3xl font-bold text-gray-500"> {data.title} <span >({data.year})</span></h1>
                <ReactStars
                size={20}
                half={true}
                value={data.rating/data.rated}
                edit={false}/>

                <p className="mt-3">{data.discription}</p>
                <Reviews id={id} prevRating={data.rating} userRated ={data.rated}/>
            </div>
            </>
}
        </div>
    )
}

export default Details