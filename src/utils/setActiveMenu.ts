export function setActiveMenu(pathname: string, paths: string | string[]): boolean {
    if (!pathname) return false;

    const list = Array.isArray(paths) ? paths : [paths];

    return list.some((path) => {
        const normalized = path.startsWith("/") ? path : `/${path}`;
        return pathname.startsWith(normalized);
    });
}
