import { HEADER } from "@/_graphql/globals";
import { Header } from "@/_types/payload-types";

export async function fetchHeader(): Promise<Header> {
  if (!process.env.PAYLOAD_PUBLIC_SERVER_URL)
    throw new Error("PAYLOAD_PUBLIC_SERVER_URL not found");

  console.log(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql`);
  const header = await fetch(
    `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/graphql`,
    {
      body: JSON.stringify({
        query: HEADER,
      }),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    },
  )
    ?.then((res) => {
      if (!res.ok) throw new Error("Error fetching doc");
      return res.json();
    })
    ?.then((res) => {
      if (res?.errors)
        throw new Error(res?.errors[0]?.message || "Error fetching header");
      return res.data?.Header;
    });

  return header;
}
