import { useFrame } from '@react-three/fiber';
import Platform from 'components/Platform/Platform';
import { useRef } from 'react';

const MovingBlock = ({ offset = 0, position: [x, y, z], v, ...props }) => {
  const api = useRef();
  useFrame(state =>
    api.current.position.set(
      x +
        (Math.sin(offset + state.clock.elapsedTime * v) *
          state.viewport.width) /
          10,
      y,
      z
    )
  );
  return (
    <Platform
      ref={api}
      args={[4, 1.5, 4]}
      material={{ restitution: 1 }}
      {...props}
    />
  );
};

export default MovingBlock;
