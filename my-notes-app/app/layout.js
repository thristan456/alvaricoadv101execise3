import "./globals.css";

export const metadata = {
  title: "My Notes",
  description: "Simple Next.js Note Application"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}