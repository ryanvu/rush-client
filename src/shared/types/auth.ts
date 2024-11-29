export type RouteRole = 'admin' | 'user' | 'moderator';

export type RouteRule = {
    requireAuth: boolean;
    requireRole?: RouteRole;
};

export type RouteRules = {
    [path: string]: RouteRule;
};
