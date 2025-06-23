// app/ClientLayout.tsx
"use client";

import { useState, useEffect } from "react";
import SplashScreen from "../../components/SplashScreen";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem("ndtvSplashSeen");
    if (hasSeenSplash === "true") {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("ndtvSplashSeen", "true");
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <>{children}</>;
}
