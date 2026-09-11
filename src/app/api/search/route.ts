import { NextRequest, NextResponse } from "next/server";

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
    return { carrier: "Jazz / Warid", brand: "Jazz", color: "bg-red-500/10 text-red-600 border-red-500/20" };
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
    // 03225202988 -> 923225202988
    cleaned = "92" + cleaned.substring(1);
  } else if (cleaned.startsWith("3") && cleaned.length === 10) {
    // 3225202988 -> 923225202988
    cleaned = "92" + cleaned;
  } else if (!cleaned.startsWith("92") && cleaned.length >= 10) {
    cleaned = "92" + cleaned.replace(/^0+/, "");
  }
  return cleaned;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawQuery = searchParams.get("query") || searchParams.get("number") || "";
    const type = searchParams.get("type") || "mobile";

    if (!rawQuery.trim()) {
      return NextResponse.json(
        { success: false, message: "Please provide a mobile number to search." },
        { status: 400 }
      );
    }

    // Convert e.g. 03225202988 to 923225202988
    const queryWith92 = formatTo92Number(rawQuery);
    const localFormatted = queryWith92.startsWith("92") ? "0" + queryWith92.slice(2) : queryWith92;
    const carrier = getCarrierInfo(queryWith92);

    // Target API URLs
    const targetUrlWithAmp = `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(queryWith92)}&type=${encodeURIComponent(type)}`;
    const targetUrlNoAmp = `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(queryWith92)}type=${encodeURIComponent(type)}`;
    const targetUrlRaw = `https://aichatbot.pk/api/search_data.php?query=${encodeURIComponent(rawQuery.replace(/\D/g, ''))}&type=${encodeURIComponent(type)}`;

    let responseData: any = null;
    let rawResponseText = "";
    let apiStatus = 0;
    let hitUrl = targetUrlWithAmp;

    // Try primary endpoint with timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

      const res = await fetch(targetUrlWithAmp, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept": "application/json, text/html, */*",
        },
        signal: controller.signal,
        cache: "no-store",
      });
      clearTimeout(timeoutId);

      apiStatus = res.status;
      rawResponseText = await res.text();

      // Try parsing JSON
      try {
        responseData = JSON.parse(rawResponseText);
      } catch {
        responseData = null;
      }
    } catch (err: any) {
      // If primary failed, try secondary URL
      try {
        const controller2 = new AbortController();
        const timeoutId2 = setTimeout(() => controller2.abort(), 4000);
        hitUrl = targetUrlNoAmp;

        const res2 = await fetch(targetUrlNoAmp, {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
            "Accept": "*/*",
          },
          signal: controller2.signal,
          cache: "no-store",
        });
        clearTimeout(timeoutId2);

        apiStatus = res2.status;
        rawResponseText = await res2.text();
        try {
          responseData = JSON.parse(rawResponseText);
        } catch {
          responseData = null;
        }
      } catch (err2: any) {
        // Fallback recorded
      }
    }

    // Normalize output records
    let records: any[] = [];
    if (Array.isArray(responseData)) {
      records = responseData;
    } else if (responseData && typeof responseData === "object") {
      if (Array.isArray(responseData.data)) {
        records = responseData.data;
      } else if (Array.isArray(responseData.records)) {
        records = responseData.records;
      } else if (responseData.name || responseData.cnic || responseData.number) {
        records = [responseData];
      }
    }

    return NextResponse.json({
      success: true,
      query: rawQuery,
      formattedNumber: queryWith92,
      displayNumber: localFormatted,
      carrier,
      hitUrl,
      apiStatus,
      recordsCount: records.length,
      records: records.length > 0 ? records : null,
      rawOutput: rawResponseText ? rawResponseText.slice(0, 2000) : null,
      meta: {
        queriedAt: new Date().toISOString(),
        standardPrefix: "+92",
        carrierName: carrier.carrier,
        status: "Active Pakistani MSISDN Format",
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to query SIM records.",
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
