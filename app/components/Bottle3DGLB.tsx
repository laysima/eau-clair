'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default function Bottle3DGLB() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45, // Reduced FOV for less distortion
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 6 // Moved camera closer

    // Renderer setup with high quality settings
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    
    // High resolution rendering
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) // Better quality
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    
    // Enable shadows for better depth
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    containerRef.current.appendChild(renderer.domElement)

    // Enhanced Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
    scene.add(ambientLight)

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight1.position.set(5, 5, 5)
    directionalLight1.castShadow = true
    scene.add(directionalLight1)

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight2.position.set(-5, -5, -5)
    scene.add(directionalLight2)

    // Add rim light for better definition
    const rimLight = new THREE.DirectionalLight(0x90CAF9, 1.5)
    rimLight.position.set(0, 0, -5)
    scene.add(rimLight)

    // Point light for highlights
    const pointLight = new THREE.PointLight(0xffffff, 2, 100)
    pointLight.position.set(0, 5, 5)
    scene.add(pointLight)

    // Load GLB model
    const loader = new GLTFLoader()
    let model: THREE.Group

    loader.load(
      'https://mdetoprztpxewognttgd.supabase.co/storage/v1/object/public/media/bottle-3d.glb',
      (gltf) => {
        model = gltf.scene

        // Enhance materials for better clarity
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            // Ensure materials render properly
            if (child.material) {
              child.material.needsUpdate = true
              
              // If it's a standard material, enhance it
              if (child.material instanceof THREE.MeshStandardMaterial) {
                child.material.metalness = 0.3
                child.material.roughness = 0.4
                child.material.envMapIntensity = 1.5
              }
            }
            
            child.castShadow = true
            child.receiveShadow = true
          }
        })

        // Center the model
        const box = new THREE.Box3().setFromObject(model)
        const center = box.getCenter(new THREE.Vector3())
        model.position.sub(center)

        // Scale the model to fit nicely
        const size = box.getSize(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 4 / maxDim // Slightly larger
        model.scale.setScalar(scale)

        scene.add(model)
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
      },
      (error) => {
        console.error('Error loading GLB model:', error)
      }
    )

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      if (model) {
        model.rotation.y += 0.004 // Slightly slower for smoother look
      }

      renderer.render(scene, camera)
    }
    animate()

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{ 
        filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.5)) contrast(1.1) brightness(1.1)' 
      }}
    />
  )
}