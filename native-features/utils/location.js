const GOOGLE_API_KEY = "";

export function getMapPreview({ lat, lng }) {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&size=400x200&zoom=14&markers=color:red%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
}
