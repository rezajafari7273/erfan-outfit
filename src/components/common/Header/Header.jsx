import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <header className="sticky top-0 w-full z-50">
      <div className="hidden lg:block">
        <DesktopHeader />
      </div>

      <div className="block lg:hidden">
        <MobileHeader />
      </div>
    </header>
  );
}