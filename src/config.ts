/**
 * Top Ten Hotel Configuration
 *
 * Change MENU_URL here to update the digital menu destination
 * across the site, QR code generator, and external links.
 */

// Configure your production domain here
export const PRODUCTION_MENU_DOMAIN = "https://toptenhotel.com";

// Active Menu URL: Dynamically uses current window origin when running,
// or falls back to the configured production domain.
export const MENU_URL: string =
  typeof window !== 'undefined' && window.location?.origin
    ? `${window.location.origin}/menu`
    : `${PRODUCTION_MENU_DOMAIN}/menu`;
