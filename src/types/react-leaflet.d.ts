declare module 'react-leaflet' {
  import { ComponentType, ReactNode } from 'react';
  import { LatLngTuple } from 'leaflet';

  export interface MapContainerProps {
    center: LatLngTuple;
    zoom: number;
    style?: React.CSSProperties;
    scrollWheelZoom?: boolean;
    children?: ReactNode;
  }

  export interface TileLayerProps {
    attribution?: string;
    url: string;
  }

  export interface CircleProps {
    center: LatLngTuple;
    radius: number;
    pathOptions?: {
      color?: string;
      fillColor?: string;
      fillOpacity?: number;
    };
    children?: ReactNode;
  }

  export interface PopupProps {
    children?: ReactNode;
  }

  export const MapContainer: ComponentType<MapContainerProps>;
  export const TileLayer: ComponentType<TileLayerProps>;
  export const Circle: ComponentType<CircleProps>;
  export const Popup: ComponentType<PopupProps>;
} 