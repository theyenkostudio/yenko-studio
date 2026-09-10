/**
 * The two cities plotted on a single east–west rail.
 *
 * The line is a longitude axis and nothing more: it places each city by how
 * far east it sits, and the coordinates beneath carry the latitude. An earlier
 * version read the line as a shared parallel, which was true of Accra and
 * Lagos — both on the Gulf of Guinea at roughly 6° north — and is not true of
 * Abuja, which is inland at 9.08° north. Nothing here claims a shared latitude:
 * the rail encodes east–west position, and the coordinates carry the rest.
 *
 * Positions are derived from the coordinates rather than eyeballed, so the
 * drawing cannot drift away from what the labels claim.
 */

/** Degrees of longitude the rail spans. Padded either side to give labels room. */
const RAIL = { west: -2.2, east: 9.6 };

const CITIES = [
  { name: "Accra", lon: -0.187, coords: "5.6037° N, 0.1870° W" },
  { name: "Abuja", lon: 7.3986, coords: "9.0765° N, 7.3986° E" },
];

const place = (lon: number) => ((lon - RAIL.west) / (RAIL.east - RAIL.west)) * 100;

export default function Coordinates() {
  return (
    <div className="mt-[clamp(3rem,6vw,4.5rem)] pb-[clamp(3rem,6vw,4.5rem)]">
      <div className="relative pt-4">
        <div className="relative h-px bg-studio-ink">
          {CITIES.map(({ name, lon, coords }) => (
            <span
              key={name}
              className="absolute top-0 -translate-x-1/2"
              style={{ left: `${place(lon)}%` }}
            >
              <span className="mx-auto -mt-1 block size-2.5 rounded-full bg-studio-ink" />
              <span className="mt-3.5 block whitespace-nowrap text-center">
                <span className="block text-[clamp(1rem,1.8vw,1.35rem)] font-medium tracking-[-0.04em]">
                  {name}
                </span>
                <span className="mt-1 block text-[10px] tabular-nums text-studio-muted max-[860px]:text-[9px]">
                  {coords}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
