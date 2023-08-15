
import purpleRibbon from "../purple_Ribbon.png"
import "./Head.css"


function TitleHead(props){


    function showCredits(){
        props.onMouseEnter()
    }
    function hideCredits(){
        props.onMouseLeave()
    } 

    return(
    <div className="title">
        <div className="toDoList"
                onMouseEnter={showCredits}
                onMouseLeave={hideCredits}>
            {props.children}
        </div>
        <img src={purpleRibbon} alt="A Purple Ribbon" />
    </div>
    )
}

export default TitleHead