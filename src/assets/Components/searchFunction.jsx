

function SearchFunction(item, rawList, setTaskList){

    setTaskList(    rawList.filter((element)=>{
                    return element.taskText.toLowerCase().includes(item.toLowerCase())
                }) )
}

export default SearchFunction

