import { Map, MapControls, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, useMap } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { hospitalData } from "@/data/hospitals";
import {useEffect} from 'react'
import { useAuth } from "@/context/AuthContext";
import { useLocation } from "react-router-dom";

const Bnglr_center=[77.5946, 12.9716]

const Bnglrboundary = [
  [77.3417, 12.7300], // Southwest coordinates
  [77.9472, 13.1737]  // Northeast coordinates
];
 
function MapFlyController() {
  const { map } = useMap();
  const { mapFocus } = useAuth();
  const location= useLocation();

  useEffect(() => {

    if(!map) return;

    if(location.pathname === '/'){
      map.flyTo({
        center:Bnglr_center,
        zoom:10,
        essential:true,
        duration:2000
      })
    }

    else if(mapFocus){
      map.flyTo({
        center:mapFocus,
        zoom:13,
        essential:true,
        duration:2000
      })
    }
  }, [mapFocus, map, location.pathname]); // Listen to route changes

  return null;
}

export function MyMap() {
  const { user } = useAuth();
  const location = useLocation();

  const isSearchActive = location.pathname !== '/';

  const userBloodType = user?.bloodType?.toUpperCase();

  return (
    <Card className="h-full w-full p-0 overflow-hidden border-none rounded-lg">
      
      <Map center={Bnglr_center} zoom={10} minZoom={10} maxZoom={15} maxBounds={Bnglrboundary} pitchWithRotate={false} dragRotate={false}>
        <MapFlyController/>
        <MapControls position="bottom-right" />

        {hospitalData.map((hospital) => {
          
          if (!hospital.coords) return null;

          const isMatch = isSearchActive && userBloodType && hospital.needs.includes(userBloodType);
          
          return (
            <MapMarker 
              key={hospital.id} 
              
              longitude={hospital.coords[0]} 
              latitude={hospital.coords[1]}
            >
              
              <MarkerContent>
                <div className="relative flex items-center justify-center">
                  {/* The outer pulse for matching types */}
                  {isMatch && (
                    <div className="absolute w-8 h-8 bg-red-400 rounded-full animate-ping opacity-20" />
                  )}
                  {/* The actual Pin */}
                  <div className={`relative w-6 h-6 rounded-t-full rounded-bl-full rotate-45 border-2 border-white shadow-lg transition-all duration-300 flex items-center justify-center ${
                    isMatch ? 'bg-[#E11D1D] scale-110' : 'bg-gray-400 scale-90'
                  }`}>
                    <div className="rotate-45 bg-white w-2.5 h-2.5 rounded-full shadow-inner" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-black/20 rounded-[100%] blur-[1px]" />
                </div>
              </MarkerContent>

              <MarkerTooltip>
                <div className="font-bold text-xs">{hospital.name}</div>
                <div className="text-[10px] text-green-500">{hospital.time}</div>
              </MarkerTooltip>

              <MarkerPopup className="p-0 border-none bg-transparent shadow-none">
                <div className="w-48 overflow-hidden rounded-xl bg-white shadow-2xl flex flex-col border-none">
                  {/* Image: h-32 for more impact, block to remove bottom whitespace gap */}
                  <div className="relative w-full h-22 overflow-hidden">
                    <img 
                      src={hospital.image} 
                      alt={hospital.name} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  </div>

                  {/* Content Area */}
                  <div className="px-4 py-2 bg-white">
                    <h4 className="font-bold text-base text-[#E11D1D] leading-tight">
                      {hospital.name}
                    </h4>
                    <p className="text-[11px] text-gray-500 font-medium">
                      {hospital.location}
                    </p>
                    
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {hospital.needs.map(type => (
                        <span 
                          key={type} 
                          className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-tight ${
                            type === userBloodType 
                              ? 'bg-[#E11D1D] text-white' 
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </MarkerPopup>
            </MapMarker>
          );
        })}
      </Map>
    </Card>
  );
}