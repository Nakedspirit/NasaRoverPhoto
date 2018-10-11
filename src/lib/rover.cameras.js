export const findShortCamera = (camera) => {
  switch (camera) {
  case 'Front Hazard Avoidance Camera':
    camera = 'FHAZ';
    break;
  case 'Rear Hazard Avoidance Camera':
    camera = 'RHAZ';
    break;
  case 'Mast Camera':
    camera = 'MAST';
    break;
  case 'Chemistry and Camera Complex':
    camera = 'CHEMCAM';
    break;
  case 'Mars Hand Lens Imager':
    camera = 'MAHLI';
    break;
  case 'Mars Descent Imager':
    camera = 'MARDI';
    break;
  case 'Navigation Camera':
    camera = 'NAVCAM';
    break;
  case 'Panoramic Camera':
    camera = 'PANCAM';
    break;
  case 'Miniature Thermal Emission Spectrometer (Mini-TES)':
    camera = 'MINITES';
    break;
  default: camera;
  }

  return camera;
};