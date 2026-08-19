import { JsonLd as JsonLdData } from "@/lib/structured-data";

type Props = {
  data: JsonLdData;
};

/**
 * `<` is escaped because any string in the payload containing `</script>` would
 * otherwise close this tag and hand the rest of it to the HTML parser as
 * markup. The escape is invisible to a JSON parser, so crawlers read it
 * unchanged.
 */
const serialize = (data: JsonLdData): string =>
  JSON.stringify(data).replace(/</g, "\\u003c");

export const JsonLd = ({ data }: Props) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: serialize(data) }}
  />
);
