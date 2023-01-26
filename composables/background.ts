export const useBackground = () => {
  const background = useState('background', () => ({
    source: ''
  }))
  const setBackground = (newBg:string) => {
    background.value.source = newBg
  }
  return {
    background, setBackground
  }
}