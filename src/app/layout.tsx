"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useRef, useState } from "react";
import Loader from "@/components/common/Loader";
import { ProgressProvider } from "@/components/Contexts/ProgressContext";
import DarkModeSwitcher from "@/components/Header/DarkModeSwitcher";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const dragItemRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    const dragItem = dragItemRef.current;
    if (!dragItem) return;

    const offsetX = e.clientX - dragItem.offsetLeft;
    const offsetY = e.clientY - dragItem.offsetTop;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - offsetX;
      const newY = moveEvent.clientY - offsetY;

      // Update position with constraints to avoid going out of bounds
      dragItem.style.left = `${Math.max(0, newX)}px`;
      dragItem.style.top = `${Math.max(0, newY)}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ProgressProvider> 
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? <Loader /> : children}
            
            {/* <!-- Dark Mode Toggler --> */}
            {/* <div
              ref={dragItemRef}
              className="fixed bottom-4 right-4 z-50 bg-white dark:bg-boxdark shadow-lg rounded-full flex items-center justify-center cursor-pointer"
              style={{
                width: "58px", // Fixed size
                height: "58px", // Fixed size
              }}
              onMouseDown={handleMouseDown}
            >
             
              <DarkModeSwitcher />
            </div> */}

          </div>
        </ProgressProvider>
       {/* <footer>
        </footer>  */}
      </body>
    </html>
  );
}
