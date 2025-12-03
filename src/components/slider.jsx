"use client"


import { useEffect, useState } from "react";
import styles from './slider.module.css';

export default function SliderImage() {

    const images = [
        "/images/slide-1.webp",
        "/images/slide-2.webp",
        "/images/slide-3.webp",
        "/images/slide-4.webp",
        "/images/slide-5.webp"
    ];

    const [current, setCurrent] = useState(0);


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length)
        }, 2000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className={styles.slider}>
            <img src={images[current]} alt={`Slide ${current + 1}`} />
        </div>
    )
}