/**
 * @description Shader chunk used to define params used in the
 *              image vertex shader
 *              to handle vertex/point/pixel displacement
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This file is called `pars_vertex.glsl` to mantain the
 *              same naming style used by Three.js for its `.glsl` chunk
 *              files that define shader params
 */
attribute float aDisAngle;
attribute float aDisAmplitude;

uniform float     uTime;
uniform float     uDisFrequency;
uniform float     uDisAmplitude;
uniform sampler2D uDisTexture;

varying vec4 vColor;