
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../tourCard/tourCard.module.css';
import { FaBed } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { FaCamera } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { MdLocalDrink } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import Loader from '../loader/loader'; // Assuming loader is a component or image

import { useRouter } from 'next/router';

export default function TourCard({ duration, location, imageUrl, title, startingPrice, uuid, data }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();


  const handleGoToTour = async () => {
    try {
      setIsLoading(true); // Start the loader
      // Using router.push() to handle the navigation
      await router.push(`/tour/${uuid}`);
    } catch (error) {
      console.error("Error navigating to tour:", error);
    } finally {
      setIsLoading(false); // Stop the loader
    }

  };

  return (
    <div className={styles['tour-card']}>
      {/* Image Container */}
      <div className={styles['image-container']} onClick={handleGoToTour}>
        <Image src={imageUrl} alt={location} width={350} height={200} className={styles['image']} />
        <div className={styles['tag']}>
          <span className={styles['duration']}>{`${duration - 1} Nights / ${duration} Days`}</span>
          <span className={styles['location']}><FaLocationDot className={styles['location-icon']} />{location}</span>
        </div>
      </div>

      <h3>{title}</h3>

      {/* Tour Features */}
      <div className={styles['tour-features']}>
        {data.hotel && (
          <div className={styles['tour-hotel']}>
            <FaBed />
          </div>
        )}

        {data.meals && (
          <div className={styles['tour-hotel']}>
            <GiMeal />
          </div>
        )}
        {data.siteSeen && (
          <div className={styles['tour-hotel']}>
            <FaCamera />
          </div>
        )}

        {data.transportation && (
          <div className={styles['tour-hotel']}>
            <FaCar />
          </div>
        )}

        {data.welcomeDrinks && (
          <div className={styles['tour-hotel']}>
            <MdLocalDrink />
          </div>
        )}
      </div>

      {/* Pricing and Button */}
      <div className={styles['pricing-and-button']}>
        <div className={styles['pricing']}>
          <span className={styles['starting-from']}>Starting From:</span>
          <div>
            <span className={styles['starting-price']}>{startingPrice}</span>
          </div>
        </div>
        {isLoading ? (
          <Loader /> // Show the loader
        ) : (
          <button className={styles['book-btn']} onClick={handleGoToTour}>
            Book A Trip
          </button>
        )}
      </div>
    </div>
  );
}
