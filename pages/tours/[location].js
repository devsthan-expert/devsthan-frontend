import React, { useEffect, useState } from "react";
import styles from "./tourCategory.module.css";
import { apiCall } from "../../utils/common"; // Adjust path based on where your apiCall is defined
import ToursList from "../../components/toursList/toursList";
import { BASE_URL } from "../../utils/headers";
import { useRouter } from "next/router";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";
import { RxCross2 } from "react-icons/rx";
import { IoFilter } from "react-icons/io5";
import Link from "next/link";
import Loader from "../../components/loader/loader";
import Image from "next/image";
import errorimage from "./errorimage.jpg";


// `getStaticPaths` to define the list of dynamic routes to pre-render
const durationOptions = [
  { label: "2 Days", count: 2 },
  { label: "5 Days", count: 5 },
  { label: "7 Days", count: 7 },
  { label: "15 Days", count: 15 },
];
const TourCategory = ({ tourData, categories, locations, location }) => {
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [isListVisible, setIsListVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(
    locations.destinations
  );
  const router = useRouter();

  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchText(query);

    const filtered = locations.destinations.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const [tours, setTours] = useState(tourData);
  const [range, setRange] = useState([5000, 250000]);
  const [minPrice, setMinPrice] = useState(5000);
  const [maxPrice, setMaxPrice] = useState(250000);

  const [checkedCategories, setCheckedCategories] = useState([]);
  const [checkedDuration, setCheckedDuration] = useState([]);
  const handleRangeChange = (newRange) => {
    const [start, end] = newRange.sort((a, b) => a - b);
    setRange([start, end]);
    setMinPrice(start);
    setMaxPrice(end);
  };
  const marks = {
    5000: { label: "5000" },
    54000: { label: "54000" },
    103000: { label: "103000" },
    152000: { label: "152000" },
    201000: { label: "201000" },
    250000: { label: "250000" },
  };

  const stepSize = 500000 / 5;
  const handleCheckboxChange = (categoryName) => {
    const lowerCaseCategoryName = categoryName.trim().toLowerCase();

    setCheckedCategories((prevCheckedCategories) => {
      if (prevCheckedCategories.includes(lowerCaseCategoryName)) {
        return prevCheckedCategories.filter(
          (category) => category !== lowerCaseCategoryName
        );
      } else {
        return [...prevCheckedCategories, lowerCaseCategoryName];
      }
    });
  };

  const handleDurationChange = (duration) => {
    setCheckedDuration((prevCheckedDuration) => {
      if (prevCheckedDuration.includes(duration)) {
        return prevCheckedDuration.filter((d) => d !== duration);
      } else {
        return [...prevCheckedDuration, duration];
      }
    });
  };

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = locations.destinations.filter((location) =>
      location.toLowerCase().includes(query)
    );
    setFilteredOptions(filtered);
  };

  const handleListClick = (e) => {
    e.stopPropagation();
  };

  const handleRedirect = (location) => {
    setIsDialogOpen(false);
    const slug = location.toLowerCase();
    router.push(`/tours/${slug}`); // Redirect to the location page
  };

  useEffect(() => {
    const fetchToursByCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/allTours`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: location,
            tourType: checkedCategories,
            minPrice,
            maxPrice,
            durations: checkedDuration,
          }),
        });
        const data = await response.json();
        setTours(data);

        // setTours1(data);
      } catch (error) {
        console.error("Error fetching tours:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchToursByCategories();
  }, [checkedCategories, checkedDuration, minPrice, maxPrice, location]);
  return (
    <div className={styles["tour-main"]}>
      <header className={styles.header}>
        {/* <h1 className={styles.title}>Tours </h1>
        <nav>Home ➔ </nav> */}
      </header>

      <div className={styles["header-text"]}>
        <p className={styles["header-text-subtitle"]}> Special Tours for You</p>

        <h2 className={styles["header-text-title"]}>Pick Your Special Tour</h2>
      </div>
      <div className={styles["tour-category"]}>
        <div className={styles["filter-section"]}>
          {/* Search Input */}
          <div className={styles["filter-section__search"]}>
            <input
              type="text"
              placeholder="Search"
              className={styles["filter-section__search-input"]}
              onFocus={() => setIsListVisible(true)}
              onBlur={() => setIsListVisible(false)} // Optional: Hide list on blur
              onChange={handleInputChange}
            />
            {isListVisible && filteredOptions.length > 0 && (
              <ul
                className={styles["filter-section__location-list"]}
                onMouseDown={(e) => e.preventDefault()} // Prevent blur on list click
              >
                {filteredOptions.map((location, index) => (
                  <li
                    key={index}
                    className={styles["filter-section__location-item"]}
                    onClick={() => handleRedirect(location)}
                  >
                    {location}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Price Filter */}
          <div className={styles["filter-section__price"]}>
            <h3 className={styles["filter-section__title"]}>Price Filter</h3>
            <Slider
              style={{ marginBottom: "20px" }}
              min={5000}
              max={250000}
              value={range}
              onChange={handleRangeChange}
              step={stepSize}
              range
              marks={marks}
              allowCross={false}
              dots
            />
            {/* <div className={styles["filter-section__price-inputs"]}>
              <input
                type="number"
                defaultValue={minPrice}
                className={styles["filter-section__price-min"]}
              />
              <input
                type="number"
                defaultValue={maxPrice}
                className={styles["filter-section__price-max"]}
              />
            </div> */}
          </div>

          {/* Destination Filter */}
          <div className={styles["filter-section__destination"]}>
            <h3 className={styles["filter-section__title"]}>Tour Categories</h3>
            <div className={styles["filter-section__options"]}>
              {categories?.map((category) => (
                <label
                  key={category.name}
                  className={styles["filter-section__option"]}
                >
                  <input
                    type="checkbox"
                    name="tourType"
                    value={category.name}
                    onChange={() => handleCheckboxChange(category.name)}
                  />
                  {category.name}
                </label>
              ))}
            </div>
            <div className={styles["filter-section__destination"]}>
              <h3 className={styles["filter-section__title"]}>Tour Duration</h3>
              <div className={styles["filter-section__options"]}>
                {durationOptions?.map((duration) => (
                  <label
                    key={duration.label}
                    className={styles["filter-section__option"]}
                  >
                    <input
                      type="checkbox"
                      name="duration"
                      value={duration.label}
                      onChange={() => handleDurationChange(duration.count)}
                    />
                    More than {duration.label}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles["tour-cards"]}>
          {loading ? (
            <div className={styles["loader"]}>
              <Loader />
            </div>
          ) : tours.length === 0 ? (
            <div className={styles["no-tours"]}>
            <Image src={errorimage} alt="Error" width={800} height={400} />;
            </div>
          ) : (

            <>
            <h3 className={styles["tour-length"]}>{tours.length} Tours Found Related to {location}</h3>
            <ToursList tourData={tours} />
          </>
          )}
        </div>
      </div>
      <div>
        <div className={styles["filter-mobile-button"]} onClick={toggleDialog}>
          <IoFilter /> Filter
        </div>

        {isDialogOpen ? (
          <div
            className={`${styles["filter-section-mobile"]} ${styles["filtersection"]}`}
          >
            {/* Search Input */}
            <div className={styles["filter-section__search"]}>
              <input
                type="text"
                placeholder="Search"
                className={styles["filter-section__search-input"]}
                onFocus={() => setIsListVisible(true)}
                onBlur={() => setIsListVisible(false)} // Optional: Hide list on blur
                onChange={handleInputChange}
              />
              {isListVisible && filteredOptions.length > 0 && (
                <ul
                  className={styles["filter-section__location-list"]}
                  onMouseDown={(e) => e.preventDefault()} // Prevent blur on list click
                >
                  {filteredOptions.map((location, index) => (
                    <li
                      key={index}
                      className={styles["filter-section__location-item"]}
                      onClick={() => handleRedirect(location)} // Redirect on click
                    >
                      {location}
                    </li>
                  ))}
                </ul>
              )}

              <button onClick={toggleDialog}>
                <RxCross2 />
              </button>
            </div>

            {/* Price Filter */}
            <div className={styles["filter-section__price"]}>
              <h3 className={styles["filter-section__title"]}>Price Filter</h3>
              <Slider
                style={{ marginBottom: "20px" }}
                min={5000}
                max={250000}
                value={range}
                onChange={handleRangeChange}
                step={stepSize}
                range
                marks={marks}
                allowCross={false}
                dots
              />
              {/* <div className={styles["filter-section__price-inputs"]}>
                <input
                  type="number"
                  defaultValue={minPrice}
                  className={styles["filter-section__price-min"]}
                />
                <input
                  type="number"
                  defaultValue={maxPrice}
                  className={styles["filter-section__price-max"]}
                />
              </div> */}
            </div>

            {/* Destination Filter */}
            <div className={styles["filter-section__destination"]}>
              <h3 className={styles["filter-section__title"]}>
                Tour Categories
              </h3>
              <div className={styles["filter-section__options"]}>
                {categories?.map((category) => (
                  <label
                    key={category.name}
                    className={styles["filter-section__option"]}
                  >
                    <input
                      type="checkbox"
                      name="tourType"
                      value={category.name}
                      onChange={() => handleCheckboxChange(category.name)}
                    />
                    {category.name}
                  </label>
                ))}
              </div>
              <div className={styles["filter-section__destination"]}>
                <h3 className={styles["filter-section__title"]}>
                  Tour Duration
                </h3>
                <div className={styles["filter-section__options"]}>
                  {durationOptions?.map((duration) => (
                    <label
                      key={duration.label}
                      className={styles["filter-section__option"]}
                    >
                      <input
                        type="checkbox"
                        name="duration"
                        value={duration.label}
                        onChange={() => handleDurationChange(duration.count)}
                      />
                      More than {duration.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TourCategory;
export async function getStaticPaths() {
  const locations = await apiCall({
    endpoint: "/api/getAllLocations",
    method: "GET",
  });

  const destinations = locations?.destinations
    ?.map((dest) => dest.trim().toLowerCase())
    .filter((value, index, self) => self.indexOf(value) === index);
  destinations.push("allTours");
  const paths = destinations.map((destination) => ({
    params: { location: encodeURIComponent(destination) },
  }));

  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const { location } = params;
  try {
    const categories = await apiCall({
      endpoint: "/api/categories",
      method: "GET",
    });
    const locations = await apiCall({
      endpoint: "/api/getAllLocations",
      method: "GET",
    });
    const tourData = await apiCall({
      endpoint: `/api/tours/${location}`,
      method: "POST",
    });
    return {
      props: {
        tourData,
        categories,
        location,
        locations,
      },

      // revalidate: 600,
    };
  } catch (error) {
    console.error("Error fetching tour data:", error);
    return {
      props: {
        tourData: [],
        categories: [],
        location: "",

        locations: [],
      },
    };
  }
}
