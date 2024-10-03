import * as THREE from 'three';
import { extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Water } from 'three-stdlib';
import { TextureLoader } from 'three';
import waterTexture from '../../imgs/waternormals.jpeg';

extend({ Water });

const Ocean = () => {
  const ref = useRef();
  const gl = useThree(state => state.gl);
  const waterNormals = useLoader(TextureLoader, waterTexture);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);

  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0x0000ff,
      waterColor: 0x0055df,
      distortionScale: 3.7,
      fog: true,
      format: gl.encoding,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [waterNormals]
  );

  useFrame((state, delta) => {
    ref.current.material.uniforms.time.value += delta * 0.4;
  });

  return (
    <>
      <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
    </>
  );
};

export default Ocean;
