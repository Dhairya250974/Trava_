import React from 'react';
import ServicesCard from './ServicesCard';
import icon01 from '../assets/images/icon01.png';
import icon02 from '../assets/images/icon02.png';
import icon03 from '../assets/images/icon03.png';

const services = [
  {
    title: 'Best Selection',
    description: 'Handpicked destinations and experiences to match your style.',
    icon: <img src={icon01} alt="Best Selection" className="w-8 h-8" />,
  },
  {
    title: 'Customization',
    description: 'Tailor-made itineraries to fit your schedule and budget.',
    icon: <img src={icon02} alt="Customization" className="w-8 h-8" />,
  },
  {
    title: '24/7 Support',
    description: 'We are here for you at every step of your journey.',
    icon: <img src={icon03} alt="Support" className="w-8 h-8" />,
  },
];

const ServicesList = ({ className = '' }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {services.map((service) => (
        <ServicesCard key={service.title} service={service} />
      ))}
    </div>
  );
};

export default ServicesList;