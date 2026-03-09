import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "ascend_session_id";

function getSessionId(): string {
  let id = sessionStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function trackPageView(page: string, section?: string) {
  const sessionId = getSessionId();
  supabase
    .from("page_views")
    .insert({
      session_id: sessionId,
      page,
      section: section ?? null,
      user_agent: navigator.userAgent,
      referrer: document.referrer || null,
    })
    .then(() => {});
}

/** Track when a page is visited */
export function usePageTracking(page: string) {
  const tracked = useRef(false);
  useEffect(() => {
    if (!tracked.current) {
      tracked.current = true;
      trackPageView(page);
    }
  }, [page]);
}

/** Track when sections become visible via IntersectionObserver */
export function useSectionTracking(page: string) {
  const trackedSections = useRef<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target.getAttribute("data-section");
            if (section && !trackedSections.current.has(section)) {
              trackedSections.current.add(section);
              trackPageView(page, section);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all elements with data-section attribute
    const elements = document.querySelectorAll("[data-section]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [page]);
}
