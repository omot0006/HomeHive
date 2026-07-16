export const getFriendlyName = (user) =>
  user?.nickname?.trim()
  || user?.firstName?.trim()
  || user?.name?.trim().split(/\s+/)[0]
  || "";

export const getLegalName = (user) =>
  [user?.firstName, user?.lastName].map((part) => part?.trim()).filter(Boolean).join(" ");

export const getUserInitials = (user) => {
  const friendlyName = getFriendlyName(user);
  const lastName = user?.lastName?.trim();
  return `${friendlyName[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase() || "HH";
};
