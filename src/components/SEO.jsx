import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description }) {
  return (
    <Helmet>
      <title>{title} | EventHub</title>
      <meta name="description" content={description || "Book Concerts, Festivals, Sports Events, and unforgettable experiences with EventHub."} />
    </Helmet>
  );
}
