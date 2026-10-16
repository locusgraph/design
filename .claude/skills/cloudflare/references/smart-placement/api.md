# Smart Placement API

## Placement Status API

Query Worker placement status via Cloudflare API:

```bash
curl -X GET "https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/workers/services/{WORKER_NAME}" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json"
```

Response includes `placement_status` field:

```typescript
type PlacementStatus = 
  | undefined
  | 'SUCCESS'
  | 'INSUFFICIENT_INVOCATIONS'
  | 'UNSUPPORTED_APPLICATION';
```

## Status Meanings

**`undefined` (not present)**
- Worker not yet analyzed
- Always runs at default edge location closest to user

**`SUCCESS`**
- Analysis complete, Smart Placement active
- Worker runs in optimal location (may be edge or remote)

**`INSUFFICIENT_INVOCATIONS`**
- Not enough requests to make placement decision
- Requires consistent multi-region traffic
- Always runs at default edge location

**`UNSUPPORTED_APPLICATION`** (rare, <1% of Workers)
- Smart Placement made Worker slower
- Placement decision reverted
- Always runs at edge location
- Won't be re-analyzed until redeployed

## cf-placement Header (Beta)

Smart Placement adds response header indicating routing decision:

```typescript
"cf-placement: remote-LHR"

"cf-placement: local-EWR"
```

Format: `{placement-type}-{IATA-code}`
- `remote-*` = Smart Placement routed to remote location
- `local-*` = Stayed at default edge location
- IATA code = nearest airport to data center

**Warning:** Beta feature, may be removed before GA.

## Detecting Smart Placement in Code

**Note:** `cf-placement` header is a beta feature and may change or be removed.

```typescript
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const placementHeader = request.headers.get('cf-placement');
    
    if (placementHeader?.startsWith('remote-')) {
      const location = placementHeader.split('-')[1];
      console.log(`Smart Placement routed to ${location}`);
    } else if (placementHeader?.startsWith('local-')) {
      const location = placementHeader.split('-')[1];
      console.log(`Running at edge location ${location}`);
    }
    
    return new Response('OK');
  }
} satisfies ExportedHandler<Env>;
```

## Request Duration Metrics

Available in Cloudflare dashboard when Smart Placement enabled:

**Workers & Pages → [Your Worker] → Metrics → Request Duration**

Shows histogram comparing:
- Request duration WITH Smart Placement (99% of traffic)
- Request duration WITHOUT Smart Placement (1% baseline)

**Request Duration vs Execution Duration:**
- **Request duration:** Total time from request arrival to response delivery (includes network latency)
- **Execution duration:** Time Worker code actively executing (excludes network waits)

Use request duration to measure Smart Placement impact.

### Interpreting Metrics

| Metric Comparison | Interpretation | Action |
|-------------------|----------------|--------|
| WITH < WITHOUT | Smart Placement helping | Keep enabled |
| WITH ≈ WITHOUT | Neutral impact | Consider disabling to free resources |
| WITH > WITHOUT | Smart Placement hurting | Disable with `mode: "off"` |

**Why Smart Placement might hurt performance:**
- Worker primarily serves static assets or cached content
- Backend services are globally distributed (no single optimal location)
- Worker has minimal backend communication
- Using Pages with `assets.run_worker_first = true`

**Typical improvements when Smart Placement helps:**
- 20-50% reduction in request duration for database-heavy Workers
- 30-60% reduction for Workers making multiple backend API calls
- Larger improvements when backend is geographically concentrated

## Monitoring Commands

```bash
wrangler tail your-worker-name

wrangler tail your-worker-name --status error
wrangler tail your-worker-name --header cf-placement

curl -H "Authorization: Bearer $TOKEN" \
  https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/services/$WORKER_NAME \
  | jq .result.placement_status
```

## TypeScript Types

```typescript
type PlacementStatus = 
  | 'SUCCESS'
  | 'INSUFFICIENT_INVOCATIONS'
  | 'UNSUPPORTED_APPLICATION'
  | undefined;

type PlacementMode = 'smart' | 'off';

interface PlacementConfig {
  mode: PlacementMode;
}

interface ExplicitPlacementConfig {
  region?: string;
  host?: string;
  hostname?: string;
}

interface WorkerMetadata {
  placement?: PlacementConfig | ExplicitPlacementConfig;
  placement_status?: PlacementStatus;
}

interface Env {
  BACKEND_SERVICE: Fetcher;
  DATABASE: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.BACKEND_SERVICE.fetch(request);
    return response;
  }
} satisfies ExportedHandler<Env>;
```
