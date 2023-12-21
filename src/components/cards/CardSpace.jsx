import { Link } from "react-router-dom"
import {Badge} from "@/components/ui/badge"


function CardSpace({setOpenDelete, setOpenEdit, setIsEditing, setSpace }) {
  return (
    <div className="p-1 mb-2 bg-gray-700 border rounded-md">
          <div className="flex flex-wrap justify-between w-full gap-2">
            <Link to={'/user/space'} className="font-bold text-gray-300">Web Developer</Link>
            <p>
                <Badge className="font-bold ">0</Badge>
            </p>
          </div>
          <p className="mt-2 text-gray-50">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed finibus
            est vitae tortor ullamcorper, ut vestibulumvelit 
          </p>
        <button className="inline-block px-2 py-1 text-sm font-semibold tracking-wide text-white no-underline uppercase bg-teal-500 rounded shadow hover:bg-teal-600"
        onClick={()=> {
          setOpenEdit(true)
          setIsEditing(true)
          setSpace({id: 1 , name: "hola"})
        }} >editar</button>
        <button className="inline-block px-2 py-1 m-1 text-sm font-semibold tracking-wide text-white no-underline uppercase bg-red-400 rounded shadow hover:bg-red-500"
        onClick={()=> {
          setOpenDelete(true)
          setSpace({id: 1 , name: "hola"})
        }} >Eliminar</button>
    </div>
  )
}

export default CardSpace