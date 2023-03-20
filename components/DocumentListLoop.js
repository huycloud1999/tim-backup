import factsheet from '../public/imgs/factsheet.svg'
import Link from 'next/link'
import Image from 'next/image'
export const DocumentListLoop = ({title, image, file, date})=>{
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
    var date = new Date(date);
    var monthName = monthNames[date.getMonth()];
    var year = date.getFullYear()
    var day = date.getDate(date)

        return (
            <>
                
                <a download={title} target='blank' href={file}>
                    <div className="document-list-loop">
                        <div className="image-container column-1">
                            <Image src={factsheet} alt={title} layout="fill" className='image-item' />
                        </div>
                        <div className="column-2">
                            <div className="title">{title}</div>
                            <div className="date">{day+ ' '+ monthName+', '+year}</div>
                        </div>
                    </div>
                </a>
                
            </>
        )
}