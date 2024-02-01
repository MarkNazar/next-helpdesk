import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Navbar = ({ user }) => {
  return (
    <nav>
      <Image
        src="/dojo-logo.png"
        alt="Helpdesk Logo"
        width="0"
        height="0"
        sizes="100vw"
        style={{ width: "70px", height: "auto" }}
      />
      <h1>Helpdesk</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets" className="mr-auto">
        Tickets
      </Link>
      {user && <span>Hello {user.email}</span>}
      <LogoutButton />
    </nav>
  );
};

export default Navbar;
