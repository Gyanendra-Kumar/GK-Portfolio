import { useEffect, useRef, useState } from "react";

export default function useInView<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  },
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      });
    }, options);

    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);

  return [ref, inView];
}
