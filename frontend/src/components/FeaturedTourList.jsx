import React from "react";
import useFetch from "./../hooks/useFetch";
import BASE_URL from "./../utils/config";
import TourCard from "./../shared/TourCard";
import localTours from "../assets/data/tours";

const FeaturedTourList = () => {
  const { apiData: featuredToursData, error } = useFetch(`${BASE_URL}/tour/featured`);
  const fallback = React.useMemo(
    () => localTours.filter((t) => t.featured).map((t) => ({
      _id: t.id,
      title: t.title,
      photo: t.photo,
      city: t.city,
      price: t.price,
      reviews: t.reviews,
      featured: t.featured,
      avgRating: t.avgRating,
    })),
    []
  );
  const toursToRender = featuredToursData && Array.isArray(featuredToursData)
    ? featuredToursData
    : fallback;

  return (
    <>
      {error && <h4 className="text-red-600 mb-2">{error} — showing sample data</h4>}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {toursToRender.map((tour) => (
          <div className="" key={tour._id}>
            <TourCard tour={tour} />
          </div>
        ))}
      </div>
    </>
  );
};

export default FeaturedTourList;