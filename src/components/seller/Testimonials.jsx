import { Quote } from "lucide-react";
import { asset } from "@/lib/paths";
import { isPlaceholder } from "@/lib/format";

export default function Testimonials({ items = [] }) {
  const testimonials = items.filter(
    (item) => !isPlaceholder(item.name) && !isPlaceholder(item.text),
  );
  if (!testimonials.length) return null;
  return (
    <div className="testimonial-grid">
      {testimonials.map((item, index) => (
        <figure className="testimonial-card" key={`${item.name}-${index}`}>
          <Quote size={22} aria-hidden="true" className="quote-mark" />
          <blockquote>{item.text}</blockquote>
          <div className="testimonial-author">
            {item.photo && (
              <img
                src={asset("seller", item.photo)}
                alt=""
                width="40"
                height="40"
                loading="lazy"
              />
            )}
            <figcaption>{item.name}</figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}
