import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ModelView from "./ModelView";
import { useEffect, useRef, useState } from "react";
import { yellowImg } from "../utils";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";
import { animateWithGSAPTimeline } from "../utils/animations";

const Model = () => {
  const [size, setSize] = useState("small");
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural Titanium",
    color: ["#8F8A81", "#ffe7b9", "#6f6c64"],
    img: yellowImg,
  });

  //  camera controller
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);
  
  const tl = gsap.timeline();

  useEffect(() => {
    if(size === 'large') {
      animateWithGSAPTimeline(tl, small, smallRotation, '#view1', '#view2', {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }

    if(size ==='small') {
      animateWithGSAPTimeline(tl, large, largeRotation, '#view2', '#view1', {
        transform: 'translateX(0)',
        duration: 2
      })
    }
  }, [size])

  
  useGSAP(() => {
    gsap.to("#heading", { y: 0, opacity: 1 });
  });
  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>
        <div className="mt-5 flex flex-col items-center">
          <div className="relative h-[75vh] w-full overflow-hidden md:h-[90vh]">
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              size={size}
              item={model}
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
            />
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              size={size}
              item={model}
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
            />

            <Canvas className="size-full" style={{
                position: 'fixed',
                inset: 0,
                overflow: "hidden"
            }}
            eventSource={document.getElementById("root")}>
                <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className="mb-5 text-center text-sm font-light">{model.title}</p>
            <div className="flex-center">
                <ul className="color-container">
                    {models.map((item, i) => (
                        <li key={i} className="mx-2 size-6 cursor-pointer rounded-full" style={{
                            backgroundColor: item.color[0] }} onClick={() => setModel(item)}></li>
                    ))}
                </ul>
                <button className="size-btn-container">
                    {
                        sizes.map(({label, value}) => (
                            <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>{label}</span>
                        ))
                    }
                </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
