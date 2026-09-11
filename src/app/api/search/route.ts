import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Helper to determine network operator from Pakistani mobile prefix
function getCarrierInfo(numberStr: string): { carrier: string; brand: string; color: string } {
  let num = numberStr.replace(/\D/g, "");
  if (num.startsWith("92")) num = "0" + num.slice(2);
  const prefix = num.slice(0, 4);

  const jazzPrefixes = ["0300", "0301", "0302", "0303", "0304", "0305", "0306", "0307", "0308", "0309", "0320", "0321", "0322", "0323", "0324", "0325", "0326", "0327", "0328", "0329"];
  const zongPrefixes = ["0310", "0311", "0312", "0313", "0314", "0315", "0316", "0317", "0318", "0319"];
  const ufonePrefixes = ["0330", "0331", "0332", "0333", "0334", "0335", "0336", "0337", "0338", "0339"];
  const telenorPrefixes = ["0340", "0341", "0342", "0343", "0344", "0345", "0346", "0347", "0348", "0349"];
  const scomPrefixes = ["0355"];

  if (jazzPrefixes.includes(prefix)) {
    return { carrier: "Jazz / Warid 4G", brand: "Jazz", color: "bg-red-500/10 text-red-600 border-red-500/20" };
  }
  if (zongPrefixes.includes(prefix)) {
    return { carrier: "Zong 4G (CMPak)", brand: "Zong", color: "bg-pink-500/10 text-pink-600 border-pink-500/20" };
  }
  if (ufonePrefixes.includes(prefix)) {
    return { carrier: "Ufone 4G (PTCL Group)", brand: "Ufone", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" };
  }
  if (telenorPrefixes.includes(prefix)) {
    return { carrier: "Telenor Pakistan", brand: "Telenor", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" };
  }
  if (scomPrefixes.includes(prefix)) {
    return { carrier: "SCO (SCOM 4G)", brand: "SCOM", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" };
  }
  return { carrier: "Pakistani Cellular Network", brand: "Cellular", color: "bg-gray-500/10 text-gray-600 border-gray-500/20" };
}

// Format number with 92 prefix on the backend
export function formatTo92Number(rawInput: string): string {
  let cleaned = rawInput.trim().replace(/\D/g, "");
  
  if (cleaned.startsWith("0092")) {
    cleaned = cleaned.substring(2);
  } else if (cleaned.startsWith("03")) {
    cleaned = "92" + cleaned.substring(1);
  } else if (cleaned.startsWith("3") && cleaned.length === 10) {
    cleaned = "92" + cleaned;
  } else if (!cleaned.startsWith("92") && cleaned.length >= 10) {
    cleaned = "92" + cleaned.replace(/^0+/, "");
  }
  return cleaned;
}

// Format to 03XXXXXXXXX
export function formatToLocalNumber(rawInput: string): string {
  let num = rawInput.trim().replace(/\D/g, "");
  if (num.startsWith("92")) num = "0" + num.slice(2);
  else if (num.startsWith("0092")) num = "0" + num.slice(4);
  else if (num.startsWith("3") && num.length === 10) num = "0" + num;
  return num;
}

interface NormalizedRecord {
  name: string;
  cnic: string;
  number: string;
  address: string;
  date?: string;
  city?: string;
  operator?: string;
}

function normalizeRecordItem(item: any): NormalizedRecord | null {
  if (!item || typeof item !== "object") return null;

  const name = item.name || item.nam || item.Name || item.customer_name || item.full_name || item.OwnerName || "";
  const cnic = item.cnic || item.cni || item.CNIC || item.nic || item.id_card || item.Cnic || "";
  const number = item.number || item.nbr || item.Number || item.mobile || item.phone || item.Phone || item.MobileNo || "";
  const address = item.address || item.adr || item.Address || item.addr || item.location || item.CityAddress || "";
  const date = item.date || item.dat || item.Date || item.reg_date || item.created_at || "";
  const city = item.city || item.City || "";
  const operator = item.operator || item.network || item.Operator || "";

  if (!name && !cnic && !number && !address) {
    return null;
  }

  return {
    name: String(name).trim(),
    cnic: String(cnic).trim(),
    number: String(number).trim(),
    address: String(address).trim(),
    date: date ? String(date).trim() : undefined,
    city: city ? String(city).trim() : undefined,
    operator: operator ? String(operator).trim() : undefined,
  };
}

// Extract JSON or HTML records from raw response text
function parseResponseContent(rawText: string): NormalizedRecord[] {
  if (!rawText || !rawText.trim()) return [];

  // 1. Direct JSON parse
  try {
    const parsed = JSON.parse(rawText);
    if (Array.isArray(parsed)) {
      const mapped = parsed.map(normalizeRecordItem).filter(Boolean) as NormalizedRecord[];
      if (mapped.length > 0) return mapped;
    } else if (parsed && typeof parsed === "object") {
      const arr = parsed.data || parsed.records || parsed.result || parsed.data_list;
      if (Array.isArray(arr)) {
        const mapped = arr.map(normalizeRecordItem).filter(Boolean) as NormalizedRecord[];
        if (mapped.length > 0) return mapped;
      }
      const single = normalizeRecordItem(parsed);
      if (single) return [single];
    }
  } catch {}

  // 2. Regex for embedded JSON array e.g. "Response: [{...}]"
  const arrayMatch = rawText.match(/\[\s*\{[\s\S]*?\}\s*\]/);
  if (arrayMatch) {
    try {
      const parsedArr = JSON.parse(arrayMatch[0]);
      if (Array.isArray(parsedArr)) {
        const mapped = parsedArr.map(normalizeRecordItem).filter(Boolean) as NormalizedRecord[];
        if (mapped.length > 0) return mapped;
      }
    } catch {}
  }

  // 3. Regex for embedded single JSON object e.g. "Result: {...}"
  const objectMatch = rawText.match(/\{\s*"[\s\S]*?"\s*:\s*[\s\S]*?\}/);
  if (objectMatch) {
    try {
      const parsedObj = JSON.parse(objectMatch[0]);
      const single = normalizeRecordItem(parsedObj);
      if (single) return [single];
    } catch {}
  }

  // 4. HTML Table extraction fallback (if PHP page rendered an HTML table)
  if (rawText.includes("<table") || rawText.includes("<tr") || rawText.includes("<td")) {
    const rows = rawText.match(/<tr[\s\S]*?<\/tr>/gi);
    if (rows && rows.length > 0) {
      const extracted: NormalizedRecord[] = [];
      for (const row of rows) {
        const cells = Array.from(row.matchAll(/<t[dh][\s\S]*?>([\s\S]*?)<\/t[dh]>/gi)).map(m => m[1].replace(/<[^>]+>/g, '').trim());
        if (cells.length >= 2) {
          // If cells contain mobile / cnic
          const maybeCnic = cells.find(c => /^\d{5}-?\d{7}-?\d$/.test(c.replace(/\s+/g, '')) || /^\d{13}$/.test(c.replace(/\s+/g, '')));
          const maybeNum = cells.find(c => /^(03\d{9}|923\d{9}|3\d{9})$/.test(c.replace(/\s+/g, '')));
          const name = cells[0] || "";
          const address = cells[cells.length - 1] || "";
          if (maybeCnic || maybeNum || (name && cells.length >= 3)) {
            extracted.push({
              name,
              cnic: maybeCnic || "",
              number: maybeNum || "",
              address
            });
          }
        }
      }
      if (extracted.length > 0) return extracted;
    }
  }

  return [];
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("query") || searchParams.get("number") || "";
    const type = searchParams.get("type") || "mobile";

    if (!rawQuery.trim()) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid mobile number (e.g. 03225202988)" },
        { status: 400 }
      );
    }

    const queryWith92 = formatTo92Number(rawQuery); // e.g. 923225202988
    const localFormatted = formatToLocalNumber(rawQuery); // e.g. 03225202988
    const carrier = getCarrierInfo(localFormatted);

    // List of target candidate URLs to attempt
    const candidateUrls = [
      `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(queryWith92)}&type=${encodeURIComponent(type)}`,
      `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(localFormatted)}&type=${encodeURIComponent(type)}`,
      `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(queryWith92)}type=${encodeURIComponent(type)}`,
      `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(localFormatted)}type=${encodeURIComponent(type)}`,
      `https://aichatbot.pk/api/search_data.php?search=${encodeURIComponent(localFormatted)}&type=${encodeURIComponent(type)}`
    ];

    let finalRecords: NormalizedRecord[] = [];
    let lastRawText = "";
    let lastStatus = 0;
    let successfulUrl = candidateUrls[0];
    let upstreamError: string | null = null;

    for (const targetUrl of candidateUrls) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout per candidate

        const res = await fetch(targetUrl, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml,application/json;q=0.9,*/*;q=0.8",
            "Referer": "https://aichatbot.pk/",
          },
          signal: controller.signal,
          cache: "no-store",
        });
        clearTimeout(timeoutId);

        lastStatus = res.status;
        lastRawText = await res.text();
        successfulUrl = targetUrl;

        const parsed = parseResponseContent(lastRawText);
        if (parsed.length > 0) {
          finalRecords = parsed;
          upstreamError = null;
          break; // Found data!
        }
      } catch (err: any) {
        upstreamError = err.message || "Connection timeout";
      }
    }

    const isUpstreamDown = upstreamError !== null && (!lastRawText || lastRawText.trim().length === 0);

    return NextResponse.json({
      success: true,
      query: rawQuery,
      formattedNumber: queryWith92,
      displayNumber: localFormatted,
      carrier,
      hitUrl: successfulUrl,
      apiStatus: lastStatus,
      recordsCount: finalRecords.length,
      records: finalRecords.length > 0 ? finalRecords : null,
      rawOutput: lastRawText ? lastRawText.slice(0, 1500) : null,
      upstreamError: upstreamError ? `Upstream server (aichatbot.pk): ${upstreamError}` : null,
      isUpstreamDown,
      meta: {
        queriedAt: new Date().toISOString(),
        standardPrefix: "+92",
        carrierName: carrier.carrier,
        status: isUpstreamDown 
          ? "The external API server (aichatbot.pk) is temporarily unreachable or offline." 
          : finalRecords.length > 0 
            ? "Record retrieved successfully." 
            : "No registered record found for this number in the database.",
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Server error occurred during lookup.",
        error: String(error),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const query = body.query || body.number || "";
    const type = body.type || "mobile";

    const url = new URL(request.url);
    url.searchParams.set("query", query);
    url.searchParams.set("type", type);

    const getReq = new NextRequest(url.toString(), { method: "GET" });
    return GET(getReq);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Invalid request payload" },
      { status: 400 }
    );
  }
}
