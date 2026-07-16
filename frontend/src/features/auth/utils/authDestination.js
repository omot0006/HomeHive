export const userHasHive = (user) => Boolean(
  user?.hive || user?.hiveId || user?.household || user?.householdId,
);

export const getAuthDestination = (user, requestedPath) => {
  if (!userHasHive(user)) return requestedPath === "/join-hive" ? "/join-hive" : "/create-hive";
  return requestedPath && !["/login", "/register", "/create-hive", "/join-hive"].includes(requestedPath)
    ? requestedPath
    : "/dashboard";
};
