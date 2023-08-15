import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main>
      <aside>
        <div>
          <h3>Admin Sidebar</h3>
          <p>item</p>
          <p>item</p>
          <p>item</p>
        </div>
      </aside>
      <div> {children} </div>
    </main>
  );
}
