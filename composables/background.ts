export const useBackground = () => {
  const background = useState('background', () => ({
    source: null,
    overlayOpacity: 0.5,
    parallaxSpeed: 0.2,
  }))
  const setBackground = (background) => {
    background.value.source = background?.source
    background.value.overlayOpacity = background?.overlayOpacity || 0.5
    background.value.parallaxSpeed = background?.parallaxSpeed || 0.2
    background.value.landing = background?.landing || false
  }
  return {
    background, setBackground
  }
}