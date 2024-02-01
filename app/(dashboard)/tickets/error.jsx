"use client";

import Link from "next/link";

const Error = () => {
  return (
    <main className="text-center">
      <h2 className="text-3xl">
        There was a problem connecting to the database.
      </h2>
      <p>
        Go back to the <Link href="/">Dashboard</Link>
      </p>
    </main>
  );
};

export default Error;
