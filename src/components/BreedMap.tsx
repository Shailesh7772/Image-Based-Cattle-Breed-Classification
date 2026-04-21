import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BREED_DATABASE } from "@/lib/breedData";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  breedName: string;
}

export function BreedMap({ breedName }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const info = BREED_DATABASE[breedName];

  useEffect(() => {
    if (!mapRef.current || !info) return;

    // Clean up previous map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [22.5, 78.9],
      zoom: 5,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© OpenStreetMap',
    }).addTo(map);

    // Custom marker
    const icon = L.divIcon({
      html: `<div style="background: hsl(152, 55%, 35%); width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      className: "",
    });

    L.marker([info.lat, info.lng], { icon })
      .addTo(map)
      .bindPopup(
        `<div style="font-family: 'Space Grotesk', sans-serif; font-weight: 600; font-size: 14px;">${breedName}</div>
         <div style="font-size: 12px; color: #666; margin-top: 2px;">Origin: ${info.origin}</div>`,
        { closeButton: false }
      )
      .openPopup();

    // Fly to breed location
    setTimeout(() => map.flyTo([info.lat, info.lng], 7, { duration: 1.5 }), 300);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [breedName, info]);

  if (!info) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="py-12"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Breed Origin Map
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{breedName}</span> originates from{" "}
                <span className="font-semibold text-secondary">{info.origin}</span>
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div ref={mapRef} className="h-[350px] w-full rounded-b-lg" />
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
}
