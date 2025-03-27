import React from "react";
import Image from "next/image";
import { Button } from "../Button";
import Link from "next/link";


export const PostLoop1 = ({ image, title, category, date, description, slug }) => {
    var newDate = new Date(date)

    const day = newDate.getDate()
    const month = newDate.toLocaleString('en-us', { month: 'long' })
    const year = newDate.getFullYear()
    console.log(image)
    return (

        <div className="loop-post1">
            <div className="column1">
                <Link href={`/${slug}`}>

                    <a className="image-container image">
                        <Image placeholder="blur"
                            blurDataURL="https://cms.okhub.vn/wp-content/uploads/2023/01/1x1-0b25777f.png" src={image} alt='image' layout="fill" className="image-item" />
                    </a>
                </Link>
                <div className="category">
                    {
                        category.map((value, index) => {
                            return (
                                <div key={index} className="category-item">{value.name}</div>
                            )
                        })
                    }
                </div>
            </div>

            <div className="column2">
                <div className="property">
                    <Link href={`/${slug}`}>

                        <a className="title">{title}</a>
                    </Link>
                    <div className="date">   {[month, ' ', day, ', ', year].join('')}</div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: description }}></div>
                    <Button className="blueButton" text="Read News" link={`/${slug}`} />
                </div>
            </div>


        </div>


    )
}