export default function SkeletonCard() {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 animate-pulse">
      <div className="h-6 w-20 bg-purple-600/30 rounded-md"></div>
      <div className="h-4 w-14 bg-purple-500/20 rounded"></div>
    </div>
  );
}
