import Image from "next/image";
import downloadButton from '../public/imgs/download.svg'

export const DocumentLoop = ({ title, image, file }) => {
    return (
        <div className="document-loop">
            <a download={title} target='_blank' rel="noreferrer" href={file} >

                <div className="thumbnail-area">
                    <div className="image-container feature-image">
                        <Image src={image} alt="" layout="fill" className="image-item" placeholder="blur"
                            blurDataURL="https://cms.okhub.vn/wp-content/uploads/2023/01/1x1-0b25777f.png" />
                    </div>
                    <div className="button-download">
                        <div className="image-container download">
                            <Image src={downloadButton} alt="" layout="fill" className="image-item" placeholder="blur"
                                blurDataURL="https://cms.okhub.vn/wp-content/uploads/2023/01/1x1-0b25777f.png" />
                        </div>
                        <div className="download-text">Click here download</div>
                    </div>
                </div>
                <div className="title">{title}</div>

            </a>
        </div>
    )
}