import { useContext, useEffect, useState } from "react"
import ReactStars from "react-stars"
import { reviewsRef, db } from "../firebase/firebase";
import { addDoc, doc, updateDoc, query, where, getDocs } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { Dna } from "react-loader-spinner";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";


const Reviews = ({ id, prevRating, userRated }) => {

    const useAppstate = useContext(Appstate);
    const Navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading, setReviewsLoading] = useState(false);
    const [form, setForm] = useState("");
    const [data, setData] = useState([]);
    const [newAdded, SetNewAdded] = useState(0);

    const sendreview = async () => {
        try {
            if(useAppstate.login) {
            setLoading(true);
            await addDoc(reviewsRef, {
                movieid: id,
                name: useAppstate.userName,
                rating: rating,
                thought: form,
                time: new Date().getTime()
            })

            const ref = doc(db, "movies", id);
            await updateDoc(ref, {
                rating: prevRating + rating,
                rated: userRated + 1
            })


            swal({
                title: "Review Sent",
                icon: "success",
                button: false,
                timer: 3000
            })

            setRating(0);
            setForm("");
            SetNewAdded(newAdded + 1);
        }else{
            Navigate('/login');
        }
        } catch (error) {
            swal({
                title: error,
                icon: "error",
                button: false,
                timer: 3000
            })

        }
        setLoading(false);
    }

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setData([]);
            let quer = query(reviewsRef, where('movieid', '==', id))
            const querySnap = await getDocs(quer);
            querySnap.forEach((doc) => {
                setData((prev) => [...prev, doc.data()])
            })
            setReviewsLoading(false);
        }
        getData();
    }, [newAdded])

    return (
        <div className="mt-2 py-1 border-t-2 border-gray-700 w-full">
            <ReactStars
                size={30}
                half={true}
                value={rating}
                edit={true}
                onChange={(rate) => setRating(rate)}
            />
            <input
                value={form}
                onChange={(e) => setForm(e.target.value)}
                placeholder="Enter you Review..."
                className="w-full p-2 outline-non header"
            />
            <button onClick={sendreview} className="bg-green-500 flex justify-center mt-2 w-full p-2">
                {loading ? <TailSpin height={20} color="white" /> : "Share"}
            </button>
            {
                reviewsLoading ? <div className="w-full flex justify-center items-center h-96"><Dna height={80} /></div>
                    :
                    <div className="mt-4 " p-2> 
                        {
                            data.map((e, i) => {
                                return (
                                    <div className=" p-2 w-full mt-2 border-b review border-gray-600" key={i}>
                                        <div className="flex items-center">
                                            <p className="mr-2 text-blue-500">{e.name} </p>
                                            <p className="text-xs">({new Date(e.time).toLocaleString()})</p>
                                        </div>
                                        <ReactStars
                                            size={20}
                                            half={true}
                                            value={e.rating}
                                            edit={false}
                                        />
                                        <p>{e.thought}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </div>
    )
}

export default Reviews