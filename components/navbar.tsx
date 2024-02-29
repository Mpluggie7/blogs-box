import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="flex justify-between container shadow-md p-4 px-6">
      <div className="frontNav flex items-center space-x-6">
        <div className="logoName flex space-x-2">
          {/* <div>icon</div> */}
          <div className="text-xl font-semibold">BLOGS BOX</div>
        </div>
        <div className="link space-x-4">
          <Link className="font-light" href="/">
            Posts
          </Link>
          <Link className="font-light" href="/member/editor">
            Editor
          </Link>
        </div>
      </div>
      <div className="backNav"></div>
    </nav>
  );
};

export default Navbar;
