import React from 'react';
import styles from '../tourExperience/tourExperience.module.css';
import TourCard from '../tourCard/tourCard';

const toursList = ({ tourData }) => {
  const getPriceAndDivide = (pricing) => {
    if (!pricing || pricing.length === 0) {
      return { price: 0, divideBy: 1 }; // Default case when no pricing is available
    }
  
    // Find the maximum price and its index
    let maxPrice = 0;
    let maxIndex = -1;
  
    pricing.forEach((item, index) => {
      if (item?.price > maxPrice) {
        maxPrice = item.price;
        maxIndex = index;
      }
    });
  
    // If no valid price is found, return default
    if (maxPrice === 0 || maxIndex === -1) {
      return { price: 0, divideBy: 1 };
    }
  
    return { price: maxPrice, divideBy: maxIndex + 1 }; // Divide by index + 1
  };
  

  return (
    <>
      {tourData.length > 0 &&
        tourData.map((data) => {
          // Get the price and divideBy value based on the available details
          let price = 0;
          let divideBy = 1;

          if (data.isStandard) {
            const result = getPriceAndDivide(data.standardDetails?.pricing);
            price = result.price;
            divideBy = result.divideBy;
          } else if (data.isDeluxe) {
            const result = getPriceAndDivide(data.deluxeDetails?.pricing);
            price = result.price;
            divideBy = result.divideBy;
          } else if (data.isPremium) {
            const result = getPriceAndDivide(data.premiumDetails?.pricing);
            price = result.price;
            divideBy = result.divideBy;
          }

          return (
            <TourCard
              key={data.uuid} // Add a unique key for each child in a list
              data={data}
              duration={data.duration}
              location={data.location}
              uuid={data.uuid}
              imageUrl={data.bannerImage}
              title={data.name}
              startingPrice={`Rs.${Math.floor(price / divideBy)}`} // Divide by the appropriate value
            />
          );
        })}
    </>
  );
};

export default toursList;
