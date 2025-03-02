/**
 * @description Image vertex shader
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Analyze make point size relative to renderer height
 */
attribute float aPointSize;
attribute float aAngle;
attribute float aDisplacementFactor;

uniform sampler2D uImageTexture;
uniform sampler2D uDisplacementTexture;
uniform float     uPointSize;

varying vec4 vColor;

void main() {
    vec3  displacedPosition     = position;
    float displacementFactor    = texture(uDisplacementTexture, uv).r;
          displacementFactor    = smoothstep(0.0, 1.0, displacementFactor);
          displacementFactor   *= aDisplacementFactor;
    float displacementX         = cos(aAngle) * displacementFactor;
    float displacementY         = sin(aAngle) * displacementFactor;
    vec2  displacement          = vec2(displacementX, displacementY);
          displacedPosition.xy += displacement;

    vec4 modelPosition      = modelMatrix      * vec4(displacedPosition, 1.0);
    vec4 viewPosition       = viewMatrix       * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_PointSize = uPointSize * aPointSize;
    gl_Position  = projectionPosition;

    vColor = texture(uImageTexture, uv);
}