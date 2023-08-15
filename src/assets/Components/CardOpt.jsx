
// MOST OPTIMISED CARD

import { useState, useEffect } from "react"
import "./Card.css"
import TitleHead from "./Head"
import Task from "./Task"


function Card (){


// FOR FUNCTIONING OF THE APP
const [rawList,setRawList] = useState(getLocalData()?getLocalData():[])
const [taskList,setTaskList] = useState(getLocalData()?getLocalData():[])
const [oldV,setOldV] = useState("")
const [storedId,setStoredId] = useState("")

// FOR DECORATIONS OF THE APP
const [tickUntick,setTickUntick] = useState(true)
const [editCard,setEditCard] = useState("editCard")
const [cardClass,setCardClass] = useState("card")
const [credits,setCredits] = useState("credits")
    


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



// ADDITION ______________________________________________________________

    function addTask(e){

        e.preventDefault()              // ye na bhi ho to kaam karega

        const newList = [...taskList, { key: `${taskList.length}`,
                                        taskText: `${e.target.text.value}`
                                        }]
        setTaskList(newList)
        setRawList(newList)
        
        e.target.text.value = ""
    }



// SEARCH ________________________________________________________________

    function searchTask(e){

        const item = e.target.value.toLowerCase()
        setTaskList( rawList.filter(n => n.taskText.toLowerCase().includes(item)))
    }



// DELETE ________________________________________________________________

    function deleteThis(id){

        let newList = rawList.filter(element => element.key !== id)

        let ordered_newList = newList.map((element, index) => ({
                                        ...element,
                                        key: index
                                    }));
        
        setTaskList(ordered_newList)
        setRawList(ordered_newList)
    }


// EDIT __________________________________________________________________

    function showOnCard(id){                                // Show On Card
        
        setStoredId(id)

        setOldV( taskList.filter(element => element.key === id) [0].taskText )
 
        setEditCard("editCard cardUp")
        setCardClass("card cardSlideIn")    
    }

    function newV (e){                                      // Update On Card
        setOldV(e.target.value)
    }

    function updateList(e){                                  // Transfer Update from Card to TaskList

        e.preventDefault()

        const theId = rawList.findIndex( element => element.key === storedId);

        let newList = [...rawList]
        newList.splice(theId, 1, { key: theId, taskText: oldV })

        setTaskList(newList)
        setRawList(newList)
        
        
        setTickUntick(false)
        setOldV("✔")

        setTimeout(() => {
            setTickUntick(true)
            setOldV("")
        }, 2000);


        setEditCard("editCard cardDown")
        setCardClass("card cardSlideOut")
    }                                               


// CREDITS _______________________________________________________________

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


                        <form onSubmit={addTask}>
                            <input type="text"
                                    placeholder="Write ur tasks"
                                    name="text"
                                    autoComplete="off"/>

                            <button className="addButton">+</button>
                        </form>

                        <form>
                            <input className="searchBox"
                                    onChange={searchTask}
                                    type="text"
                                    placeholder="Search from ur tasks"
                                    name="text"
                                    autoComplete="off"/>
                        </form>
                    </div>
                    

{/* TASKLIST _______________________________________________________________*/}

                    <div className="taskList">
                        {taskList.map((element)=><Task onDel = {deleteThis}
                                                        onEdit = {showOnCard}
                                                        key={element.key}
                                                        number = {element.key}>
                                                    {element.taskText}
                                                </Task>)}
                    </div>


{/* EDIT CARD _____________________________________________________________ */}

                    <div className={editCard}>
                        <form className="editForm" onSubmit={updateList}>
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












