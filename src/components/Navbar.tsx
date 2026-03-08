import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { useTheme } from "@/components/ThemeProvider";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-border transition-all duration-300 ${
        scrolled ? "bg-background/95 h-14 shadow-lg shadow-background/20" : "bg-background/80 h-16"
      }`}
    >
      <div className={`container mx-auto px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? "h-14" : "h-16"}`}>
        <div className="flex items-center gap-3">
          <img src={logo} alt="Ascend Solutions" className={`transition-all duration-300 ${scrolled ? "h-7 w-7" : "h-8 w-8"}`} />
          <span className="font-display font-bold text-lg text-foreground">Ascend Solutions</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Services</a>
          <a href="#why-us" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
          <a href="#results" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Results</a>
        </div>
        <Button variant="hero" size="default" className="text-sm" asChild>
          <Link to="/book">
            Book A Free Call
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
