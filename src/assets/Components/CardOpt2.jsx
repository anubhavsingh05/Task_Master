
// MOST OPTIMISED CARD

import { useState, useEffect, useReducer } from "react"
import "./Card.css"
import TitleHead from "./Head"
import Task from "./Task"

const ACTION = {
    ADD       :"add",
    SEARCH    :"search",
    UPDATE    :"update",
    DELETE    :"delete"
}

function Card (){


// FOR FUNCTIONING OF THE APP
const [rawList,setRawList] = useState(getLocalData()?getLocalData():[])
const [taskList,dispatch] = useReducer(taskReducer,getLocalData()?getLocalData():[])
const [oldV,setOldV] = useState("")
const [storedId,setStoredId] = useState("")

// FOR DECORATIONS OF THE APP
const [tickUntick,setTickUntick] = useState(true)
const [editCard,setEditCard] = useState("editCard")
const [cardClass,setCardClass] = useState("card")
const [credits,setCredits] = useState("credits")



function taskReducer(taskList,action){
    
    switch(action.type){

        case ACTION.ADD : {

            action.event.preventDefault()

            let newList =  [...taskList, { key: `${taskList.length}`,
                                            taskText: `${action.event.target.text.value}`
                                            }]

            action.event.target.text.value = ""

            setRawList(newList)

            return newList
        }

        case ACTION.SEARCH : {

            const item = action.event.target.value.toLowerCase()
            return rawList.filter((element)=> element.taskText.toLowerCase().includes(item))
        }

        case ACTION.DELETE : {

            let newList = rawList.filter( (element) => element.key !== action.id)

            let ordered_newList = newList.map((element, index) => ({
                                            ...element,
                                            key: index
                                        }));
                                        
            setRawList(ordered_newList)
            
            return ordered_newList
        }
        
        case ACTION.UPDATE : {

            action.event.preventDefault()

            const theId = rawList.findIndex((element) => element.key === storedId);
            const newObj = { key: theId, taskText: oldV }

            let newList = [...rawList]

            newList.splice(theId,1,newObj)

            setRawList(newList)
            
            setTickUntick(false)
            setOldV("✔")

            setTimeout(() => {
                setTickUntick(true)
                setOldV("")
            }, 2000);


            setEditCard("editCard cardDown")
            setCardClass("card cardSlideOut")

            return newList
        }
        
        default         : {
            console.log("default case");
            return taskList
        }

    }
}



    


// LOCAL STORAGE ________________________________________________________

    function storeLocalData(){
        const LocalData = JSON.stringify(rawList)
        localStorage.setItem('LocalData', LocalData)
    }

    function getLocalData(){
        const LocalData = JSON.parse(localStorage.getItem("LocalData"))
        return LocalData
    }

    useEffect(() => {
        storeLocalData()
    }, [rawList])




    function showOnCard(id){                        
        
        setStoredId(id)
        
        setOldV(()=>{
            
            let gotIt = taskList.filter(  (element)=>{
                        return element.key === id})

            return gotIt[0].taskText
            })
        
        setEditCard("editCard cardUp")
        setCardClass("card cardSlideIn")    
    }

    function newV (e){                                
        setOldV(e.target.value)
    }
                                            


    function showCredits(){
        setCredits("credits showCredits")
    }
    function hideCredits(){
        setCredits("credits hideCredits")
    }


    return(
                <div className={cardClass}>

{/* CREDITS _______________________________________________________________ */}

                    <div className={credits}>
                        <div className="name">Made By Anubhav</div>
                        <div className="work">(React Developer)</div>
                    </div>


{/* ADD & SEARCH __________________________________________________________ */}

                    <div className="uppers">

                        <button className="b2"> A </button>

                        <TitleHead  onMouseEnter={showCredits}
                                    onMouseLeave={hideCredits}>
                                    To Do List
                        </TitleHead>


                        <form onSubmit={(e)=>dispatch({type:ACTION.ADD, event:e})}>
                            <input type="text"
                                    placeholder="Write ur tasks"
                                    name="text"
                                    autoComplete="off"/>

                            <button className="addButton">+</button>
                        </form>

                        <form>
                            <input className="searchBox"
                                    onChange={(e)=> dispatch({type: ACTION.SEARCH, event:e})}
                                    type="text"
                                    placeholder="Search from ur tasks"
                                    name="text"
                                    autoComplete="off"/>
                        </form>
                    </div>
                    

{/* TASKLIST _______________________________________________________________*/}

        <div className="taskList">
            {taskList.map((element)=><Task  onDel = {(number)=>dispatch({type: ACTION.DELETE, id:number})}
                                            onEdit = {showOnCard}
                                            key={element.key}
                                            number = {element.key}>
                                        {element.taskText}
                                    </Task>)}
        </div>


{/* EDIT CARD _____________________________________________________________ */}

        <div className={editCard}>
            <form className="editForm" onSubmit={(e)=>
                                                dispatch({type: ACTION.UPDATE,event:e})}>
                <textarea
                    className={tickUntick ? "textarea": "textarea tick"}
                    name="updatedText"
                    rows="4"
                    cols="15"
                    value={oldV}
                    onChange={newV}
                    >
                </textarea>
                <button className="doneButton">Done</button>
            </form>
        </div>
        
                </div> 
    )
}

export default Card












