import { useLocation } from "react-router";

export function useQuery() {
    return Object.fromEntries(new URLSearchParams(useLocation().search));
}