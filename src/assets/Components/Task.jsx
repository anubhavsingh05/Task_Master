





// make the functions inlinesss


























import { useState } from "react"
import "./Task.css"

function Task(props){

    const [tasklass, setTasklass] = useState(true)
    const [isIt, setIsIt] = useState(false)

    function cutIt(){
        setTasklass(!tasklass)
    }
    function deleteThis(){
        props.onDel(props.number)
    }
    function editThis(){
        props.onEdit(props.number)
    }



    let itemNo = (2*props.number)/2 + 1
    
    return(
        <div className="taskBox">
            <div className={tasklass ? "task" : "task cutIt"} onClick={cutIt}>
                <div className="text" >
                    <div className="itemNumber">{itemNo}</div>
                    <div className="tasked">
                        {props.children}
                    </div>
                </div>
            </div>
            <div className="editables">
                    <button onClick={editThis}  className="edit">&#x270E;</button>
                    <button onClick={deleteThis} className="delete"></button>
            </div>
        </div>
    )
}


export default Task