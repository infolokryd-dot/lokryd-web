/**
 * Backwards-compatibility alias for /api/enquiry.
 * Directs incoming requests directly to the unified /api/contact handler.
 */
export { POST } from "../contact/route";
