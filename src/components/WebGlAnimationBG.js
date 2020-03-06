import * as THREE from 'three';
import React, {Component} from 'react'

const maxParticleCount = 500;
const particleCount = 400;
const r = 800;
const rHalf = r / 2;
const effectController = {
	showDots: true,
	showLines: true,
	minDistance: 150,
	limitConnections: false,
	maxConnections: 20,
	particleCount: 400
};

export class WebGlAnimationBG extends Component {
	constructor() {
		super();
		this.particlesData = [];
		this.timer = null;
	}

	componentDidMount() {
		this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
		this.camera.position.z = 750;
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xf0f0f0 );
		this.group = new THREE.Group();
		this.scene.add( this.group );
		this.segments = maxParticleCount * maxParticleCount;
		this.positions = new Float32Array( this.segments * 3 );
		this.colors = new Float32Array( this.segments * 3 );
		this.pMaterial = new THREE.PointsMaterial( {
			color: 0xFFFFFF,
			size: 3,
			blending: THREE.AdditiveBlending,
			transparent: true,
			sizeAttenuation: false
		} );

		this.particles = new THREE.BufferGeometry();
		this.particlePositions = new Float32Array( maxParticleCount * 3 );

		for ( let i = 0; i < maxParticleCount; i ++ ) {

			let x = Math.random() * r - r / 2;
			let y = Math.random() * r - r / 2;
			let z = Math.random() * r - r / 2;

			this.particlePositions[ i * 3 ] = x;
			this.particlePositions[ i * 3 + 1 ] = y;
			this.particlePositions[ i * 3 + 2 ] = z;

			// add it to the geometry
			this.particlesData.push( {
				velocity: new THREE.Vector3( - 1 + Math.random() * 2, - 1 + Math.random() * 2, - 1 + Math.random() * 2 ),
				numConnections: 0
			} );

		}

		this.particles.setDrawRange( 0, particleCount );
		this.particles.setAttribute( 'position',  new THREE.BufferAttribute( this.particlePositions, 3 ).setUsage( THREE.DynamicDrawUsage ));

		// create the particle system
		this.pointCloud = new THREE.Points( this.particles, this.pMaterial );
		this.group.add( this.pointCloud );
		this.geometry = new THREE.BufferGeometry();
		this.geometry.setAttribute( 'position', new THREE.BufferAttribute( this.positions, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		this.geometry.setAttribute( 'color', new THREE.BufferAttribute( this.colors, 3 ).setUsage( THREE.DynamicDrawUsage ) );
		this.geometry.computeBoundingSphere();
		this.geometry.setDrawRange( 0, 0 );
		this.material = new THREE.LineBasicMaterial( {
			vertexColors: true,
			blending: THREE.AdditiveBlending,
			transparent: true
		} );
		this.linesMesh = new THREE.LineSegments( this.geometry, this.material );
		this.group.add( this.linesMesh );
		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setPixelRatio( window.devicePixelRatio );
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.outputEncoding = THREE.sRGBEncoding;
		document.body.appendChild( this.renderer.domElement );
		this.animate();
	}

	animate = () => {
		this.timer = setTimeout(() => requestAnimationFrame( this.animate ), 1000/30)
		var vertexpos = 0;
		var colorpos = 0;
		var numConnected = 0;

		for ( var z = 0; z < particleCount; z ++ )
			this.particlesData[ z ].numConnections = 0;

		for ( var i = 0; i < particleCount; i ++ ) {

			// get the particle
			var particleData = this.particlesData[ i ];

			this.particlePositions[ i * 3 ] += particleData.velocity.x;
			this.particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
			this.particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

			if ( this.particlePositions[ i * 3 + 1 ] < - rHalf || this.particlePositions[ i * 3 + 1 ] > rHalf )
				particleData.velocity.y = - particleData.velocity.y;

			if ( this.particlePositions[ i * 3 ] < - rHalf || this.particlePositions[ i * 3 ] > rHalf )
				particleData.velocity.x = - particleData.velocity.x;

			if ( this.particlePositions[ i * 3 + 2 ] < - rHalf || this.particlePositions[ i * 3 + 2 ] > rHalf )
				particleData.velocity.z = - particleData.velocity.z;

			if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
				continue;

			// Check collision
			for ( var j = i + 1; j < particleCount; j ++ ) {

				var particleDataB = this.particlesData[ j ];
				if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
					continue;

				var dx = this.particlePositions[ i * 3 ] - this.particlePositions[ j * 3 ];
				var dy = this.particlePositions[ i * 3 + 1 ] - this.particlePositions[ j * 3 + 1 ];
				var dz = this.particlePositions[ i * 3 + 2 ] - this.particlePositions[ j * 3 + 2 ];
				var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

				if ( dist < effectController.minDistance ) {

					particleData.numConnections ++;
					particleDataB.numConnections ++;

					var alpha = 1.0 - dist / effectController.minDistance;

					this.positions[ vertexpos ++ ] = this.particlePositions[ i * 3 ];
					this.positions[ vertexpos ++ ] = this.particlePositions[ i * 3 + 1 ];
					this.positions[ vertexpos ++ ] = this.particlePositions[ i * 3 + 2 ];

					this.positions[ vertexpos ++ ] = this.particlePositions[ j * 3 ];
					this.positions[ vertexpos ++ ] = this.particlePositions[ j * 3 + 1 ];
					this.positions[ vertexpos ++ ] = this.particlePositions[ j * 3 + 2 ];

					this.colors[ colorpos ++ ] = alpha;
					this.colors[ colorpos ++ ] = alpha;
					this.colors[ colorpos ++ ] = alpha;

					this.colors[ colorpos ++ ] = alpha;
					this.colors[ colorpos ++ ] = alpha;
					this.colors[ colorpos ++ ] = alpha;

					numConnected ++;
				}
			}
		}
		this.linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
		this.linesMesh.geometry.attributes.position.needsUpdate = true;
		this.linesMesh.geometry.attributes.color.needsUpdate = true;
		this.pointCloud.geometry.attributes.position.needsUpdate = true;
		this.time = Date.now() * 0.001;
		//this.group.rotation.y = this.time * 0.1;
		//this.group.rotation.x = this.time * 0.1;
		this.renderer.render( this.scene, this.camera );
	}

	render() {
		return(
			<div/>
		)
	}
}
