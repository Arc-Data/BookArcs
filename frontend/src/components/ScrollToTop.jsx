import { useEffect } from "react"
import { useLocation } from "react-router"

const ScrollToTop = () => {
    const pathName = useLocation()
  
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathName])
}

export default ScrollToTop