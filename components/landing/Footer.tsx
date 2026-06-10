"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";

export function Footer() {
  const t = useTranslations("Footer");

  const columns = [
    {
      title: t("platform"),
      links: [
        t("platformLinks.features"),
        t("platformLinks.integrations"),
        t("platformLinks.clientPortal"),
        t("platformLinks.api"),
      ],
    },
    {
      title: t("company"),
      links: [
        t("companyLinks.about"),
        t("companyLinks.blog"),
        t("companyLinks.careers"),
        t("companyLinks.contact"),
      ],
    },
    {
      title: t("legal"),
      links: [
        t("legalLinks.privacy"),
        t("legalLinks.terms"),
        t("legalLinks.security"),
      ],
    },
    {
      title: t("social"),
      links: [
        t("socialLinks.twitter"),
        t("socialLinks.github"),
        t("socialLinks.linkedin"),
      ],
    },
  ];

  return (
    <footer className="py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/logotipo.svg"
                alt="Progressly Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-2xl font-bold text-white tracking-tight">
                Progressly
              </span>
            </Link>
            <p className="text-gray-500 max-w-xs leading-relaxed">{t("tagline")}</p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-white font-bold mb-6">{column.title}</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="/" className="hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 gap-6 border-t border-white/5">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Progressly Technologies. {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
