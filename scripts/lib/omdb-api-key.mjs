/** Shared OMDb API key defaults + sticky free-key fallback. */

export const OMDB_PREMIUM_KEY_DEFAULT = '68a905c';
export const OMDB_FREE_KEY_DEFAULT = '14e2f0ac';

const KEY_FAILURE_RE =
    /401|Unauthorized|Request limit|limit reached|rate.?limit|Invalid API key|API key|quota\/?auth|quota exhausted|canceled|cancelled/i;

export function isOmdbKeyFailure(message) {
    if (!message) return false;
    return KEY_FAILURE_RE.test(String(message));
}

export function resolveOmdbKeys(env = process.env) {
    const primary = (env.OMDB_API_KEY || OMDB_PREMIUM_KEY_DEFAULT).trim();
    const free = (env.OMDB_API_KEY_FREE || OMDB_FREE_KEY_DEFAULT).trim();
    return { primary, free };
}

/**
 * Sticky key session: start on primary (premium), switch to free once on auth/quota failure.
 */
export function createOmdbKeySession(env = process.env, log = console.log) {
    const { primary, free } = resolveOmdbKeys(env);
    let activeKey = primary;
    let usingFree = primary === free;
    let switched = false;

    return {
        get primary() {
            return primary;
        },
        get free() {
            return free;
        },
        get key() {
            return activeKey;
        },
        get usingFree() {
            return usingFree;
        },
        get switched() {
            return switched;
        },
        describe() {
            return usingFree
                ? 'free fallback'
                : primary === OMDB_PREMIUM_KEY_DEFAULT
                    ? 'premium default'
                    : 'OMDB_API_KEY';
        },
        switchToFree(reason) {
            if (usingFree || !free || free === activeKey) return false;
            activeKey = free;
            usingFree = true;
            switched = true;
            log(
                `OMDb: primary key failed (${reason || 'auth/quota'}). Switching to free fallback for the rest of this run.`
            );
            return true;
        },
        /**
         * If data/error indicates key failure and we can fall back, switch and return true (caller should retry).
         */
        maybeFallback(errorOrData) {
            const message =
                typeof errorOrData === 'string'
                    ? errorOrData
                    : errorOrData?.Error || errorOrData?.message || String(errorOrData || '');
            if (!isOmdbKeyFailure(message)) return false;
            return this.switchToFree(message);
        }
    };
}
