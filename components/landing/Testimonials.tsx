"use client";

import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("Testimonials");

  const testimonials = [
    {
      quote: t("t1Quote"),
      author: t("t1Author"),
      role: t("t1Role"),
      company: t("t1Company"),
    },
    {
      quote: t("t2Quote"),
      author: t("t2Author"),
      role: t("t2Role"),
      company: t("t2Company"),
    },
    {
      quote: t("t3Quote"),
      author: t("t3Author"),
      role: t("t3Role"),
      company: t("t3Company"),
    },
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl text-white font-medium tracking-tight">
            {t("headline")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          {testimonials.map((item) => (
            <div key={item.author} className="flex flex-col gap-8 group">
              <div className="text-6xl font-serif italic text-[#C6FF4A] opacity-30 leading-none group-hover:opacity-100 transition-opacity">
                &ldquo;
              </div>
              <p className="text-2xl text-white font-medium leading-relaxed -mt-12">
                {item.quote}
              </p>
              <div>
                <p className="text-white font-bold">{item.author}</p>
                <p className="text-gray-500 text-sm">
                  {t("atCompany", { role: item.role, company: item.company })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
