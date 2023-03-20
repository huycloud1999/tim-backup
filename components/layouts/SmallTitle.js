import React from "react";

export const SmallTitle = ({title, children, className})=>{
   
    return (
        <div className={"small-title-section " + className }>
            <div className="container">
                <div className="title" dangerouslySetInnerHTML={{__html:title}}></div>
                <div className="children" dangerouslySetInnerHTML={{__html: children}}>
                   
                </div>

            </div>
        </div>
    )
}