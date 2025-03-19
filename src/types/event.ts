export interface Event {
  offers: Offer[];
  venue: Venue;
  starts_at: string;
  festival_datetime_display_rule: string;
  description: string;
  lineup: string[];
  festival_start_date: string;
  bandsintown_plus: boolean;
  title: string;
  artist_id: string;
  presale: string;
  url: string;
  datetime_display_rule: string;
  datetime: string;
  on_sale_datetime: string;
  sold_out: boolean;
  id: string;
  ends_at: string;
  free: boolean;
  festival_end_date: string;
}

export interface Offer {
  type: string;
  url: string;
  status: string;
}

export interface Venue {
  street_address: string;
  country: string;
  city: string;
  latitude: string;
  name: string;
  location: string;
  postal_code: string;
  region: string;
  longitude: string;
}
