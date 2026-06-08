"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, GitCommit, Layers, Zap } from "lucide-react";
import { PrimaryButtonBase } from "@/components/ui/PrimaryButtonBase";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative pt-32 pb-20 overflow-hidden md:pt-48 md:pb-32">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#C6FF4A]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#C6FF4A]/3 blur-[100px] pointer-events-none rounded-full" />

      <div className="container relative px-4 sm:px-6 mx-auto text-center max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-wide uppercase border rounded-full border-zinc-800 text-zinc-400 bg-zinc-900/50">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF4A] animate-pulse" />
            {t("badge")}
          </span>

          {/* Headline */}
          <h1 className="max-w-4xl mx-auto mb-6 text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            {t("headline1")}{" "}
            <span className="text-[#C6FF4A]">{t("headlineHighlight")}</span>
          </h1>

          {/* Sub-headline */}
          <p className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed text-zinc-400 md:text-xl">
            {t("subheadline")}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButtonBase size="lg" className="w-full sm:w-auto">
              {t("ctaPrimary")}
            </PrimaryButtonBase>
            <PrimaryButtonBase
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t("ctaSecondary")}
            </PrimaryButtonBase>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-5xl mx-auto mt-20 group"
        >
          <div className="absolute -inset-1 bg-[#C6FF4A]/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />

          {/* Browser chrome */}
          <div className="relative overflow-hidden border border-zinc-800 rounded-2xl bg-zinc-900 shadow-2xl shadow-black/50">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-950/80">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-red-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-yellow-500 transition-colors cursor-pointer" />
                <div className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-green-500 transition-colors cursor-pointer" />
              </div>
              <div className="flex-1 mx-4">
                <div className="h-5 max-w-xs mx-auto bg-zinc-800 rounded-md flex items-center justify-center">
                  <span className="text-[10px] text-zinc-600 truncate px-2 block w-full text-center">
                    app.usepulse.com/client/meu-projeto
                  </span>
                </div>
              </div>
            </div>

            {/* App content */}
            <div className="bg-[#050505] p-4 sm:p-6 flex flex-col md:flex-row gap-4 sm:gap-6 min-h-[340px]">
              {/* Sidebar */}
              <div className="hidden md:flex w-52 border-r border-zinc-900 flex-col gap-3 pr-4 shrink-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-md bg-[#C6FF4A] flex items-center justify-center">
                    <Zap className="w-3 h-3 text-black fill-black" />
                  </div>
                  <div className="h-3 w-16 bg-zinc-800 rounded" />
                </div>
                {["App Mobile", "Dashboard Web", "API Integração"].map(
                  (item, i) => (
                    <div
                      key={item}
                      className={`h-8 rounded-md flex items-center px-2 gap-2 ${i === 0 ? "bg-[#C6FF4A]/10 border border-[#C6FF4A]/20" : "bg-zinc-900/50"}`}
                    >
                      <div
                        className={`w-2 h-2 rounded-full ${i === 0 ? "bg-[#C6FF4A]" : "bg-zinc-700"}`}
                      />
                      <div
                        className={`h-2 rounded ${i === 0 ? "w-20 bg-[#C6FF4A]/60" : "w-16 bg-zinc-700"}`}
                      />
                    </div>
                  )
                )}
              </div>

              {/* Main content */}
              <div className="flex-1 flex flex-col gap-5">
                {/* Header */}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="h-5 w-32 bg-zinc-800 rounded mb-1" />
                    <div className="h-3 w-20 bg-zinc-900 rounded" />
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-[#C6FF4A]/10 border border-[#C6FF4A]/20 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-[#C6FF4A] animate-pulse" />
                    <span className="text-[10px] font-medium text-[#C6FF4A]">
                      {t("previewStatus")}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[10px] text-zinc-600 mb-1">
                    <span>{t("previewProgress")}</span>
                    <span className="text-[#C6FF4A]">67%</span>
                  </div>
                  <div className="h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#C6FF4A] rounded-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                </div>

                {/* Timeline events */}
                <div className="space-y-3">
                  {[
                    {
                      icon: <CheckCircle2 className="w-3 h-3 text-[#C6FF4A]" />,
                      text: t("previewEvent1"),
                      time: t("previewEvent1Time"),
                      done: true,
                    },
                    {
                      icon: <GitCommit className="w-3 h-3 text-blue-400" />,
                      text: t("previewEvent2"),
                      time: t("previewEvent2Time"),
                      done: false,
                    },
                    {
                      icon: <Layers className="w-3 h-3 text-zinc-600" />,
                      text: t("previewEvent3"),
                      time: t("previewEvent3Time"),
                      done: false,
                    },
                  ].map((event, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 p-2.5 rounded-lg ${event.done ? "bg-zinc-900/50" : i === 1 ? "bg-[#C6FF4A]/5 border border-[#C6FF4A]/10" : "bg-zinc-900/20 opacity-50"}`}
                    >
                      <div className="w-6 h-6 rounded-full bg-zinc-900 flex items-center justify-center shrink-0">
                        {event.icon}
                      </div>
                      <div className="flex-1">
                        <div
                          className={`h-2 rounded ${event.done ? "w-36 bg-zinc-700" : i === 1 ? "w-44 bg-[#C6FF4A]/40" : "w-28 bg-zinc-800"}`}
                        />
                      </div>
                      <span className="text-[9px] text-zinc-600 shrink-0">
                        {event.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
