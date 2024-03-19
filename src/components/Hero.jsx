import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { heroVideo, smallHeroVideo } from "../utils";
import { useState, useEffect } from "react";

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth > 760 ? heroVideo : smallHeroVideo)
  const handleResponsiveVideoSrc=()=> {
    window.innerWidth > 760 ? setVideoSrc(heroVideo) : setVideoSrc(smallHeroVideo);
  }
  useEffect(()=> {
    window.addEventListener('resize', handleResponsiveVideoSrc)
    return() => {
      window.removeEventListener('resize', handleResponsiveVideoSrc)
    }
  }, [])
  useGSAP(()=> {
    gsap.to('#hero', {
      opacity: 1,
      delay: 2
    })

    gsap.to('#cta', {
      opacity: 1,
      y: -50, 
      delay: 2
    })
  })
  return (
    <section className="nav-height relative bg-black">
      <div className="flex-center h-5/6 flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="w-9/12 md:w-10/12">
          <video className="pointer-events-none" autoPlay muted playsInline src={videoSrc}>
          </video>
        </div>
      </div>
      <div id="cta" className="flex translate-y-20 flex-col items-center opacity-0">
        <a href="#highlights" className="btn">Buy</a>
        <p className="text-xl font-normal">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero