"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export function ClientTimelineFeature() {
  const t = useTranslations("ClientTimeline");

  const items = [
    {
      date: t("mockItem1Date"),
      label: t("mockItem1Label"),
      desc: t("mockItem1Desc"),
      status: "active" as const,
    },
    {
      date: t("mockItem2Date"),
      label: t("mockItem2Label"),
      desc: t("mockItem2Desc"),
      status: "done" as const,
    },
    {
      date: t("mockItem3Date"),
      label: t("mockItem3Label"),
      desc: t("mockItem3Desc"),
      status: "done" as const,
    },
  ];

  return (
    <section id="features" className="py-32 px-6 bg-gradient-to-b from-transparent to-black/40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="relative w-full max-w-lg mx-auto rounded-[32px] p-8 shadow-2xl overflow-hidden bg-[#0d0d0d] border border-white/[0.06]">
            <div className="flex items-center justify-between mb-10">
              <h4 className="text-white font-bold tracking-tight">{t("mockTitle")}</h4>
              <span className="text-[10px] px-2 py-1 rounded font-bold uppercase bg-[#C6FF4A]/10 text-[#C6FF4A]">
                {t("mockBadge")}
              </span>
            </div>

            <div className="relative pl-8">
              <div
                className="absolute left-[7px] top-2 bottom-0 w-[2px]"
                style={{ background: "linear-gradient(to bottom, #C6FF4A, transparent)" }}
              />

              <div className="space-y-12">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.15 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div
                      className={cn(
                        "absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2",
                        item.status === "active" && "animate-pulse bg-[#C6FF4A] border-[#C6FF4A]",
                        item.status === "done" && "bg-[#0d0d0d] border-white/20"
                      )}
                    />
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                        {item.date}
                      </span>
                      <h5 className="text-white font-bold">{item.label}</h5>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 flex items-center justify-between border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#C6FF4A]" />
                <span className="text-xs text-gray-400">{t("mockFooter")}</span>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center border border-white/10 bg-white/5">
                <MessageSquare className="w-4 h-4 text-white/40" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8 order-1 lg:order-2">
          <h2 className="text-4xl md:text-6xl text-white font-medium tracking-tight leading-tight">
            {t("headline1")}{" "}
            <span className="italic font-[family-name:var(--font-serif-display)] text-[#C6FF4A]">
              {t("headlineHighlight")}
            </span>
          </h2>
          <div className="space-y-6 text-xl text-gray-400">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>
          <div className="flex items-center gap-6 mt-4">
            <div className="flex flex-col">
              <span className="text-3xl text-white font-bold">{t("stat1Value")}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                {t("stat1Label")}
              </span>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl text-white font-bold">{t("stat2Value")}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">
                {t("stat2Label")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
