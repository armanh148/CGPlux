/* eslint-disable @typescript-eslint/no-explicit-any */

export function urlFor(source: any) {
  const getUrl = (): string => {
    if (!source) return "";
    if (typeof source === "string") return source;
    if (typeof source === "object") {
      if (source.asset?.url) return source.asset.url;
      if (source.url) return source.url;
    }
    return "";
  };

  const builder = {
    width: (_w?: number) => builder,
    height: (_h?: number) => builder,
    fit: (_f?: string) => builder,
    auto: (_a?: string) => builder,
    url: getUrl,
    toString: getUrl,
  };

  return builder;
}

export async function getProjects(): Promise<any[]> {
  return [];
}

export async function getServices(): Promise<any[]> {
  return [];
}

export async function getServiceBySlug(_slug: string): Promise<any | null> {
  return null;
}

export async function getTestimonials(): Promise<any[]> {
  return [];
}

export async function getSiteSettings(): Promise<any | null> {
  return null;
}

export async function getHomePage(): Promise<any | null> {
  return null;
}

export async function getAboutPage(): Promise<any | null> {
  return null;
}

export async function getServicesPage(): Promise<any | null> {
  return null;
}

export async function getTeamPage(): Promise<any | null> {
  return null;
}

export async function getContactPage(): Promise<any | null> {
  return null;
}

export async function getPortfolioPage(): Promise<any | null> {
  return null;
}

export async function getBlogPage(): Promise<any | null> {
  return null;
}

export async function getTeamMembers(): Promise<any[]> {
  return [];
}

export async function getBlogPosts(): Promise<any[]> {
  return [];
}

export async function getBlogPost(_slug: string): Promise<any | null> {
  return null;
}

export async function getPortfolioItems(_category?: string): Promise<any[]> {
  return [];
}

export async function getFounderProfile(): Promise<any | null> {
  return null;
}

export async function getClients(): Promise<any[]> {
  return [];
}
