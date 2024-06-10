import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";



export const runtime = "edge";
const interBold = fetch(
  new URL("../../../assets/fonts/GeistMono-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  try {
    const fontBold = await interBold;
    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title");
    const heading = searchParams.get("heading");
    const url = searchParams.get("url");
    const footer = searchParams.get("footer");

    if (!title) {
      return new Response("No title found", { status: 500 });
    }

    if (!heading) {
      return new Response("No heading found", { status: 500 });
    }

    if (!url) {
      return new Response("No URL found", { status: 500 });
    }

    if (!footer) {
      return new Response("No footer found", { status: 500 });
    }

    const Theading =
      title.length > 140 ? `${title.substring(0, 140)}...` : title;
    return new ImageResponse(
      (
        <div tw="flex relative flex-col p-12 w-full h-full items-start text-black bg-white">
          <div tw="flex items-center">
            <p tw="ml-2 font-bold text-2xl">{heading}</p>
          </div>
          <div tw="flex flex-col flex-1 py-10">
            <div tw="flex text-[80px] font-bold text-[50px]">{Theading}</div>
          </div>
          <div tw="flex items-center w-full justify-between">
            <div tw="flex text-xl">{url}</div>
            <div tw="flex items-center text-xl">
              <div tw="flex ml-2">{footer}</div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: fontBold,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (error) {
    return new Response("Failed to generate image", { status: 500 });
  }
}
