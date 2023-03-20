export const PopUp = ({setShow,content})=>{
    const handleClick=()=>{
    setShow(false)
    }
    return (
        <>
        <div className="popup-wrapper">
            <div className="wrapper-parent">
            <div className="top-button">
                <button  onClick={handleClick}>
                Accept
                </button>

            </div>

                <div className="cookie-popup">
                    <div className="content-cookie" dangerouslySetInnerHTML={{__html: content}}>

                    </div>

                    {/* <button className="accept-buton" onClick={handleClick}>Accept</button> */}
                </div>
            </div>
        </div>
        </>
    )
}