import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {

  const resources = [
    { label: "Home", to: "/" },
    { label: "Why Novara", to: "/whynovara" },
    { label: "Projects", to: "/projects" },
    { label: "Blogs", to: "/blogs" },
    { label: "Contact Us", to: "/contactus" },
    { label: "Privacy Policy", to: "/privacypolicy" },
    { label: "Terms & Conditions", to: "/termscondition" },
  ];

  const socialLinks = [
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61585877764871#", label: "Facebook" },
    { Icon: Instagram, href: "https://www.instagram.com/novaranatureestates/", label: "Instagram" },
    { Icon: Youtube, href: "https://www.youtube.com/@NovaraNatureEstates", label: "YouTube" },
  ];

  return (
    <footer className="w-full bg-[#52A09A] text-white font-urbanist">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10 py-8">

        {/* MOBILE */}
        <div className="sm:hidden">
          <img
            src="/images/logo.svg"
            alt="SkyUp Digital Solutions"
            className="w-[170px] h-auto"
          />

          <p className="mt-4 text-white/80 leading-relaxed max-w-sm">
            <b className="text-lg">Novara Nature Estate</b> focuses on thoughtfully planned farmland and land offerings designed for long-term value. With an emphasis on transparency, responsible planning, and natural surroundings, it delivers opportunities that support sustainable land ownership and future growth.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-10">
       

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold">Quick Links</h3>
              <ul className="mt-4 space-y-2 list-none p-0 m-0">
                {resources.map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="text-[16px] text-white/80 hover:text-white no-underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <div className="mt-3 space-y-2 text-white/85">
              <div>
                Email:{" "}
                <a
                  href="mailto:info@skyupdigitalsolutions.com"
                  className="text-white/85 no-underline"
                >
                   info@novaranatureestate.com
                </a>
              </div>
              <div>
                Phone:{" "}
                <a
                  href="tel:+918660200662"
                  className="text-white/85 no-underline"
                >
                  +91 8660200662
                </a>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-white hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/35" />
          <div className="pt-4 text-left text-[12px] text-white/85">
            © 2025 novaranatureestate.com. All Rights Reserved.
          </div>
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-14">
          <div>
            <img
              src="/images/logo.svg"
              alt="SkyUp Digital Solutions"
              className="w-[170px] h-auto mt-2"
            />
            <p className="mt-4 text-white/80 leading-relaxed max-w-sm">
              <b className="text-lg">Novara Nature Estate </b>focuses on thoughtfully planned farmland and land offerings designed for long-term value. With an emphasis on transparency, responsible planning, and natural surroundings, it delivers opportunities that support sustainable land ownership and future growth.
            </p>
          </div>

          {/* Quick Links */}
          <div className="pt-[6px] lg:ms-20">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2 list-none p-0 m-0">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-[18px] text-white/80 hover:text-white no-underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="pt-[6px]">
            <h3 className="text-2xl font-semibold">Contact Us</h3>
            <div className="mt-3 space-y-2 text-white/85">
              <div className="flex">
                Email:&nbsp;{" "}
                <a
                  href="mailto:info@novaranatureestate.com"
                  className="text-white/85 no-underline"
                >
                   info@novaranatureestate.com
                </a>
              </div>
              <div>
                Phone:{" "}
                <a
                  href="tel:+918660200662"
                  className="text-white/85 no-underline"
                >
                  +91 8660200662
                </a>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-white hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden sm:block mt-8 border-t border-white/35" />
        <div className="hidden sm:block mt-2 py-3 text-center text-white/85">
          © 2025 novaranatureestate.com. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
