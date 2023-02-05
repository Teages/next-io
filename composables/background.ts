export const useBackground = () => {
  const background = useState('background', () => ({
    source: ''
  }))
  const setBackground = (newBg:string) => {
    background.value.source = newBg
  }
  const resetBackground = () => {
    setBackground('')
  }
  return {
    background, setBackground, resetBackground
  }
}