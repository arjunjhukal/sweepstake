// app/games/loading.tsx
export default function Loading() {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 animate-pulse">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl bg-gray-200 w-full h-[220px]"
                />
            ))}
        </div>
    );
}
