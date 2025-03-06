/**
 * @description Image vertex shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
attribute float aDisAngle;
attribute float aDisAmplitude;

uniform float     uTime;
uniform float     uDisFrequency;
uniform float     uDisAmplitude;
uniform sampler2D uDisTexture;
uniform sampler2D uImageTexture;
uniform float     uPointSize;

varying vec4 vColor;

void main() {
    vec3  disPosition = position;
    float dispFactor  = texture(uDisTexture, uv).r;
          dispFactor  = smoothstep(0.2, 0.8, dispFactor);
          dispFactor  = (sin(uDisFrequency * uTime) + 1.5) / (2.5) *
                        dispFactor                                 *
                        uDisAmplitude;
          dispFactor     *= aDisAmplitude;
    float displacementX   = cos(aDisAngle) * dispFactor;
    float displacementY   = sin(aDisAngle) * dispFactor;
    vec2  displacement    = vec2(displacementX, displacementY);
          disPosition.xy += displacement;

    vec4 modelPosition      = modelMatrix      * vec4(disPosition, 1.0);
    vec4 viewPosition       = viewMatrix       * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_PointSize = uPointSize;
    gl_Position  = projectionPosition;

    vColor = texture(uImageTexture, uv);
}