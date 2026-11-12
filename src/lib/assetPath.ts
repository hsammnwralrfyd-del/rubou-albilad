
export const assetPath = (path: string): string => {
  if (!path) {
    return "";
  }

  const normalizedPath = path.trim();

  // الاحتفاظ بروابط Supabase والصور الخارجية كما هي
  if (
    /^https?:\/\//i.test(normalizedPath) ||
    normalizedPath.startsWith("data:") ||
    normalizedPath.startsWith("blob:") ||
    normalizedPath.startsWith("//")
  ) {
    return normalizedPath;
  }

  // الاحتفاظ بمسارات الملفات المحلية مع قاعدة الموقع
  const baseUrl = import.meta.env.BASE_URL || "/";

  const cleanBase = baseUrl.endsWith("/")
    ? baseUrl
    : `${baseUrl}/`;

  const cleanPath = normalizedPath.replace(/^\/+/, "");

  return `${cleanBase}${cleanPath}`;
};
