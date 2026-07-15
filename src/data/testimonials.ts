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
    name: "Arjun & Meera Khanna",
    designation: "Business Owner",
    testimonial:
      "Moving into our Shivaay Realty penthouse was the best decision we ever made. The attention to detail in every corner, from the Italian marble foyer to the panoramic terrace — it feels like living in a five-star hotel, every single day.",
    rating: 5,
    location: "Mumbai",
    project: "Shivaay Grandeur",
  },
  {
    id: "t2",
    name: "Priya Sharma",
    designation: "Senior Director, Tech",
    testimonial:
      "As an NRI, I was nervous about investing remotely. Shivaay Realty's transparent process, regular video updates, and impeccable handover made the entire journey seamless. My 3 BHK in Bangalore has already appreciated 28% in two years.",
    rating: 5,
    location: "San Francisco / Bangalore",
    project: "Shivaay Heights",
  },
  {
    id: "t3",
    name: "Rajesh & Sunita Gupta",
    designation: "Real Estate Investor",
    testimonial:
      "In 25 years of real estate investing, I've rarely seen construction quality this exceptional. Shivaay Realty delivers what they promise — on time, with zero compromises. We've already booked our second property with them.",
    rating: 5,
    location: "Delhi",
    project: "Shivaay Residences",
  },
  {
    id: "t4",
    name: "Dr. Ananya Iyer",
    designation: "Chief of Surgery",
    testimonial:
      "The amenities at Shivaay Elysium are unmatched — the infinity pool, the landscaped gardens, the private cinema. But what truly sets them apart is the community they've built. It's luxury living with a soul.",
    rating: 5,
    location: "Hyderabad",
    project: "Shivaay Elysium",
  },
];
