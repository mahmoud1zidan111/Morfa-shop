import React, { useEffect, useRef } from "react";
import "animate.css";

export default function RevealFromCenter({
  children,
  animation = "animate__fadeInUp",
  duration = "0.6s",
  delay = 0,
  once = true,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // إخفاء مبدئي لتفادي الوميض
    el.style.opacity = "0";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animate__animated", animation);
          el.style.opacity = "1";
          el.style.setProperty("--animate-duration", duration);
          el.style.animationDelay =
            typeof delay === "number" ? `${delay}s` : String(delay);
          if (once) obs.unobserve(el);
        } else if (!once) {
          el.classList.remove("animate__animated", animation);
          el.style.opacity = "0";
        }
      },
      {
        // نضيّق الـ viewport بحيث اللي يتشاف هو منتصف الشاشة تقريبًا
        root: null,
        rootMargin: "0% 0px 0% 0px", // منطقة الرؤية = 10% الوسط
        threshold: 0.01,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [animation, duration, delay, once]);

  return <div ref={ref}>{children}</div>;
}
