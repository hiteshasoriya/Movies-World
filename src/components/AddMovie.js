import { useState ,useContext} from "react"
import { TailSpin } from "react-loader-spinner";
import {addDoc} from "firebase/firestore";
import swal from 'sweetalert';
import { moviesRef } from "../firebase/firebase";
import { Appstate } from "../App";
import{useNavigate} from "react-router-dom";
 
const AddMovie = () => {

    const Navigate = useNavigate();
    const useAppstate = useContext(Appstate);

    const [form, setForm] = useState({
        title: "",
        year: "",
        discription: "",
        image:"",
        rated: 0,
        rating: 0
    });

    const [loading,setLoading] = useState(false);

    const addMovie = async() => {
    try {
        if(useAppstate.login) {
        setLoading(true);
        await addDoc(moviesRef ,form);
        swal({
            title:"Successfully Added",
            icon: "success",
            button:false,
            timer:3000
        })
setForm({
    title: "",
    year: "",
    discription: "",
    image:""
})
        }else{
            Navigate('/login');
        }
    } catch(err) {
        swal({
            title: err,
            icon: "error",
            button:false,
            timer:3000
        })
    }
    setLoading(false);
    }

    return (
        <div>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-8 mx-auto">
                    <div class="flex flex-col text-center w-full mb-4">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">ADD MOVIE</h1>

                    </div>
                    <div class="lg:w-1/2 md:w-2/3 mx-auto">
                        <div class="flex flex-wrap -m-2">
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-white">Title</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm text-white">Year</label>
                                    <input
                                        type="text"
                                        id="text"
                                        name="text"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <div class="relative">
                                    <label for="message" class="leading-7 text-sm text-white">Img Link</label>
                                    <input
                                        id="src"
                                        name="src"
                                        value={form.image}
                                        onChange={(e) => setForm({ ...form,image: e.target.value })}
                                        class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                    </input>
                                    <div class="p-2 w-full">
                                        <div class="relative">
                                            <label for="message" class="leading-7 text-sm text-white">Discription</label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                value={form.discription}
                                                onChange={(e) => setForm({ ...form, discription: e.target.value })}
                                                class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="p-2 w-full">
                                <button onClick={addMovie} class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                   {loading ? <TailSpin height={25} color ="white"/> : "Submit"}
                                    </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie