export default function MenubarLinks() {
  function scrollToSection(sect) {
    document.getElementById(sect).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="menubar_shortcuts">
      <button onClick={() => scrollToSection("newest")}>New Products</button>
      <button onClick={() => scrollToSection("deals")}>
        Deals & Discounts
      </button>
      <button onClick={() => scrollToSection("footer_div")}>Sitemap</button>
    </div>
  );
}
