// Static testimonial data for the homepage

export interface Testimonial {
  id: string;
  name: string;
  designation: string;
  testimonial: string;
  rating: number;
  location: string;
  project: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Margarita Perez",
    designation: "Customer",
    testimonial:
      "I am very impressed with the service provided. The apartment location is excellent and highly convenient.",
    rating: 5,
    location: "Ranchi",
    project: "Premium 3BHK Guest House",
  },
  {
    id: "t2",
    name: "Claudia Alves",
    designation: "Customer",
    testimonial:
      "I rented an apartment through Shivaay Realty and I am extremely satisfied with my overall experience.",
    rating: 5,
    location: "Ranchi",
    project: "Modern 3BHK Guest House",
  },
  {
    id: "t3",
    name: "Yanis Petros",
    designation: "Customer",
    testimonial:
      "The rental process was smooth, professional, and completed much faster than expected.",
    rating: 5,
    location: "Ranchi",
    project: "Luxury 5BHK Residence",
  },
];
