// Card 1 and Card 2 are same, difference is only in how they store and get data
// to and from the local Storage.. ie, only first few lines of code are different
// also.. the <React.StrictMode/> also prevent the local storage to work (why?)


import { useState, useEffect } from "react"
import "./Card.css"
import TitleHead from "./Head"
import Task from "./Task"
import SearchFunction from "./searchFunction"


function Card (){

    
    
    
    // const [rawList,setRawList] = useState(getLocalData())    // why not this line?
    const [rawList,setRawList] = useState(getLocalData()?getLocalData():[])
    const [taskList,setTaskList] = useState(getLocalData()?getLocalData():[])
    const [oldV,setOldV] = useState("")
    const [storedId,setStoredId] = useState("")

    const [tickUntick,setTickUntick] = useState(true)
    const [editCard,setEditCard] = useState("editCard")
    const [cardClass,setCardClass] = useState("card")
    const [credits,setCredits] = useState("credits")
    

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


    
    function addTask(e){
        e.preventDefault()

        if(e.target.text.value == ""){
            alert("khali task add kar ke kya karoge??")
        }

        else{
            setTaskList( [...taskList,
                         { key: `${taskList.length}`,
                           taskText: `${e.target.text.value}`
                         }])
            setRawList( [...rawList,
                        { key: `${rawList.length}`,
                            taskText: `${e.target.text.value}`
                        }])
        }
        
        e.target.text.value = ""

    }

    function searchTask(e){
        e.preventDefault()

        const item = e.target.value
        SearchFunction(item,rawList, setTaskList)
    }

    function deleteThis(id){


        // remember.. the below is a shallow copy..
        let newList = rawList.filter( (element) => element.key !== id)

        let c = newList.map((element, index) => ({
            ...element,
            key: index
        }));

        // let c = newList.map((element, index)=>{      // why like the above?? why not like this??
        //     element.key = index
        //     return element
        //    })
        
        setTaskList(c)
        setRawList(c)
    }



    function showOnCard(id){                                // Show On Card
        
        setStoredId(id)
        
        setOldV(()=>{
            
            let gotIt = rawList.filter(  (element)=>{
                return element.key === id})

            return gotIt[0].taskText
            })
        
        setEditCard("editCard cardUp")
        setCardClass("card cardSlideIn")
        
    }
    function newV (e){                                      // Update On Card
        setOldV(e.target.value)
    }
    function updateList(e){                                  // Transfer Update from Card to TaskList
        e.preventDefault()

        const theId = rawList.findIndex((element) => element.key === storedId);
        const theTaskText = oldV
        const newObj = {
            key: theId,
            taskText: theTaskText
        }
        const newList = [...rawList]         // but this isn't a deep copy.. its shallow.. it seems
                                            // deep because we only have 1 level of array nesting

        setTaskList(()=>{
            newList.splice(theId,1,newObj)               
            return newList
        })
        setRawList(()=>{
            newList.splice(theId,1,newObj)               
            return newList
        })
        
        
        setTickUntick(false)
        setOldV("✔")

        setTimeout(() => {
            setTickUntick(true)
            setOldV("")
        }, 2000);

        setEditCard("editCard cardDown")
        setCardClass("card cardSlideOut")
    }                                               


    function showCredits(){
        setCredits("credits showCredits")
    }
    function hideCredits(){
        setCredits("credits hideCredits")
    }


    return(
            <>
                <div className={cardClass}>


                    <div className={credits}>
                        <div className="name">Made By Anubhav</div>
                        <div className="work">(React Developer)</div>
                    </div>

                    <div className="uppers">

                        <button className="b2"> A </button>

                        <TitleHead  onMouseEnter={showCredits}
                                    onMouseLeave={hideCredits}>
                                    To Do List
                        </TitleHead>

{/* remember that these onMouseEnter etc are custom name here on TitleHead.. vo alag baat h ki
tumne rakh diya yaha bhi wahi naam but remember that asal me ye sab TitleHead (yani Head.jsx)
controll kar raha h... Head.jsx ke andar jaao samajh jaaoge.. */}

                        <form onSubmit={addTask}>
                            <input type="text"
                                    placeholder="Write ur tasks"
                                    name="text"
                                    autoComplete="off"
                                    />
                            <button className="addButton">+</button>
                        </form>

                        <form onSubmit={searchTask}>
                            <input className="searchBox"
                                onChange={searchTask}
                                type="text"
                                placeholder="Search from ur tasks"
                                name="text"
                                autoComplete="off"
                                />
                        </form>

                    </div>
                    

                    <div className="taskList">

                        {taskList.map((element)=><Task 
                                                        onDel = {deleteThis}
                                                        onEdit = {showOnCard}
                                                        key={element.key}
                                                        number = {element.key}>
                                                    {element.taskText}
                                                </Task>)}
                    </div>


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
            </>
    )
}

export default Card












