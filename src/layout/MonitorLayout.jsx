export default function MonitorLayout({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full gap-4">
      {children}
    </div>
  );
}
