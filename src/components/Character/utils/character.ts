import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                // Clone the material so modifications only affect this mesh
                if (mesh.material) {
                  const originalMat = mesh.material as THREE.MeshStandardMaterial;
                  const newMat = originalMat.clone();
                  mesh.material = newMat;

                  const name = child.name.toLowerCase();
                  console.log("Customizing 3D Mesh name:", child.name);

                  // Customize colors to match Deepak's features (case-insensitive & robust to dot sanitization)
                  if (
                    name.includes("plane007") || name.includes("plane.007") || name.includes("plane_007") || // Face skin
                    name.includes("neck") ||                                    // Neck skin
                    name.includes("ear") ||                                     // Ear skin
                    name.includes("hand")                                       // Hand skin
                  ) {
                    newMat.color.set("#ab7956"); // warm brown skin tone
                    newMat.roughness = 0.6;
                  } else if (name.includes("hair")) {
                    newMat.color.set("#050505"); // jet black hair
                    newMat.roughness = 0.85;
                  } else if (name.includes("shirt")) {
                    newMat.color.set("#16161a"); // dark grey/black t-shirt
                    newMat.roughness = 0.7;
                  } else if (name.includes("pant")) {
                    newMat.color.set("#22252a"); // dark pants
                    newMat.roughness = 0.8;
                  } else if (name.includes("shoe")) {
                    newMat.color.set("#f0f0f2"); // white sneakers
                    newMat.roughness = 0.5;
                  } else if (name.includes("sole")) {
                    newMat.color.set("#111113"); // black sole
                  }
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
