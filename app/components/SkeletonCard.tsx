export default function SkeletonCard() {
  return (
    <div className="animate-pulse p-4 border rounded-md bg-card">
      <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
    </div>
  );
}
